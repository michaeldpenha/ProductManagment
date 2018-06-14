export interface GridConfig {
    displayCheckBox? : boolean;
    gridCls? : string;
    enableCellEdit? :boolean;
    enableRowEdit? : boolean;
    noRecord? : string;
    allItemsSelected? :boolean;
    checkBoxDisable ? : boolean;
}

export interface ColumnConfig {
    name : string;
    title? : string;
    render? : Function;
    cellClick ? : Function;
    enableSorting ? : boolean;
    actionItems? : any;
    sortDirection? : string;
    editable ? : Function;
    cellEdit ? : any;
}

export interface ActionGridItemsConfig {
    label ? : string;
    actionClass ? : string;
    click  : Function;
    disable ? : Function;
}

export interface CellEditConfig {
    type : string;
    options ? : any;
    blur ? : Function;
    change ? : Function;
    placeholder ? : string;
    disabled ? : Function;
    displayCellEdit? : boolean;
    errorMsg ?: string;
    subType ? : string;
}