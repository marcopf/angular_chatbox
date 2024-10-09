import { Component, Input, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
    selector: 'app-form-date',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './form-date.component.html',
    styleUrl: './form-date.component.scss',
})
export class FormDateComponent implements OnChanges {
    @Input() label: string = '';
    @Input() tag: string = '';
    @Input() key: any;
    @Input() formC: FormControl = new FormControl();
    @Input() required: boolean = false;
    requiredLabel = '';

    /**
     * Funzione che viene richiamata ogni volta che il le variabili in input
     * subiscono un cambiamento, va semplicemente ad aggiungere un asterisco
     * nei campi richiesti
     */
    ngOnChanges(): void {
        if (this.required) this.requiredLabel = ' *';
    }
}
