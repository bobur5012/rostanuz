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

3.  **Создайте файл `.env`** в папке `backend` со следующим содержимым:
    
    ```env
    PORT=3001
    BOT_TOKEN=ваш_токен_от_BotFather
    DATABASE_URL=postgres://postgres:password@localhost:5432/rostan_db
    YANDEX_MAPS_API_KEY=34326806-895d-4878-96c6-da6d65c3482d
    FRONTEND_URL=http://localhost:3000
    ```

    **Важно:** 
    *   `BOT_TOKEN` - обязателен! Получите его у [@BotFather](https://t.me/botfather) командой `/newbot`
    *   `FRONTEND_URL` - URL вашего фронтенда (для локальной разработки `http://localhost:3000`, для продакшена - ваш домен на Netlify)
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

## Шаг 4: Настройка Telegram Bot

**ОБЯЗАТЕЛЬНО для работы авторизации:**

1.  Создайте бота через [@BotFather](https://t.me/botfather):
    - Отправьте `/newbot`
    - Следуйте инструкциям
    - Скопируйте токен и добавьте в `.env` как `BOT_TOKEN`

2.  Настройте домен для виджета авторизации:
    - Отправьте `/setdomain` в [@BotFather](https://t.me/botfather)
    - Выберите вашего бота
    - Для локальной разработки: `localhost:3000`
    - Для продакшена: ваш домен на Netlify (например, `rostanuz.netlify.app`)

**Важно:** Без настройки домена через BotFather виджет авторизации не будет работать!

---

## Шаг 5: Проверка работы

1.  Запустите бэкенд: `npm start`
2.  Проверьте в консоли: должно быть `BOT_TOKEN exists: true`
3.  Если `false` - проверьте файл `.env` и переменную `BOT_TOKEN`

---

## Как работает авторизация

1.  Пользователь нажимает кнопку Telegram на фронтенде
2.  Telegram делает редирект на `BACKEND_URL/auth/telegram` с данными в query параметрах
3.  Backend проверяет подпись (HMAC) и `auth_date` (не старше 24 часов)
4.  Backend создает/обновляет пользователя в базе данных
5.  Backend возвращает HTML страницу, которая сохраняет данные в localStorage и редиректит на фронтенд
6.  Фронтенд автоматически логинит пользователя