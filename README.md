# ChatApp(BAckup) (MERN Stack)

A modern, responsive real-time chat application built with the MERN stack.

---

## 🚀 Features
- **Real-time messaging** with Socket.io
- **Online/offline user status** (Socket.io)
- **Responsive design**: 
  - Mobile: single-panel navigation (user list <-> chat with back button)
  - Desktop: classic side-by-side layout (user list + chat)
- **Authentication** (Signup/Login)
- **Modern UI** with Tailwind CSS
- **State management** with Zustand (global conversation/user state)
- **Smooth transitions and effects**

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Zustand (state), Socket.io-client (real-time), Vite
- **Backend**: Node.js, Express.js, Socket.io (real-time)
- **Database**: MongoDB (Mongoose)
- **API**: RESTful endpoints for user, message, and conversation management

---

## 📱 Responsive Design
- **Mobile**: User list and chat are shown one at a time, with a back button for navigation.
- **Desktop**: Both user list and chat are visible side-by-side for a classic chat experience.
- **Animations**: Smooth transitions, sticky headers, and modern effects for a polished look.

---

## 📦 API & Real-Time Overview
- **User API**: Signup, login, get all users, get user by ID
- **Message API**: Send message, get messages for a conversation
- **Conversation API**: Create/get conversations between users
- **Socket.io**: Real-time message delivery, online user tracking, instant updates

---

## 🖥️ Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd ChatApp(1-1)
```

### 2. Install dependencies
#### Backend
```bash
cd Backend
npm install
```
#### Frontend
```bash
cd ../Frontend
npm install
```

### 3. Start the servers
#### Backend
```bash
npm start
```
#### Frontend
```bash
npm run dev
```

---

## 🖼️ Screenshots

### Desktop
![Desktop Screenshot](./screenshots/desktop.png)

### Mobile
![Mobile Screenshot](./screenshots/mobile.png)

> _Replace the above images with your own screenshots for best results._

---

## 📚 Folder Structure
```
ChatApp(1-1)/
  Backend/    # Express, Socket.io, MongoDB models, API routes
    Controller/
    Middleware/
    model/
    Routes/
    index.js
    package.json
  Frontend/   # React, Tailwind, Zustand, Socket.io-client, UI components
    src/
      App.jsx
      main.jsx
      context/
        AuthContext.jsx
        GetAllUser.jsx
        socketContext.jsx   # Socket.io client context
        usegetmessage.js
        UseSENDmessage.js
      Zustand/
        Useconversation.js # Zustand store for conversation/user state
      Left/
        Left.jsx
        Logout.jsx
        Search.jsx
        User.jsx
        Users.jsx
      Right/
        ChatUser.jsx
        Message.jsx
        Messages.jsx
        Right.jsx
        Typesend.jsx
      components/
        Loading.jsx
        Login.jsx
        Signup.jsx
      assets/
      index.css
      App.css
    public/
    package.json
    tailwind.config.js
    vite.config.js
    README.md
```

---

## ✨ Credits
- Built with MERN stack, Tailwind CSS, Zustand, and Socket.io
- UI inspired by modern chat apps

---

## 📢 Notes
- Make sure MongoDB is running locally or update the connection string in the backend.
- For best experience, use the app on both mobile and desktop to see the responsive design in action!
