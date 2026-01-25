# Инструкция по запуску Бэкенда (Backend)

## Шаг 1: Подготовка Базы Данных (PostgreSQL)

1.  Убедитесь, что PostgreSQL установлен и запущен.
2.  Создайте базу данных с именем `rostan_db`. В терминале или SQL Shell выполните:
    ```sql
    CREATE DATABASE rostan_db;
    ```
3.  Примените структуру таблиц. Вы можете скопировать содержимое файла `backend/database.sql` и выполнить его в Query Tool (pgAdmin) или терминале:
    ```bash
    psql -U postgres -d rostan_db -f backend/database.sql
    ```

---

## Шаг 2: Настройка Сервера

1.  Перейдите в папку `backend`:
    ```bash
    cd backend
    ```

2.  Установите необходимые библиотеки:
    ```bash
    npm install
    ```

3.  **Файл `.env` уже создан** со следующим содержимым:
    
    ```env
    PORT=3001
    BOT_TOKEN=8392374449:AAGLe9PU5btozMgvVLjr07PA1cwKfaUu_Lk
    DATABASE_URL=postgres://postgres:password@localhost:5432/rostan_db
    YANDEX_MAPS_API_KEY=34326806-895d-4878-96c6-da6d65c3482d
    ```

    **Важно:** 
    *   Если у вашего пользователя `postgres` другой пароль (не `password`), замените его в строке `DATABASE_URL`.
    *   Формат: `postgres://имя_пользователя:пароль@localhost:5432/имя_базы`
    *   `YANDEX_MAPS_API_KEY` используется для работы карт.

---

## Шаг 3: Запуск Сервера

Запустите сервер командой:

```bash
npm start
```

Ожидаемый вывод:
> Server running on port 3001
> Database connected successfully

---

## Шаг 4: Подключение Фронтенда

Фронтенд уже настроен на работу с этим сервером в файле `pages/Login.tsx`.

1.  Откройте `pages/Login.tsx`.
2.  Найдите закомментированный блок `fetch` внутри функции `(window as any).onTelegramAuth`.
3.  Раскомментируйте его, чтобы при входе данные отправлялись на `http://localhost:3001/auth/telegram`.

Пример раскомментированного кода в `Login.tsx`:

```typescript
fetch('http://localhost:3001/auth/telegram', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
})
.then(res => res.json())
.then(data => {
    if(data.status === 'ok') {
        // Логин успешен, сохраняем пользователя
        onLogin(data.user);
    }
});
```