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
}

export interface ActionGridItemsConfig {
    label ? : string;
    actionClass ? : string;
    click  : Function;
    disable ? : Function;
}