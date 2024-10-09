import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatboxService {
  isOpen: boolean = false;
  obj: any;

  scrollBottom(){
    const chatBody = document.querySelector('.inner-body') as HTMLDivElement;

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  expand(event: any){
    setTimeout(() => {
      this.isOpen = true;
      setTimeout(() => {
        this.scrollBottom();
      });
    }, 600);
    this.obj = event.currentTarget.parentNode;
    this.obj.classList.add('chat-open');
  }

  collapse(){
    this.isOpen = false;
    this.obj.classList.remove('chat-open');
  }

  constructor() { }
}
