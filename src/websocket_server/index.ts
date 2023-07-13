import { WebSocketServer } from 'ws';
import 'dotenv/config';
import { getDb, setDb } from '../db/index.js';
import { User } from '../types/index.js';

export const webSocketServer = () => {
    const port = process.env.WS_PORT || 8080;

    const wss: WebSocketServer  = new WebSocketServer({ port: +port });
    console.log(`WebSocket server started at port: ${port}`)

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message: string) {
          try {
            const mes = JSON.parse(message);
            console.log("mes", mes);
            console.log("mes.type", mes.type);
            switch (mes.type) {
              case 'reg':
                const user = JSON.parse(mes.data);
                const newUser: User = {
                  userId: mes.id,
                  name: user.name,
                  password: user.password,
                }
                const db = getDb();
                db.users.push(newUser);
                setDb(db);
                console.log('db', db);
                function reg(
                    name: string,
                    index: number,
                    error = false,
                    errorText = '',
                  ): void {
                    const response = {
                      type: 'reg',
                      data: JSON.stringify({ name: name, index: index, error: error, errorText: errorText }),
                      id: 0,
                    };
                    ws.send(JSON.stringify(response));
                  };
                  reg(newUser.name, newUser.userId, false, '');
                break;
              case 'create_room':
                break;
            //   case 'add_user_to_room':
            // 
            //     break;
            //   case 'add_ships':
            //     
            //     break;
            //   case 'attack':
            //     
            //     break;
            //   case 'randomAttack':
            //     
            //     break;
            //   case 'single_play':
            //     
            //     break;
              default:
                console.log('Unknown message:', mes.type);
                break;
            }
          } catch (error) {
            console.error('Error:', error);
          }
        });
    });
    wss.on("close", () => {
        console.log("WebSocket server was closed");
    });
}
