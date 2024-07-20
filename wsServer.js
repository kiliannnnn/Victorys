import WebSocket, { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

server.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const text = message.toString(); // Convert Buffer to string
    console.log('Received:', text);
    // Broadcast message to all clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
