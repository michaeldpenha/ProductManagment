import { Component, OnInit } from '@angular/core';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  CellEditConfiguration
} from '@app/shared/model';
@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  public gridConfig: any = [];
  public coloumnConfig: any = [];
  public data: any = [];
  constructor() { }

  ngOnInit() {
    this.initializeGrid();
  }
  public initializeGrid = () => {
    this.populateGridConfig();
    this.populateColoumnConfig();
    this.initalizeGridData();
  }
  public populateGridConfig = () => {
    this.gridConfig = new GridConfiguration({
      displayCheckBox: false,
      enableCellEdit: true,
      allItemsSelected: false
    });
  }
  /**
   * populateColoumnConfig
   */
  public populateColoumnConfig = () => {
    this.coloumnConfig = [
      new GridColoumnConfig({ name: '', title: '#', editable : (item) => {return true;},cellEdit : new CellEditConfiguration({type : 'I',errorMsg:'',displayCellEdit:true , blur : (e,item,col) => { console.log('Blur')}}), render: (item, col, i) => { return i + 1; } }),
      new GridColoumnConfig({ name: 'itemNumber', cellEdit : new CellEditConfiguration({type : 'I',blur : () => {},displayCellEdit:true}),title: 'Item No.' }),
      new GridColoumnConfig({ name: 'pack', cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true,disabled : () => {}}),title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true}),title: 'Size' }),
      new GridColoumnConfig({ name: 'description', cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true}),title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi',cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true}), title: 'TixHi' }),
      new GridColoumnConfig({ name: 'upc', cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true}),title: 'UPC' }),
      new GridColoumnConfig({ name: 'quantity', cellEdit : new CellEditConfiguration({type : 'I',displayCellEdit  :true}),title: 'Quantity' }),
      new GridColoumnConfig({
        name: 'actions',
        title: 'Action',
        actionItems: [
          new GridActionsConfig({ label: '', click: (item, actionCfg) => { console.log('Test') } })
        ]
      })
    ]
  }
  /**
   * initalizeGridData
   */
  public initalizeGridData = () => {
    this.pushBlankObjectInGrid();
  }
  /**
   * pushBlankObjectInGrid
   */
  public pushBlankObjectInGrid = () => {
    this.data.push(this.createObjectWithBlankValues(this.coloumnConfig));
  }
  /**
   * addLine
   */
  public addRow = () => {
    this.pushBlankObjectInGrid();
  }
  /**
   * 
   * Need to put this function at one place
   * TODO 
   */
  public createObjectWithBlankValues = (ary: any[]): any => {
    let result: any;
    result = ary.map(element => {
      let key: string = element.config.name;
      return { key: '' };
    });
    return result;
  }
}
