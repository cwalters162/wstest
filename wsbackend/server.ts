import WebSocket, {WebSocketServer} from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    let count = 0;

    console.log('New client connected');

    ws.on('message', (data: string) => {
        console.log(`Received message: ${data}`);
        let parsed = JSON.parse(data);
        if ( parsed.command == "increment_count") {
                console.log("incrementing count")
                count += 1
                console.log(`new count: ${count}`)
                ws.send(JSON.stringify({ command: "update_count", payload: count}));
        }
    })

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});