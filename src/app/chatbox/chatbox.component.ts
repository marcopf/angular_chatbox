import { Component } from '@angular/core';
import { ChatboxService } from './chatbox.service';
import { MessageComponent } from './message/message.component';
import messages from './messagesTEST';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './message/message.service';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [MessageComponent, CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss',
})
export class ChatboxComponent {
  newMessage: string = '';

  sendMessage() {
    this.messageService.messages.push(this.messageService.createMessage(this.newMessage));
    this.newMessage = '';
    setTimeout(() => {
      this.chatService.scrollBottom();
    }, 100);
    setTimeout(() => {
      this.messageService.addLoader();
    }, 400);
    setTimeout(() => {
      this.messageService.messages.push({
        sent: false,
        body: 'Certo, inserisci i dati nel form sottostante',
        formType: 'CREATE_USER',
        timestamp: Date.now(),
      });
      this.messageService.messages.push({
        sent: false,
        body: 'Certo, inserisci i dati nel form sottostante',
        formType: 'CREATE_CONE',
        timestamp: Date.now(),
      });
      this.messageService.removeLoader();
      setTimeout(() => {
        this.chatService.scrollBottom();
        
      }, 100);
    }, 3000);

  }

  constructor(
    protected chatService: ChatboxService,
    protected messageService: MessageService
  ) {}
}
