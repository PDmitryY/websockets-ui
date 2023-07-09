import { WebSocketServer } from 'ws';
import 'dotenv/config';

export const webSocketServer = () => {
    const port = process.env.WS_PORT || 8080;

    const wss = new WebSocketServer({ port: +port });
    console.log(`WebSocket server started at port: ${port}`)

    wss.on('connection', function connection(ws) {

        ws.on('error', console.error);

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        ws.send('something');
    });
    wss.on("close", () => {
        console.log("WebSocket server was closed");
    });
}
