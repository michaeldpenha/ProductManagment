import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() gridConfig: any;
  @Input() coloumnConfig: any;
  @Input() gridData: any;

  @Output() allItemChecked = new EventEmitter<any>();
  @Output() triggerSortEvent = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any>();
  public noRecord: string;
  public displayCheckBox: boolean;
  public allItemsSelected: boolean;
  public reverseSort: boolean = true;
  public gridCls: string;
  public enableCellEdit: boolean;
  public enableRowEdit: boolean;
  public checkBoxDisable: Function;
  public columnDefs : any;

  constructor() { }

  ngOnInit() {
    this.defaultGridSettings()
  }

  /**
   * defaultGridSettings
   */
  public defaultGridSettings = () => {
    let cfg = this.gridConfig.config;
    this.displayCheckBox = cfg.displayCheckBox ? cfg.displayCheckBox : false;
    this.gridCls = cfg.gridCls ? cfg.gridCls : 'table table-striped';
    this.enableCellEdit = cfg.cellEdit ? cfg.cellEdit : false;
    this.enableRowEdit = cfg.rowEdit ? cfg.rowEdit : false;
    this.noRecord = cfg.noDatFound ? cfg.noDatFound : 'No data found';
    this.allItemsSelected =cfg.allItemsSelected ? cfg.allItemsSelected : false;
    this.checkBoxDisable = cfg.checkBoxDisable ? cfg.checkBoxDisable : (item: any) => { return false };
    this.columnDefs = this.coloumnConfig;
  }
  /**
   * customTemplate
   */
  public customTemplate = (rec : any, colDef : any ,index : number) => {
    let result: any;
    (colDef.render) ? result = colDef.render(rec,colDef.name,index) : result = rec[colDef.name];
    return result;
  }
  /**
   * cellClick
   */
  public cellClick = (rec, colDef) => {
    if (!colDef.enableCellClick) {
      return false;
    }
    colDef.cellClick(rec, colDef);
  }
  /**
   * allSelected
   */
  public allSelected = (event) => {
    this.allItemChecked.emit(event);
  }
  /**
   * triggerSort
   */
  public triggerSort = (colDef: any) => {
    if (!colDef.enableSorting) {
      return;
    }
    this.triggerSortEvent.emit(colDef);
    colDef.sortDirection = colDef.sortDirection.toLowerCase() === "asc" ? "DESC" : "ASC";
  }
  /**
   * To DisableCheckBox
   */
  public disableCheckBox = (item: any): boolean => {
    return this.checkBoxDisable(item);
  }
  /**
   * rowSelection
   */
  public rowSelection = (item) => {
    this.rowSelected.emit(item);
  }
  /**
   * gridClass
   */
  public gridClass = () => {
    return this.gridCls;
  }
  /**
   * isEditable
   */
  public isEditable = (item : any , cfg: any) : boolean => {
    let result : boolean;
    result = cfg.editable ? cfg.editable(item) : false;
    return result;
  }
  /**
   * printValue
   */
  public printValue = (item : any, dataIndex:any) : string => {
    return item[dataIndex] ? item[dataIndex] : '';
  }
  /**
   * onBlur 
   */
  public onBlur = (e,item : any, cfg:any,index :number) => {
    this.updateGridData(index,cfg.name,e.target.value);
    cfg.cellEdit.config.blur ? cfg.cellEdit.config.blur(e,item,cfg,index) : '';
  }
  /**
   * updateGridData
   */
  public updateGridData = (i : number , dataIndex : string,value : string) => {
    this.gridData[i][dataIndex] = value;
  }
  /**
   * It will disable input field
   */
  public disableField = (item : any, cfg:any,index : number) : any =>{
    let result : any ;
    result = cfg.cellEdit.config.disabled ? cfg.cellEdit.config.disabled(item,cfg,index) : false; 
    return result;
  }
  /**
   * checkTypeofEditableField
   */
  public checkTypeofEditableField = (type : string,cfg : any) : boolean => {
    let result : boolean;
    result = cfg.cellEdit.config.type.toLowerCase() == type;
    return result;
  }
  /**
   * Wll return options value for dropdown
   */
  public printOptonsValue = (cfg : any) : any => {
    return cfg.cellEdit.config.options ? cfg.cellEdit.config.options : []; 
  }
  /**
   * getInputSubType
   */
  public getInputSubType = (cfg :any) => {
    return cfg && cfg.cellEdit.config.subType ? cfg.cellEdit.config.subType : 'text';
  }
}
