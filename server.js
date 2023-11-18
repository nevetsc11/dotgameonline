// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const players = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Assign a unique ID to each player
  players[socket.id] = { score: 0 };

  // Send player scores to all connected clients
  io.emit('updateScores', players);

  socket.on('scoreUpdate', () => {
    players[socket.id].score++;
    io.emit('updateScores', players);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete players[socket.id];
    io.emit('updateScores', players);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});