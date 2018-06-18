export interface GridConfig {
    displayCheckBox?: boolean;
    gridCls?: string;
    enableCellEdit?: boolean;
    enableRowEdit?: boolean;
    noRecord?: string;
    allItemsSelected?: boolean;
    checkBoxDisable?: boolean;
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
}

export interface ActionGridItemsConfig {
    label?: string;
    actionClass?: string;
    click: Function;
    disable?: Function;
    iconClass?: string;
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
}