# Telegram Chat (React + GREEN-API)

Веб-мессенджер: отправка и приём **текстовых** сообщений Telegram через [GREEN-API](https://green-api.com/telegram). UI — список чатов и окно переписки, как в Telegram Web.

## Что нужно

- Node.js **18+**
- Авторизованный инстанс **Telegram** в [личном кабинете GREEN-API](https://console.green-api.com/)
- Поле **Webhook URL** в инстансе — **пустое** (входящие забираем через `receiveNotification`, не webhook)
- Браузер с отключённым CORS для локальной разработки

## Запуск локально

### 1) Установить зависимости

```bash
cd greenApiTg
npm install
```

### 2) Запустить локальный dev-сервер

```bash
npm run start
```

Dev-сервер стартует на порту **8081**.

### 3) Запустить браузер без CORS

#### macOS

```bash
open -na "Google Chrome" --args --disable-web-security --user-data-dir="/tmp/chrome-dev"
```

#### Windows

```powershell
Start-Process "chrome.exe" -ArgumentList '--disable-web-security','--user-data-dir="C:\chrome-dev"'
```

После этого откройте в этом браузере:

```text
http://localhost:8081
```

> Важно: CORS надо отключить именно в отдельном профиле Chrome, чтобы локальный frontend мог напрямую обращаться к GREEN-API.

## Что нужно в приложении

1. Вводим `API URL` из GREEN-API.
   - Для instance-specific домена обычно выглядит так: `https://4100.api.green-api.com`
   - либо общий вариант: `https://api.green-api.com`
2. Вводим `idInstance` и `apiTokenInstance` из кабинета.
3. После входа приложение начинает polling через `receiveNotification`.

## Как пользоваться

1. **Вход** — `API URL`, `idInstance`, `apiTokenInstance` из кабинета.
2. **Новый чат** — ✏️, номер телефона (например `79876543210`), «Создать». Внутри это `79876543210@c.us`.
3. **Отправка** — текст внизу, Enter или ➤ (Shift+Enter — новая строка, макс. 4096 символов).
4. **Входящие** — ответ в Telegram появится в чате через polling (обычно несколько секунд).
5. **Выход** — ⏻ в шапке списка чатов.

Credentials и история чатов лежат в `localStorage` (`green-api-credentials`, `green-api-chats`).

## Другие команды

| Команда | Назначение |
|---------|------------|
| `npm run build` | Сборка проекта |
| `npm run storybook` | UI на [http://localhost:6006](http://localhost:6006) |
| `npm run check` | lint + format |

## Как устроено (кратко)

- **FSD:** `app` (роутер, Redux), `pages`, `widgets`, `features`, `entities`, `shared`
- **Auth:** credentials в `localStorage`, хук `useAuth`, маршруты `/login` и `/messenger/:chatId?`
- **API:** `entities/green-api/api/greenApi.ts` — `sendMessage`, `receiveNotification`, `deleteNotification`
- **Входящие:** `useNotifications` — цикл long poll на странице мессенджера, только текстовые webhook
- **Чаты:** Redux `chatSlice` + сохранение в `localStorage` через middleware

## Если что-то не работает

- Не отправляется — проверьте инстанс, токен, что инстанс авторизован.
- Не приходят входящие — пустой Webhook URL, вы на `/messenger`, ответ именно **текст**.
- Порт занят — смените `port` в `webpack/webpack.dev.js`.
- CORS блокирует запросы — запускать приложение только в браузере с `--disable-web-security`.

## Стек

React 19, TypeScript, Redux Toolkit, React Router 7, Axios, Webpack 5, CSS Modules, Storybook.
