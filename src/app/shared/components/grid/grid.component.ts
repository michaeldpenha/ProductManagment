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
    this.gridCls = cfg.gridCls ? cfg.gridCls : 'table table-grid';
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
  public customTemplate = (rec, colDef) => {
    let result: any;
    (colDef.render) ? result = colDef.render(rec,colDef.name) : result = rec[colDef.name];
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
}
