type DynamicFormType = {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    controls?: string[];
    value: string;
    disabled: boolean;
    helperText?: {
        invalidFieldMessage: string;
        placeholder: string;
        tooltip: string;
    };
};

export default DynamicFormType;