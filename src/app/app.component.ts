import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionCardComponent } from './action-card/action-card.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { registerLocaleData } from '@angular/common';
import  itaLocale from '@angular/common/locales/it'
import { DynamicFormComponent } from './dynamicForm/dynamic-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActionCardComponent, ChatboxComponent, DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demoAI';

  constructor(){
    registerLocaleData(itaLocale)
  }
}
