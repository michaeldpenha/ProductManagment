export interface GridConfig {
    displayCheckBox?: boolean;
    gridCls?: string;
    enableCellEdit?: boolean;
    enableRowEdit?: boolean;
    noRecord?: Function;
    allItemsChecked?: Function;
    checkBoxDisable?: boolean;
    allItemsSelected?: boolean;
    enableSecondHeader ? : boolean;
}

export interface ColumnConfig {
    width?: number;
    name: string;
    title?: string;
    render?: Function;
    cellClick?: Function;
    enableSorting?: boolean;
    actionItems?: any;
    sortDirection?: string;
    editable?: Function;
    cellEdit?: any;
    row?: any;
    requiredIcon?: boolean;
    sortIndex ?: string; 
    headerEdit?: any;
    headerEditable ? : boolean;
}

export interface ActionGridItemsConfig {
    label?: string;
    actionClass?: string;
    click: Function;
    disable?: Function;
    iconClass?: string;
    btnCls?: string;
}

export interface CellEditConfig {
    type: string;
    options?: any;
    blur?: Function;
    change?: Function;
    placeholder?: string;
    disabled?: Function;
    displayCellEdit?: boolean;
    errorMsg?: string;
    subType?: string;
    printErrorMsg?: Function;
    showErrorMsg?: Function;
    dirty?: boolean;
    focus?: Function;
    inputClass?: string;
    keyPress ? : Function;
    keyUp ? : Function;
    min ? : number;
    max ? : number;
    readOnly ? : Function; 
    minDate ? : Function;
    maxDate ? : Function;
    showDefaultDate? : boolean;
    hidden ? : Function;
    defaultValue?:any;
    datepickerCls?:string;
    value ? : Function;
    name ? : string;
}

export interface HeaderEditConfig {
    type: string;
    options?: any;
    blur?: Function;
    change?: Function;
    placeholder?: string;
    disabled?: Function;
    displayCellEdit?: boolean;
    errorMsg?: string;
    subType?: string;
    printErrorMsg?: Function;
    showErrorMsg?: Function;
    dirty?: boolean;
    focus?: Function;
    inputClass?: string;
    keyPress ? : Function;
    keyUp ? : Function;
    min ? : number;
    max ? : number;
    readOnly ? : Function; 
    minDate ? : Function;
    maxDate ? : Function;
    showDefaultDate? : boolean;
    hidden ? : Function;
    defaultValue?:any;
    datepickerCls?:string;
    value ? : Function;
}