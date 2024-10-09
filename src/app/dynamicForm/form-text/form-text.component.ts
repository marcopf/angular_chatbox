import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
    selector: 'app-form-text',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './form-text.component.html',
    styleUrl: './form-text.component.scss',
})
export class FormTextComponent implements OnChanges {
    @Input() label: string = '';
    @Input() type: string | undefined = undefined;
    @Input() tag: string = '';
    @Input() key: any;
    @Input() givenPlaceHolder: string | undefined = '';
    @Input() errorMessage: string | undefined = '';
    @Input() tooltip: string | undefined = '';
    @Input() formC: FormControl = new FormControl();
    @Input() required: boolean = false;
    requiredLabel = '';

    /**
     * Funzione che viene richimata alla pressione di un tasto,
     * controlla sel l'input attuale e' valido e mostra un
     * feedback in base al riscontro
     *
     * @param input
     * Rappresenta l'oggetto che ha scatenato l'evento, viene
     * utilizzato da target per aggiornare il feedback grafico
     */
    checkError(input: any) {
        if (input.key === "Enter")
            return;
        if (!this.formC.valid) {
            input.target.classList.remove('is-valid');
            input.target.classList.add('is-invalid');
            this.formService.showError(this.key, true)
        } else {
            input.target.classList.remove('is-invalid');
            input.target.classList.add('is-valid');
            this.formService.showError(this.key, false)
        }
    }
    
    /**
     * Funzione che viene richiamata ogni volta che il le variabili in input
     * subiscono un cambiamento, va semplicemente ad aggiungere un asterisco
     * nei campi richiesti
     */
    ngOnChanges(): void {
        if (this.required) {
            this.requiredLabel = ' *';
        }


    }

    constructor(protected formService: DynamicFormService) { 

    }
}
