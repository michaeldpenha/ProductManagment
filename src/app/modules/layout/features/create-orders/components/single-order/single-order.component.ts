import { Component, OnInit, ElementRef } from '@angular/core';
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
import {
  OrdersService,
  MessagesService
} from '@app/shared/services';
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
  public supplierObj: any[] = [];
  public displayGridErrorMessage : boolean = false;
  constructor(private singleOrderService: SingleOrderService,
    private orderService: OrdersService,
    private msgService: MessagesService) { }

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
          return this.displayFormErrorMsg(item);
        }
      }),
      new FormFieldConfig({ type: 'input', formName: 'routeId', label: 'Route Id', fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'input', subtype: 'text', label: 'Customer Id', fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", formName: 'customerId', validation: [Validators.required], renderLabel: (item) => {          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
          (e != '') ? this.fetchSupplierInfo(e, item) : this.supplierObj = [];
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, keyPress: (e: any, cfg: any) => {
          (this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId) ? this.form.get('supplierId').setValue('') : '';
        }, keyUp: (e: any, cfg: any) => {
          (this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId) ? this.form.get('supplierId').setValue('') : '';
        }
      }),
      new FormFieldConfig({
        type: 'input', formName: 'routeCode', validation: [Validators.required,Validators.minLength(2)], renderLabel: (item) => {
          return 'Route Code *';
          }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'input', formName: 'supplierId', disabled: () => { return true; }, readOnly: () => {
          return true;
        }, label: 'Supplier', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldWidth: 'col-md-8', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'stop', label: 'Stop', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldWidth: 'col-md-8', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'dropdown', defaultValue: 'Select Transfer Type', options: this.singleOrderService.transferTypeOptions, formName: 'transferType', disabled: () => { return this.disableTransferType() }, label: 'Transfer Type', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8",  inputClass: "form-control form-control-sm",
        renderLabel: (item: any) => {
          let result: boolean = this.form.get('orderType').value === 'transfer';
          return this.renderLabel(item, result);
        }, change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.form.get('transferType').value == '' && this.form.get('transferType').touched && this.form.get('orderType').value === 'transfer';
        }, displayErrorMessage: (item: any) => {
          return this.form.get('orderType').value === 'transfer' ? this.displayFormErrorMsg(item) : '';
        }
      }),
      new FormFieldConfig({
        type: 'datefield', minDate: () => { return new Date() }, maxDate: () => {
          return this.form.get('deliveryDate').value;
        }, formName: 'releaseDate', defaultValue: new Date(), label: 'Process Date', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, change: (e: any, item: any) => {
          this.onDateChange(e, item);
        }, readOnly: () => {
          return 'readonly';
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8',  displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'refDocNum', label: 'Ref Doc', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({
        type: 'datefield', minDate: () => {
          return this.form.get('releaseDate').value;
        }, maxDate: () => { }, defaultValue: moment(new Date()).add(7, 'days'), formName: 'deliveryDate', label: 'Delivery Date', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, readOnly: () => {
          return 'readonly';
          }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8',  displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
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
      new GridColoumnConfig({ name: '', title: '#', editable: (item) => { return false; }, render: (item, col, i) => { return i + 1; } }),
      new GridColoumnConfig({
        name: 'itemNumber', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
            e.target.value == "" ? this.fillGridObjectValues(index, {}) : this.isDuplicateRec(index) ? this.fillGridObjectValues(index, {}) : this.fetchItemsInfo(e.target.value, index,e);
          }, displayCellEdit: true, disabled: () => { return false; }, printErrorMsg: (cfg, i, errEl) => {
            return this.itemNumberErrorMessage(cfg, i,errEl);
          }, showErrorMsg: (cfg, i, errEl) => {
            return this.showItemNumberErrorMsg(i, (errEl && errEl.getAttribute('dirty') == "true"));

          }, focus: (cfg: any, index: number) => {

          },
          dirty: false
        }), title: 'Item No.'
      }),
      new GridColoumnConfig({ name: 'pack', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', subType: 'text', displayCellEdit: true, disabled: () => { return true; } }), title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'Size' }),
      new GridColoumnConfig({ name: 'description', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'TixHi' }),
      new GridColoumnConfig({ name: 'upc', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', subType: 'text', displayCellEdit: true, disabled: () => { return true; } }), title: 'UPC' }),
      new GridColoumnConfig({
        name: 'quantity', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'input',blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
            },
          printErrorMsg: (cfg, i, errEl) => {
            return this.msgService.fetchMessage(cfg.name, 'required');
          }, showErrorMsg: (cfg, i, errEl) => {
            return this.data[i]['itemNumber'] != '' && !this.showItemNumberErrorMsg(i, true) && this.data[i][cfg.name] == '' && errEl && errEl.getAttribute('dirty') == "true";

          }, subType: 'number', displayCellEdit: true, disabled: (item: any, cfg: any, index: any) => { return this.data[index]['itemNumber'] == '' ? true : this.showItemNumberErrorMsg(index, true); }
        }), title: 'Quantity'
      }),
      new GridColoumnConfig({
        name: 'actions',
        title: 'Action',
        actionItems: [
          new GridActionsConfig({ label: '', click: (item :any, actionCfg : any,index : number) => { 
            this.displayGridErrorMessage = false;
            (this.data.length == 1) ?  this.displayGridErrorMessage = true : this.data.splice(index,1);
          }})
        ]
      })
    ]
  }
  /**
   * showItemNumberErrorMsg
   */
  public showItemNumberErrorMsg = (i: number, dirty: boolean) => {
    let result = false;
    result = !(this.data[i]['description'] && this.data[i]['description'] != '') && dirty;
    return result ? result : false;
  }
  /**
   * fetchItemsInfo
   */
  public fetchItemsInfo = (val: string, index: number,el:any) => {
    this.orderService.getItemDetails(val).subscribe(element => {
      (element['description'] && element['description'].toLowerCase() == "no matching item found") ? this.noItemNumberFound(index,el) : this.fillGridObjectValues(index, element);
      this.data[index]['itemNumber'] = val;
    });
  }
  /**
   * noItemNumberFound
   */
  public noItemNumberFound = (index :number ,el : any) => {
    el.target.setAttribute('error',this.msgService.fetchMessage('itemNumber','notFound')) ;
    this.fillGridObjectValues(index, {}) 
  }
  /**
   * fillGridObjectValues
   */
  public fillGridObjectValues = (index: number, obj: any) => {
    let item: any = this.data[index];
    Object.keys(item).forEach(element => {
      (element != 'itemNumber') ? item[element] = obj[element] ? obj[element] : '' : '';
    });
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
    this.displayGridErrorMessage = false;
    (this.data.length == 5) ? this.displayGridErrorMessage = true: this.pushBlankObjectInGrid();
  }
  /**
   * displayMinAndMaxErrorMsg
   */
  public displayMinAndMaxErrorMsg = ()  :string => {
    return this.data.length === 1 ? this.msgService.fetchMessage('minItemLimitForCreation') : this.data.length == 5 ? this.msgService.fetchMessage('maxItemLimitForCreation'): '';

  }
  /**
   * 
   * Need to put this function at one place
   * TODO 
   */
  public createObjectWithBlankValues = (ary: any[]): any => {
    let result: any = {};
    ary.forEach(element => {
      let key: string = element.config.name;
      result[key] = '';
    });
    return result;
  }
  /**
   * onSubmit
   */
  public onSubmit = (e) => {
    debugger;
  }
  /**
   * itemNumberErrorMessage 
   */
  public itemNumberErrorMessage = (cfg: any, i: number , el : any): string => {
    return !this.data[i][cfg.name] || this.data[i][cfg.name] == '' ? this.msgService.fetchMessage(cfg.name, 'required') : this.isDuplicateRec(i) ? this.msgService.fetchMessage(cfg.name, 'duplicate') : el.getAttribute('error');
  }
  /**
   * isDuplicateRec
   */
  public isDuplicateRec = (i: number): boolean => {
    let result: boolean;
    this.data.forEach((element, index) => {
      result = result || (element['itemNumber'] == this.data[i]['itemNumber'] && i != index && !(this.data[i]['description'] && this.data[i]['description'] != ''))
    });
    return result;
  }
  public isDisabled = (): boolean => {
    return !this.form.valid || !this.checkGridValues();
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
    let result = true;
    this.data.forEach(element => {
      result = result && (element.itemNumber != '' && element.quantity != '')
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
  public onDateChange = (e: any, cfg: any) => {

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
    let mock = [{ "customerId": 273, "customerName": "Adela Bonciu", "supplierId": "WH/2527/GROC", "supplierName": "WalmartCanada" }];
    this.supplierObj = mock;
    this.form.get('supplierId').setValue('');
    (mock[0].customerId == e.target.value) ? this.form.get('supplierId').setValue(mock[0].supplierId) : (e.target.value != '') ?  this.form.get(item.formName).setErrors({ validation: true }) : '';
  }
  /**
   * displayFormErrorMsg
   */
  public displayFormErrorMsg = (cfg: any) => {
    let key = cfg.formName;
    let errorType = this.form.get(cfg.formName).errors ? Array.isArray(this.form.get(cfg.formName).errors) ? Object.keys(this.form.get(cfg.formName).errors[0])[0] :Object.keys(this.form.get(cfg.formName).errors)[0] : '';

    return this.msgService.fetchMessage(key , errorType);
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
  /**
   * errorCustomerKey
   */
  public errorCustomerKey = (cfg): string => {
    let result: string;
    result = this.form.get('supplierId').value === '' && this.form.get(cfg.formName).value != '' ? 'customerNotFound' : 'customerIsRequired';
    return result;
  }
}
