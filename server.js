const WebSocket = require('ws');
const server = new WebSocket.Server({port: process.env.PORT || 3000});
server.on('connection', socket => {
    socket.on('message', message => {
        socket.send(message);
    });
});
console.log(`WebSocket server running on ws://localhost:${process.env.PORT || 3000}`);
