import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { FormToggleComponent } from './form-toggle/form-toggle.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FormTextComponent } from './form-text/form-text.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormNumberComponent } from './form-number/form-number.component';
import { CommonModule } from '@angular/common';

import DynamicFormType from './TDynamicFormType';
import FormControlObjectType from './TFormControlObjectType';

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [
        FormToggleComponent,
        FormCheckboxComponent,
        FormDateComponent,
        FormTextComponent,
        FormSelectComponent,
        ReactiveFormsModule,
        FormNumberComponent,
        CommonModule,
    ],
    templateUrl: './dynamic-form.component.html',
    styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit, OnChanges {
    @Input() incomingData: string = '';
    @Input() formTitle: string = '';
    @Input() formBtn: string = '';
    @Input() basicValue: DynamicFormType[] | null = null;
    @Output() formData = new EventEmitter<FormControlObjectType>();
    @Output() reset = new EventEmitter<FormControlObjectType>();
    @Output() dataAsked = new EventEmitter<boolean>();
    @Input() contentLoaded: boolean = false;
    @Input() hideReset: boolean = false;
    @Input() resetBtn: TemplateRef<any> | undefined = undefined;
    @Input() tag: string = '';

    addUserForm = new FormGroup({});
    controlsReference: FormControlObjectType = {};
    formGroupObj: FormControlObjectType = {};

    /**
     * Funzione che viene chiamata quando si effettua il submit del form,
     * scatenando cosi sia l'evento relativo al trigger del pulsante che quello
     * relativo all'emissioni di dati vera e propria, dati che vengono raccolti
     * dal form appena compilato.
     *
     * verra' emesso un json del tipo:
     * {
     * 		<id_definito_in_Creazione>: <valore_trovato>
     * }
     */
    onSubmit() {
        let data = this.addUserForm.getRawValue();
        // let formErr = this.sanitize.checkFormData(data);
        // formErr.forEach((key: any) => {
        //     this.formFields.showError(key, true)
        // })
        // if (formErr.length === 0) {
            this.dataAsked.emit(true);
            this.formData.emit(this.addUserForm.getRawValue());
        // }
    }

    resetFields(event: any) {
        event.preventDefault();
        let key = Object.keys(this.addUserForm.value);
        key.forEach((key: string) => {
            this.addUserForm.patchValue({ [key]: '' });
        });
        this.dataAsked.emit(true);
        this.reset.emit(this.addUserForm.getRawValue());
    }

    /**
     * Funzione che viene chiamata ogni qualvolta i parametri in Input() subiscano
     * una variazione, in questo caso dapprima controlla se il form va costruito a partire da un'url
     * o da un'oggetto passato in input e poi ricostruisce l'oggetto che permette la validazione
     * del form.
     *
     * @param changes - non usato
     */
    ngOnChanges(changes: SimpleChanges) {
        if (this.basicValue == null) {
            return;
        }
        this.formFields.loadValues(this.basicValue);
        this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
        this.addUserForm = new FormGroup(this.formGroupObj);
    }

    /**
     * Funzione che viene chiamata all'inizio del ciclo di vito del componente.
     * In questo caso dapprima controlla se il form va costruito a partire da un'url
     * o da un'oggetto passato in input costruendo poi l'oggetto che permette la validazione
     * vera e propria del form.
     *
     * @param changes - non usato
     */
    ngOnInit(): void {
        if (this.basicValue == null) {
            return;
        }
        this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
        this.addUserForm = new FormGroup(this.formGroupObj);
        this.formFields.loadValues(this.basicValue);
    }

    constructor(protected formFields: DynamicFormService) {}
}
