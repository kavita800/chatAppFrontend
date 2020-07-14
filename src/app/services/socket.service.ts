import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {

  private socket = io(environment.SOCKETSENDPOINTS);
  constructor() { }

  connectRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  getMessage() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  isTyping(data) {
    this.socket.emit('typing', data);
  }

  getTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
