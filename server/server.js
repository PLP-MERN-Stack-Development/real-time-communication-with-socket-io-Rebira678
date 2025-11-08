// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Allow CORS from both ports (React dev server and production)
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store users and messages
const users = {};
const messages = [];
const typingUsers = {};

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user_join", (username) => {
    users[socket.id] = { username, id: socket.id };
    io.emit("user_list", Object.values(users));
    io.emit("user_joined", { username, id: socket.id });
  });

  socket.on("send_message", (messageData) => {
    const message = {
      ...messageData,
      id: Date.now(),
      sender: users[socket.id]?.username || "Anonymous",
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    if (messages.length > 100) messages.shift();
    io.emit("receive_message", message);
  });

  socket.on("typing", (isTyping) => {
    if (users[socket.id]) {
      const username = users[socket.id].username;
      if (isTyping) typingUsers[socket.id] = username;
      else delete typingUsers[socket.id];
      io.emit("typing_users", Object.values(typingUsers));
    }
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      const { username } = users[socket.id];
      io.emit("user_left", { username, id: socket.id });
    }
    delete users[socket.id];
    delete typingUsers[socket.id];
    io.emit("user_list", Object.values(users));
    io.emit("typing_users", Object.values(typingUsers));
  });
});

// API routes (optional)
app.get("/api/messages", (req, res) => res.json(messages));
app.get("/api/users", (req, res) => res.json(Object.values(users)));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
