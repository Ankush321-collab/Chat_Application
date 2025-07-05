import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

// Store online users
const users = {};

io.on("connection", (socket) => {
  console.log("🔌 New socket connection:", socket.id);
  
  // Handle user connection with user ID
  const userid = socket.handshake.query.userid;
  console.log("📋 User ID from query:", userid);
  
  if (userid) {
    users[userid] = socket.id;
    // Store userid in socket data for disconnect event
    socket.userid = userid;
    console.log("✅ User connected:", userid, "Socket:", socket.id);
    console.log("👥 Current online users:", Object.keys(users));
  } else {
    console.log("❌ No user ID provided in socket connection");
  }
  
  // Send online users list to all connected clients
  const onlineUserIds = Object.keys(users);
  console.log("📤 Broadcasting online users:", onlineUserIds);
  io.emit("getonlineusers", onlineUserIds);

  socket.on("disconnect", () => {
    console.log("🔌 Socket disconnected:", socket.id);
    // Remove user from online users using stored userid
    if (socket.userid) {
      delete users[socket.userid];
      console.log("❌ User disconnected:", socket.userid);
      console.log("👥 Remaining online users:", Object.keys(users));
      // Send updated online users list to all clients
      io.emit("getonlineusers", Object.keys(users));
    }
  });
});

export { app, io, server };