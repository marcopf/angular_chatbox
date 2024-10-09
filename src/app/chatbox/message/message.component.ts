import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import DynamicFormType from '../../dynamicForm/TDynamicFormType';
import { MessageService } from './message.service';
// import { animate, style, transition, trigger } from '@angular/animations';
import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  animations: [
    trigger('slideFromRight', [
      transition('* => active', [
          style({
              transform: 'translateX(100%)',
          }),
          group([
              animate(
                  '0.3s ease',
                  style({
                    transform: 'translateX(0)',
                  })
              )
          ])
      ]),
  ]),
    trigger('shrink', [
      transition(':leave', [
        style({
          transform: 'translateX(0)',
      }),
      group([
          animate(
              '0.2s ease',
              style({
                transform: 'translateX(-100%)',
              })
          )
      ])
      ]),
  ]),
    trigger('popIn', [
      transition(':enter', [
          style({
              transform: 'scale(0)',
          }),
          group([
              animate(
                  '0.6s ease',
                  style({
                    transform: 'scale(1)',
                  })
              )
          ])
      ]),
  ]),
    trigger('slideFromLeft', [
      transition('* => active', [
          style({
              transform: 'translateX(-100%)',
          }),
          group([
              animate(
                  '0.3s ease',
                  style({
                    transform: 'translateX(0)',
                  })
              )
          ])
      ]),
  ]),
  ]
})
export class MessageComponent {
  @Input() message: any;
  @Input() elementNumber: number = 0;
  pipe = new DatePipe('it');
  createUser: DynamicFormType[] = [
    {
      id: 'firstName',
      label: 'Nome',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'lastName',
      label: 'Cognome',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'username',
      label: 'Username',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'fiscalCode',
      label: 'Codice Fiscale',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'email',
      label: 'Email',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
  ];
  createCone: DynamicFormType[] = [
    {
      id: 'coneCode',
      label: 'Codice Cono',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'roles',
      label: 'Ruoli',
      disabled: false,
      required: true,
      type: 'string',
      value: ''
    },
    {
      id: 'description',
      label: 'Descrizione',
      disabled: false,
      required: false,
      type: 'string',
      value: ''
    },
  ];
  forms: any = {
    "CREATE_USER": this.createUser,
    "CREATE_CONE": this.createCone
  }

  rotateIcon(element: any){
    element.currentTarget.classList.toggle('rotate-icon')
  }

  elaborateTimestamp(timestamp: number){
    const date = new Date(timestamp);

    return this.pipe.transform(date, 'EEEE dd MMMM yyyy - HH:mm')

  }

  constructor(protected messageService: MessageService){}
}
