const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let values = [];

server.on('connection', (socket) => {
  console.log('Client connected');
  // Send the initial values to the connected client
  socket.send(JSON.stringify(values));

  // Broadcast the new value to all connected clients
  socket.on('message', (message) => {
    const newValue = JSON.parse(message);
    let uniqueUser = values.filter((user) => user.uid === newValue.uid)
    if (uniqueUser.length === 0) {
      values.push(newValue);
    }

    for (const client of server.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(values));
      }
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port 8080');
