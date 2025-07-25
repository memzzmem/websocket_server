const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 3000 });

// Store all connected clients
const clients = new Set();

server.on('connection', socket => {
    // Add new client to the set
    clients.add(socket);
    console.log(`New client connected. Total clients: ${clients.size}`);
    
    // Remove client from set when connection closes
    socket.on('close', () => {
        clients.delete(socket);
        console.log(`Client disconnected. Total clients: ${clients.size}`);
    });
    
    socket.on('message', message => {
        // Broadcast message to all connected clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${message}`);
            }
        });
    });
});

console.log(`WebSocket server running on ws://localhost:${process.env.PORT || 3000}`);
