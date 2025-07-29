const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 3000 });
const clients = new Set();

server.on('connection', socket => {
    clients.add(socket);
    socket.on('close', () => clients.delete(socket));
    socket.on('message', message => clients.forEach(client => {if (client !== socket && client.readyState === WebSocket.OPEN) client.send(`${message}`)}));
});

console.log(`WebSocket server running on ws://localhost:${process.env.PORT || 3000}`);
