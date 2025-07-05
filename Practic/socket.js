// Connect as a client to the echo server
const ws = new WebSocket('wss://echo.websocket.org');

ws.on('open', () => {
    console.log('Connected to wss://echo.websocket.org');
    // You can send a message if you want to test echo:
    // ws.send('Hello, echo server!');
});

ws.on('message', (message) => {
    console.log(`Received from server: ${message}`);
});

ws.on('close', () => {
    console.log('Connection closed');
});

ws.on('error', (error) => {
    console.error('WebSocket error:', error);
});



