import { Injectable, input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import DynamicFormType from './TDynamicFormType';
import FormControlObjectType from './TFormControlObjectType';

@Injectable({
    providedIn: 'root',
})
export class DynamicFormService {
    formGroupObj: FormControlObjectType = {};
    addUserForm = new FormGroup({});
    metadata: any[] = [];

    /**
     * Questa funzione e' dedita alla creazione del FormControl specifico per l'input passato
     * come argomento, in maniera dinamica ad aggiungere tutte le informazioni contenute nel json
     * come:
     * - reuired: se l'elemento deve essere compilato o meno
     * - control: arry di stringhe contenenti le regex che verranno puoi usate per i controlli in fase di validazione
     * - disabled: se l'elemento puo essere modificato o mostrato in sola lettura
     *
     * La funzione specifica inoltre alcuni comportamenti previsti di default come la stringa 'true' come valore che rende i
     * checkbox e i toggle gia selezionati o la regex che controlla i spazi iniziali/finali dell'input in esame se di tipo TEXT.
     * @param input
     */
    createControl(input: DynamicFormType): FormControl {
        let validators: any = [];

        if (input.required) {
            validators.push(Validators.required);
        }
        if (input.controls != undefined) {
            input.controls.forEach((regex) => {
                validators.push(Validators.pattern(regex));
            });
        }
        if (input.type == 'CHECKBOX' || input.type == 'TOGGLE') {
            return new FormControl(
                {
                    value: input.value === 'true',
                    disabled: input.disabled,
                },
                validators
            );
        } else if (input.type == 'TEXT') {
            validators.push(Validators.pattern(/^(?!\s)(?!.*\s$).*/));
            return new FormControl(
                { value: input.value, disabled: input.disabled },
                validators
            );
        }
        return new FormControl(
            { value: input.value, disabled: input.disabled },
            validators
        );
    }

    showError(inputName: string, showError: boolean) {
        let index = this.metadata.findIndex((element) => element.name === inputName);
        if (index === -1) return;
        let element = this.metadata[index];
        let errorMessage = element.helperText.invalidFieldMessage;

        let tooltips = document.querySelectorAll(`#${inputName}-tooltip`);

        if (showError){
            tooltips.forEach(tooltip=>{
                tooltip.textContent = errorMessage;
            })
        }
        else{
            tooltips.forEach(tooltip=>{
                tooltip.textContent = "";
            })
        }
    }

    loadValues(newMetadata: any[]) {
        this.metadata = newMetadata;
    }


    /**
     * Questa funzione e' responsabile della creazione dell'oggetto
     * che permette la validazione del form.
     *
     * - Parto ciclando l'array contenente gli oggetti con le informazioni per ogni input.
     * - Scarto gli elementi con id uguale a dummy il quale scopo e' solo quello di occupare spazio
     * - Infine creo il singolo oggetto FormControl specifico per input
     *
     * @param elements - Array di elementi <DynamicFormType> che contiene tutte le informazioni
     * necessarie alla creazione del form
     */
    createFormGroupObj(elements: DynamicFormType[]) {
        let obj: FormControlObjectType = {};

        elements.forEach((el: DynamicFormType) => {
            if (el.id === 'dummy') {
                return;
            }
            obj[el.id] = this.createControl(el);
        });
        return obj;
    }

    updateFormControlObject(basicValue: DynamicFormType[]) {
        this.formGroupObj = this.createFormGroupObj(basicValue);
        this.addUserForm = new FormGroup(this.formGroupObj);
    }

    constructor() {

    }
}
