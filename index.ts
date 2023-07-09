import { httpServer } from "./src/http_server/index.js";
import { webSocketServer } from "./src/websocket_server/index.js";
import 'dotenv/config';

const HTTP_PORT = process.env.HTTP_PORT;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocketServer();