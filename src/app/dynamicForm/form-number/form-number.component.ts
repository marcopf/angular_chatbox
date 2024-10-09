import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-number',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './form-number.component.html',
    styleUrl: './form-number.component.scss',
})
export class FormNumberComponent {
    @Input() label: string = '';
    @Input() type: string = 'text';
    @Input() tag: string = '';
    @Input() key: any;
    @Input() givenPlaceHolder: string | undefined = '';
    @Input() baseUnderText: string | undefined = '';
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
        if (!this.formC.valid) {
            input.target.classList.remove('is-valid');
            input.target.classList.add('is-invalid');
            document.querySelector(
                `#${this.tag}${this.key}-tooltip`
            )!.textContent = this.baseUnderText!;
        } else {
            input.target.classList.remove('is-invalid');
            input.target.classList.add('is-valid');
        }
    }
}
