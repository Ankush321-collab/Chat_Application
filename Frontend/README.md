# ChatApp Frontend

This is the React frontend for a full-stack 1-to-1 chat application.

## Features
- User authentication (login/signup)
- Protected routes
- Real-time 1-to-1 messaging UI
- Zustand for global state (selected conversation, etc.)
- Socket.io for real-time communication (if enabled)
- Auto-scroll to latest message
- Responsive, modern UI with Tailwind CSS

## Tech Stack
- **Frontend:** React, Zustand, Tailwind CSS, Vite, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Socket.io

## API Endpoints
All API endpoints are prefixed with `/api` and expect JSON bodies unless otherwise noted.

### Auth
- `POST   /api/signup`   — Register a new user
- `POST   /api/login`    — Login and receive JWT (cookie)
- `POST   /api/logout`   — Logout (clear cookie)

### Users
- `GET    /api/alluser`  — Get all users except current (protected)

### Messages
- `POST   /api/send/:id` — Send a message to user with id `:id` (protected)
- `GET    /api/get/:id`  — Get all messages with user `:id` (protected)

## URLs
- **Frontend:** `http://localhost:5173`
- **Backend:**  `http://localhost:5000`

> Make sure the backend is running and CORS is configured to allow requests from the frontend URL.

## Folder Structure
```
Frontend/
  src/
    App.jsx           # Main app routes
    main.jsx          # Entry point
    context/          # Auth and message context/hooks
    Left/             # Sidebar components (user list, search, etc.)
    Right/            # Chat area (messages, input, chat header)
    Zustand/          # Zustand store for conversation state
    components/       # Auth forms, loading, etc.
  public/             # Static assets
  tailwind.config.js  # Tailwind CSS config
  vite.config.js      # Vite config
  README.md           # This file
```

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app runs at [http://localhost:5173](http://localhost:5173) by default.

## Environment
- Expects backend running at `http://localhost:5000`
- Uses cookies for authentication (`withCredentials: true` in axios)

## Notes
- If you change the backend URL, update it in your axios calls.
- Socket.io is used for real-time features (if enabled in both frontend and backend).

## Credits
- Built with React, Zustand, Tailwind CSS, Vite, Socket.io.
- Icons by Lucide and react-icons.
