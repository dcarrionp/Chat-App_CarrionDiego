import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: { user: string; text: string }[] = [];
  newMessage: string = '';
  user: string = 'Usuario' + Math.floor(Math.random() * 1000);
  socket: any;

  ngOnInit(): void {
    // Conecta con el servidor WebSocket
    this.socket = io('http://localhost:3000'); // Cambia la URL si es necesario

    // Escucha mensajes entrantes
    this.socket.on('message', (data: { user: string; text: string }) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Envía el mensaje al servidor
      const message = { user: this.user, text: this.newMessage };
      this.socket.emit('message', message);

      // Agrega el mensaje localmente y limpia el campo
      this.messages.push(message);
      this.newMessage = '';
    }
  }
}
