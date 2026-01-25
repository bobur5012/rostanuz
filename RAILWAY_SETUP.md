# Настройка Railway для работы с папкой backend/

## Проблема
Railway пытается запустить проект из корня, но бэкенд находится в папке `backend/`.

## Решение через интерфейс Railway (РЕКОМЕНДУЕТСЯ)

1. Откройте ваш проект на [railway.app](https://railway.app/)
2. Выберите ваш сервис (service)
3. Откройте вкладку **Settings**
4. Найдите раздел **Root Directory**
5. Установите значение: `backend`
6. Сохраните изменения
7. Railway автоматически перезапустит деплой

## Альтернативное решение: через railway.json

Файл `railway.json` в корне уже обновлен и указывает на `backend/Dockerfile`.

Но для полной работы нужно также:

1. В Railway Settings установить **Root Directory** = `backend`
2. Или использовать Nixpacks вместо Dockerfile:
   - В Settings → Build → Builder выберите **Nixpacks**
   - Root Directory установите `backend`

## Проверка после настройки

После того как Railway перезапустится:

1. Проверьте логи - должно быть:
   ```
   BOT_TOKEN exists: true
   Server running on port 3001
   ```

2. Откройте в браузере:
   ```
   https://rostanuz-production.up.railway.app/
   ```
   Должно показать: `Rostan API is running`

3. Проверьте роут:
   ```
   https://rostanuz-production.up.railway.app/auth/telegram
   ```
   Без параметров должно вернуть ошибку `Missing auth data` (это нормально)

## Важно: Переменные окружения

Убедитесь, что в Railway Variables есть:
- `BOT_TOKEN` - токен от BotFather
- `DATABASE_URL` - строка подключения к PostgreSQL
- `FRONTEND_URL` - URL вашего фронтенда (например, `https://rostanuz.netlify.app`)

## Если не работает

1. Удалите сервис на Railway
2. Создайте новый сервис
3. При создании выберите **Deploy from GitHub repo**
4. Выберите ваш репозиторий
5. В настройках сразу установите **Root Directory** = `backend`
6. Добавьте переменные окружения
7. Запустите деплой
