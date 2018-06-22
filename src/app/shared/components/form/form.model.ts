import { ValidatorFn } from '@angular/forms';
export interface FormConfig {
    label?: string;
    type: string;
    subtype?: string;
    formName: string;
    defaultValue?: any;
    options?: Function;
    placeholder?: string;
    datepickerCls?: string;
    errorMessages?: boolean;
    validation?: ValidatorFn[];
    fieldWidthCls?: string;
    displayLabelCls?: string;
    renderLabel ? : Function;
    blur ? : Function;
    hidden ? : Function;
    disabled ? : Function;
    keyUp ? : Function;
    keyPress ? : Function;
    keyDown ?: Function;
    change ? :Function;
    isErrorMessageVisible ? : Function;
    displayErrorMessage ? : Function;
    fieldLabelClass? : string;
    inputClass ? : string; 
    fieldWidth ? : string;
    readOnly? : Function;
    minDate ? : Function;
    maxDate ? : Function;
    showDefaultDate? : boolean;
    defaultOptionsValue? : string;
    defaultDisplayLabel?: string;
    min ? : number;
    max ? : number;
    btnCls ?: string;
    btnText?: string;
    btnClick?: Function;
    name ? :string;
}