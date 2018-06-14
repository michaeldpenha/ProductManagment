import { ValidatorFn } from '@angular/forms';
export interface FormConfig {
    label?: string;
    type: string;
    subtype?: string;
    formName: string;
    defaultValue?: any;
    options?: any[];
    placeholder?: string;
    errorMessages?: boolean;
    validation?: ValidatorFn[];
    fieldWidthCls?: string;
    displayLabelCls?: string;
    renderLabel ? : Function;
    blur ? : Function;
    hidden ? : string;
    disabled ? : Function;
    keyUp ? : Function;
    keypress ? : Function;
    change ? :Function;
    isErrorMessageVisible ? : Function;
    displayErrorMessage ? : Function;
    fieldLabelClass? : string;
    inputClass ? : string; 
    fieldWidth ? : string;
    readOnly? : Function;
    minDate ? : Function;
    maxDate ? : Function;
}