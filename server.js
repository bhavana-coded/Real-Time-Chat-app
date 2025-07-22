const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  let currentUser = "";

  socket.on('join', (username) => {
    currentUser = username;
    socket.broadcast.emit('system message', `🟢 ${username} joined the chat`);
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    if (currentUser) {
      socket.broadcast.emit('system message', `🔴 ${currentUser} left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
