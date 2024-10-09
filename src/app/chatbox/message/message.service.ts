import { Injectable } from '@angular/core';
import { timestamp } from 'rxjs';
import messages from '../messagesTEST';
import { ChatboxService } from '../chatbox.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: any[] = messages;

  handleForm(message: any, data: any){
    console.log(message, data)
    message.bodySent = true;
    this.addLoader();
    setTimeout(() => {
      this.messages.push({
        sent: false,
        body: 'Perfetto ho completato le operazioni',
        timestamp: Date.now(),
      })
      this.removeLoader();
    }, 3000);
  }

  addLoader() {
    this.messages.push({
      loader: true,
    });
    setTimeout(() => {
      this.chatService.scrollBottom()
    }, 100);
  }

  removeLoader(){
    this.messages = this.messages.filter(el => !el.loader);
  }

  createMessage(body: string) {
    let message = {
      sent: true,
      body: body,
      timestamp: Date.now(),
    };
    console.log(message.timestamp);
    return message;
  }

  constructor(protected chatService: ChatboxService) {}
}
