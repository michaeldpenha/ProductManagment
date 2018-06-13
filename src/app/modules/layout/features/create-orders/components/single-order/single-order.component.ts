import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  CellEditConfiguration,
  FormFieldConfig
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
  public form : any;
  public fromFields : any = [];
  public submitText : string = 'Submit';
  constructor() { }

  ngOnInit() {
    this.initializeForm();
    this.initializeGrid();
  }
  public initializeGrid = () => {
    this.populateGridConfig();
    this.populateColoumnConfig();
    this.initalizeGridData();
  }
  /**
   * initializeForm();
   */
  public initializeForm = () => {
    this.fromFields = [
      new FormFieldConfig({type:'s',formName:'orderType',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",fieldWidth:"col-md-8",validation :[Validators.required],renderLabel : (item) =>{
        return '';
      },change : (e : any) =>{
        console.log(e);
      }}),
      new FormFieldConfig({type:'i',subtype : 'text',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",formName:'customerId',validation :[Validators.required],renderLabel : (item) =>{
        return 'Customer id*';
      },blur : (e : any , item:any) =>{
        console.log(e.target.value);
      },errorMessages : true,isErrorMessageVisible : (item : any) =>{
        return !this.form.get(item.formName).valid && this.form.get(item.formName).touched
      },displayErrorMessage : () => {
        return 'Required';
      }}),
      new FormFieldConfig({type:'i',formName:'supplierId',disabled : true,readOnly: ()=>{
        return false;
      },label : 'Supplier',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      new FormFieldConfig({type:'s',formName:'transferType',label : 'Transfer Type',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      new FormFieldConfig({type:'i',formName:'refDocNum',label : 'Ref Doc',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      new FormFieldConfig({type:'i',formName:'routeId', label: 'Route Id',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      new FormFieldConfig({type:'i',formName:'routeCode',validation :[Validators.required],renderLabel : (item) =>{
        return 'Route Code *';
      },fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      new FormFieldConfig({type:'i',formName:'stop', label : 'Stop',fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",})
      // new FormFieldConfig({type:'d',formName:'releaseDate',validation :[Validators.required],renderLabel : (item) =>{
      //   return '';
      // },fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",}),
      // new FormFieldConfig({type:'d',formName:'deliveryDate',validation :[Validators.required],renderLabel : (item) =>{
      //   return '';
      // },fieldWidthCls:'col-md-6',displayLabelCls:'form-group required row',fieldLabelClass:'col-md-3 col-form-label',inputClass:"form-control form-control-sm",})
    ]
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
  /**
   * onSubmit
   */
  public onSubmit= (e) => {
    debugger;
  }
  public isDisabled = () : boolean =>{
    return !this.form.valid && this.checkGridValues();
  }
  /**
   * fetchForm = 
   */
  public fetchForm = (form : any) => {
    this.form = form;
  }
  /**
   * checkGridValues
   */
  public checkGridValues = () => {
    let result = false;
    this.data.forEach(element => {
      result = result || (element.itemNumber != '' && element.quantity != '')
    });
    return result;
  }
}
