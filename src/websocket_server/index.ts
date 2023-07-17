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
            switch (mes.type) {
              case 'reg':
                {
                const db = getDb();
                const user = JSON.parse(mes.data);
                const newUser: User = {
                  userId: db.users.length,
                  name: user.name,
                  password: user.password,
                }
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
                }
                break;
              case 'create_room':
               {
                console.log("mes", mes);
                const db = getDb();
                const roomUser =  db.users[0];
                const newRoom = {
                  roomId: db.rooms.length,
                  roomUsers: [{
                    userId: roomUser.userId,
                    name: roomUser.name
                  }]
                };
                db.rooms.push(newRoom);
                console.log('db', db);
                const response = {
                  type: "create_game",
                  data: JSON.stringify({idGame: 1, idPlayer: 0}),
              id: 0,
                }
                ws.send(JSON.stringify(response));
                }
                break;
              case 'add_user_to_room':
                console.log("mes", mes);
                break;
              case 'add_ships':
                console.log("mes", mes);
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
