// sockets
import { Server, Socket } from 'socket.io';
import { mintToken } from './mintToken';
import { 
  sleep, 
  sqlFilter,
  concatPubKeys
} from '../utils';

/**
 * @description Socket connection
 * @date 12/1/2022 - 12:09:49 PM
 *
 * @type {number}
 */

let usersConnected: number = 0;

export const socketConnect = (io: Server): void => {
  io.on("connection", async (socket: Socket) => {
    // Disconnect
    socket.on('disconnect', () => {
      usersConnected--;
      console.log(usersConnected, 'users connected.')
    });
    // Connection
    usersConnected++;
    console.log(usersConnected, 'users connected.');
    socket.emit("serverConnection", "Client connected to server succesfully");
    socket.on('newConnection', async (pubkey: string) => {
    
    });
  });
}
