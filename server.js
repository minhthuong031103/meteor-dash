const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
          path: '/socket',
          cors: {
                    origin: '*',
                    methods: ["GET", "POST"]
          }
});

const players = new Map();

io.on('connection', (socket) => {
          console.log('Player connected:', socket.id);

          socket.on('playerJoin', (data) => {
                    players.set(socket.id, {
                              id: socket.id,
                              rocketLeft: data.rocketLeft,
                              degrees: data.degrees,
                              isColliding: data.isColliding,
                              livesRemaining: data.livesRemaining
                    });
                    io.emit('playersUpdate', Array.from(players.values()));
          });

          socket.on('playerMove', (data) => {
                    const player = players.get(socket.id);
                    if (player) {
                              player.rocketLeft = data.rocketLeft;
                              player.degrees = data.degrees;
                              io.emit('playersUpdate', Array.from(players.values()));
                    }
          });

          socket.on('playerCollision', (data) => {
                    const player = players.get(socket.id);
                    if (player) {
                              player.isColliding = data.isColliding;
                              player.livesRemaining = data.livesRemaining;
                              io.emit('playersUpdate', Array.from(players.values()));
                    }
          });

          socket.on('disconnect', () => {
                    players.delete(socket.id);
                    io.emit('playersUpdate', Array.from(players.values()));
                    console.log('Player disconnected:', socket.id);
          });
});

server.listen(3001, () => {
          console.log('Server running on port 3001');
}); 