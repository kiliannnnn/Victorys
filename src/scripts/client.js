// const socket = io();

// socket.on('connect', () => {
//   console.log('Connected to the server');
// });

// socket.on('buttonClicked', (data) => {
//   // Handle the button clicked event
//   if (data.count === 2) {
//     window.location.href = '/chat-page';
//   } else {
//     // Increment the count of users who have clicked the button
//     // You might use an AJAX call here to update the count on the server via PHP/SQL
//   }
// });

// socket.on('newMessage', (message) => {
//   // Handle new chat messages
//   console.log(message);
//   // Display message in the chat interface
// });

// // Send a message when the user types something
// const sendMessage = (message) => {
//   socket.emit('sendMessage', message);
// };