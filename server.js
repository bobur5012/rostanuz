require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false } // Раскомментируйте для продакшена (Render, Heroku и т.д.)
});

// Verify connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  release();
});

/**
 * Функция проверки подписи Telegram Login Widget
 * @param {Object} authData - данные, пришедшие с фронтенда (id, first_name, hash и т.д.)
 * @returns {boolean}
 */
function verifyTelegramAuth(authData) {
  const { hash, ...data } = authData;
  const token = process.env.BOT_TOKEN;
  
  if (!token) {
    console.error("BOT_TOKEN is not defined in .env");
    return false;
  }

  // Создаем секретный ключ из токена бота
  const secret = crypto.createHash('sha256').update(token).digest();
  
  // Формируем строку проверки: клю=значение, отсортированные по алфавиту, разделенные \n
  const checkString = Object.keys(data)
    .sort()
    .filter(k => data[k]) // Игнорируем пустые значения
    .map(k => `${k}=${data[k]}`)
    .join('\n');

  // Генерируем HMAC-SHA256
  const hmac = crypto.createHmac('sha256', secret)
    .update(checkString)
    .digest('hex');
  
  // Сравниваем полученный хеш с вычисленным
  return hmac === hash;
}

// Routes

// 1. Авторизация через Telegram
app.post('/auth/telegram', async (req, res) => {
  const authData = req.body;

  if (!authData || !authData.hash) {
    return res.status(400).json({ error: 'Missing auth data' });
  }

  // Проверка актуальности данных (не старше 5 минут/300 сек) для защиты от replay attacks
  const now = Math.floor(Date.now() / 1000);
  if (authData.auth_date && (now - authData.auth_date > 300)) {
    return res.status(401).json({ error: 'Session expired. Please try again.' });
  }

  // Проверка подписи
  if (!verifyTelegramAuth(authData)) {
    return res.status(403).json({ error: 'Invalid signature' });
  }

  try {
    const { id, first_name, last_name, username, photo_url } = authData;
    
    // UPSERT: Вставляем пользователя, если есть конфликт по telegram_id — обновляем данные
    const query = `
      INSERT INTO users (telegram_id, first_name, last_name, username, photo_url)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (telegram_id) 
      DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        username = EXCLUDED.username,
        photo_url = EXCLUDED.photo_url,
        updated_at = NOW()
      RETURNING *;
    `;
    
    const { rows } = await pool.query(query, [id, first_name, last_name, username, photo_url]);
    
    // Здесь можно создать JWT токен для сессии вашего приложения, если нужно
    // const sessionToken = createSession(rows[0].id);

    console.log(`User authenticated: ${username || id}`);

    res.json({ 
      status: 'ok', 
      user: rows[0],
      // token: sessionToken 
    });

  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Rostan API is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});