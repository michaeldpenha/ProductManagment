import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { SingleOrderService } from './single-order.service';
import * as moment from 'moment';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  CellEditConfiguration,
  FormFieldConfig
} from '@app/shared/model';
import {SupplierInfoService} from '@app/shared/services';
@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  public gridConfig: any = [];
  public coloumnConfig: any = [];
  public data: any = [];
  public form: any;
  public fromFields: any = [];
  public submitText: string = 'Submit';
  public supplierObj : any[]= [];
  constructor(private singleOrderService: SingleOrderService,private supplierServices : SupplierInfoService) { }

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
      new FormFieldConfig({
        type: 'dropdown', formName: 'orderType', label: 'Order Type', defaultValue: 'Select Order Types', options: this.singleOrderService.orderTypeOptions, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-8", validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayErrorMsg(item);
        }
      }),
      new FormFieldConfig({ type: 'input', formName: 'routeId', label: 'Route Id', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'input', subtype: 'text', label: 'Customer', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", formName: 'customerId', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
          (e != '') ? this.fetchSupplierInfo(e, item) : this.supplierObj = [];
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayErrorMsg(item);
        },keyPress : (e : any,cfg : any) => {
          (this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId) ? this.form.get('supplierId').setValue('') : '';
        },keyUp : (e : any,cfg : any) => {
          (this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId) ? this.form.get('supplierId').setValue('') : '';
        }
      }),
      new FormFieldConfig({
        type: 'input', formName: 'routeCode', validation: [Validators.required], renderLabel: (item) => {
          return 'Route Code *';
        }, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'input', formName: 'supplierId', disabled: () => { return true; }, readOnly: () => {
          return true;
        }, label: 'Supplier', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'stop', label: 'Stop', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'dropdown', defaultValue: 'Select Transfer Type',options: this.singleOrderService.transferTypeOptions,formName: 'transferType', disabled: () => { return this.disableTransferType() }, label: 'Transfer Type', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
        renderLabel: (item: any) => {
          let result: boolean = this.form.get('orderType').value === 'transfer';
          return this.renderLabel(item, result);
        }, change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.form.get('transferType').value == ''  && this.form.get('transferType').touched && this.form.get('orderType').value === 'transfer';
        }, displayErrorMessage: (item: any) => {
          return this.form.get('orderType').value === 'transfer' ? this.displayErrorMsg(item) : '';
        }
      }),
      new FormFieldConfig({
        type: 'datefield', minDate : () =>{return new Date()}, maxDate : () =>{
          return this.form.get('deliveryDate').value;
        }, formName: 'releaseDate', defaultValue: new Date(), label : 'Release Date',validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        },change: (e: any, item :any)=>{
          this.onDateChange(e,item);
        }, readOnly: () => {
          return 'readonly';
        },fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'refDocNum', label: 'Ref Doc', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'datefield',minDate :()=>{
          return this.form.get('releaseDate').value;
        },maxDate : () => {}, defaultValue: moment(new Date()).add(7,'days'),formName: 'deliveryDate', label : 'Delivery Date',validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        },  readOnly: () => {
          return 'readonly';
        },fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      })
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
      new GridColoumnConfig({ name: '', title: '#', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'I', errorMsg: '', displayCellEdit: true, blur: (e, item, col) => { console.log('Blur') } }), render: (item, col, i) => { return i + 1; } }),
      new GridColoumnConfig({ name: 'itemNumber', cellEdit: new CellEditConfiguration({ type: 'I', blur: () => { }, displayCellEdit: true }), title: 'Item No.' }),
      new GridColoumnConfig({ name: 'pack', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true, disabled: () => { } }), title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true }), title: 'Size' }),
      new GridColoumnConfig({ name: 'description', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true }), title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true }), title: 'TixHi' }),
      new GridColoumnConfig({ name: 'upc', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true }), title: 'UPC' }),
      new GridColoumnConfig({ name: 'quantity', cellEdit: new CellEditConfiguration({ type: 'I', displayCellEdit: true }), title: 'Quantity' }),
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
  public onSubmit = (e) => {
    debugger;
  }
  public isDisabled = (): boolean => {
    return !this.form.valid && this.checkGridValues();
  }
  /**
   * fetchForm = 
   */
  public fetchForm = (form: any) => {
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
  /**
   * renderMandatoryLabel
   */
  public renderLabel = (cfg, required) => {
    return cfg && cfg.label && required ? `${cfg.label}<sup>*</sup>` : (cfg && cfg.label) ? cfg.label : '';
  }
  /**
   * onOrderTypeChange
   */
  public onOrderTypeChange = (e: any, cfg: any) => {
    this.markAsFiledTouched(cfg);
  }
  public onDateChange = (e :any , cfg : any) => {

  }
  /**
   * markAsFiledTouched
   */
  public markAsFiledTouched = (cfg: any) => {
    this.form.get(cfg.formName).markAsTouched();
  }
  /**
   * onBlur
   */
  public fetchSupplierInfo = (e: any, item: any) => {
    let mock = [{"customerId": 273, "customerName": "Adela Bonciu","supplierId": "WH/2527/GROC", "supplierName": "WalmartCanada"}];
    this.supplierObj = mock;
    (mock[0].customerId == e.target.value) ? this.form.get('supplierId').setValue(mock[0].supplierId) : this.form.get('supplierId').setValue('');
    // this.supplierServices.getSupplierInfo(e).subscribe((data)=>{

    // });
  }
  /**
   * displayErrorMsg
   */
  public displayErrorMsg = (cfg: any) => {
    return 'Required';
  }
  /**
   * basicFieldValidation
   */
  public basicFieldValidation = (item: any): boolean => {
    return !this.form.get(item.formName).valid && this.form.get(item.formName).touched;
  }
  /**
   * disableTransferType
   */
  public disableTransferType = (): boolean => {
    (this.form && this.form.get('orderType').value === 'transfer') ? this.form.get('transferType').setValidators([Validators.required]) : this.form.get('transferType').clearValidators();
    return this.form && this.form.get('orderType').value === 'transfer' ? false : true;
  }
}
