import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  // Escuchar mensajes
  getMessage() {
    return this.socket.fromEvent<string>('message');
  }

  // Enviar mensaje
  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}