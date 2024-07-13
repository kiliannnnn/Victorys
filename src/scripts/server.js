// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Database interaction via PHP and SQL
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('buttonClicked', (data) => {
//     // Check if two users have already clicked the button
//     // If so, redirect them to the chat page using PHP or directly with JavaScript
//     // Otherwise, increment the count and broadcast the event to all clients
//     // io.emit('buttonClicked', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     // Handle disconnection, e.g., update the count of active users
//   });
// });

// server.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });