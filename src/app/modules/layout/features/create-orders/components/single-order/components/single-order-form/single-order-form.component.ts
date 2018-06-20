import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormFieldConfig } from "@app/shared/model";
import { Validators, FormGroup } from "@angular/forms";
import { MessagesService, OrdersService } from "@app/shared/services";
import * as moment from 'moment';
import {StaticText } from "@app/shared/constants";
import { OrdersConfig } from "@app/shared/config";

@Component({
  selector: 'app-single-order-form',
  templateUrl: './single-order-form.component.html',
  styleUrls: ['./single-order-form.component.scss']
})
export class SingleOrderFormComponent implements OnInit {
  supplierObj: any[];
  @Input() form: FormGroup;
  @Output() fetchForm = new EventEmitter<any>();

  public formFields: any;

  constructor(private ordersService: OrdersService, private msgService: MessagesService) { }

  ngOnInit() {
    this.initializeForm();
    this.ordersService.fetchStaticValues();
  }
  public fetchSingleOrderForm = (e: any) => {
    this.fetchForm.emit(e);
  }
  /**
   * Configuration of forms have been set here
   */
  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'orderTypeCode', defaultOptionsValue: 'orderTypeCode', formName: 'orderType', label: StaticText.orderType, defaultValue: StaticText.selectOrderTypeLabel, options: () => { return this.fetchCreationTypes() }, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-9", validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, change: (e: any, item: any) => {
          this.disableRefDoc(e);
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }
      }),
      new FormFieldConfig({ type: 'input', formName: 'routeId', label: StaticText.routeId, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-9', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'input', subtype: 'text', label: StaticText.customerId, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-9', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", formName: 'customerId', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
          (e != '') ? this.fetchSupplierInfo(e, item) : this.supplierObj = [];
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, keyPress: (e: any, cfg: any) => {
          (this.supplierObj && this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId && this.form) ? this.supplierObj = [] : '';
        }, keyUp: (e: any, cfg: any) => {
          (this.supplierObj && this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId && this.form) ? this.supplierObj = []: '';
        }
      }),
      new FormFieldConfig({
        type: 'input', formName: 'routeCode', label: StaticText.routeCode, keyPress: (e: any, cfg: any) => {
          if (e.target.value.length === 2) {
            return false;
          }
        }, renderLabel: (item) => {
          return this.renderLabel(item, false);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-9', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'dropdown', validation: [Validators.required],defaultDisplayLabel: 'supplierId', defaultOptionsValue: 'supplierId', options: (cfg :any) => {
          //this.supplierObj && this.supplierObj.length > 0 ? this.form.get('supplierId').setValue(this.supplierObj[0].supplierId): '';
          return this.supplierObj;
        }, renderLabel: (item: any) => {
          let result: boolean = this.supplierObj && this.supplierObj.length > 0;
          return this.renderLabel(item, result);
        },change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        },errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.supplierObj && this.supplierObj.length > 0 && this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return (this.supplierObj && this.supplierObj.length > 0 && this.form && this.form.get('supplierId').value == '' || this.form.get('supplierId').value == StaticText.selectSupplier) ?  this.msgService.fetchMessage(item.formName, 'required') : '';
        },defaultValue: StaticText.selectSupplier, formName: 'supplierId', disabled: () => { return false; }, readOnly: () => {
          return true;
        }, label: StaticText.supplier, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldWidth: 'col-md-9', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'stop', label: StaticText.stop, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldWidth: 'col-md-9', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'label', defaultOptionsValue: 'value', defaultValue: StaticText.selectTransferTypeLabel, options: () => { return this.ordersService.transferTypeOptions }, formName: 'transferType', disabled: () => { return this.disableTransferType() }, label: StaticText.transferType, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-9", inputClass: "form-control form-control-sm",
        renderLabel: (item: any) => {
          let result: boolean = this.form && (this.form.get('orderType').value.toLowerCase() === 'transfer' || this.form.get('orderType').value.toLowerCase() === 'standing');
          return this.renderLabel(item, result);
        }, change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.form && this.form.get('transferType').value == '' && this.form.get('transferType').touched && this.form.get('orderType').value.toLowerCase() === 'transfer' && this.form.get('orderType').value.toLowerCase() === 'standing';
        }, displayErrorMessage: (item: any) => {
          return this.form && (this.form.get('orderType').value.toLowerCase() === 'transfer' || this.form.get('orderType').value.toLowerCase() === 'standing') ? this.displayFormErrorMsg(item) : '';
        }
      }),
      new FormFieldConfig({
        type: 'datefield', minDate: () => { return new Date() }, maxDate: () => {
          return this.form && this.form.get('deliveryDate').value ? this.form.get('deliveryDate').value : null;
        }, formName: 'releaseDate', showDefaultDate: true, placeholder: 'mm/dd/yyyy', datepickerCls:'form-control background-white', defaultValue: moment(new Date()), label: StaticText.processDate, renderLabel: (item) => {
          return this.renderLabel(item, false);
        }, change: (e: any, item: any) => {
          //this.onDateChange(e, item);
        }, readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-9', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'refDocNum', disabled: () => { return true; }, label: StaticText.refDoc, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-9", inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({
        type: 'datefield', showDefaultDate: true, minDate: () => {
          return this.form && this.form.get('releaseDate').value ? this.form.get('releaseDate').value : new Date();
        }, maxDate: () => { }, placeholder: 'mm/dd/yyyy', datepickerCls:'form-control background-white', formName: 'deliveryDate', defaultValue: moment(new Date()).add(1, 'days'), label: StaticText.deliveryDate, renderLabel: (item) => {
          return this.renderLabel(item, false);
        }, readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-9', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'comments', label: StaticText.comments, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-9", inputClass: "form-control form-control-sm" }),
    ]
  }
  /**
   * renderMandatoryLabel
   */
  public renderLabel = (cfg, required) => {
    return cfg && cfg.label && required ? `${cfg.label}<sup class="text-danger">*</sup>` : (cfg && cfg.label) ? cfg.label : '';
  }
  /**
   * onOrderTypeChange
   */
  public onOrderTypeChange = (e: any, cfg: any) => {
    this.markAsFiledTouched(cfg);
  }
  /**
   * markAsFiledTouched
   */
  public markAsFiledTouched = (cfg: any) => {
    this.form.get(cfg.formName).markAsTouched();
  }
  /**
   * basicFieldValidation
   */
  public basicFieldValidation = (item: any): boolean => {
    return this.form && !this.form.get(item.formName).valid && this.form.get(item.formName).touched;
  }
  /**
   * displayFormErrorMsg
   */
  public displayFormErrorMsg = (cfg: any) => {
    let key = cfg.formName;
    let errorType = this.form && this.form.get(cfg.formName).errors ? Array.isArray(this.form.get(cfg.formName).errors) ? Object.keys(this.form.get(cfg.formName).errors)[0] : Object.keys(this.form.get(cfg.formName).errors)[0] : '';

    return this.msgService.fetchMessage(key, errorType);
  }
  /**
   * onBlur
   */
  public fetchSupplierInfo = (e: any, item: any) => {
    let mock = [{ "supplier": [{ "customerId": 273, "customerName": "Adela Bonciu", "supplierId": "WH/2527/GROC", "supplierName": "WalmartCanada" }] }];
    //this.form ? this.form.get('supplierId').setValue() : '';
    (mock[0].supplier[0].customerId == e.target.value && this.form) ? this.supplierObj = mock[0].supplier : (e.target.value != '' && this.form) ? this.supplierObj = [] : this.supplierObj = [];
  }
  /**
   * disableTransferType
   */
  public disableTransferType = (): boolean => {
    return this.form && (this.form.get('orderType').value.toLowerCase() === 'transfer' || this.form.get('orderType').value.toLowerCase() === 'standing') ? false : true;
  }
  /**
   * disableRefDoc
   */
  public disableRefDoc = (e: any) => {
    (e == '' || e.toLowerCase() == 'rush' && this.form) ? this.form.get('refDocNum').disable({ onlySelf: true }) : (this.form) ? this.form.get('refDocNum').enable({ onlySelf: true }) : '';
  }
  /**
   * fetchCreationTypes
   */
  public fetchCreationTypes = () => {
  let result : any = [];
  let createOrderType : any = OrdersConfig.createOrderTypes;
  if(this.ordersService.orderTypeOptions.length >0){
    this.ordersService.orderTypeOptions.forEach(element => {
        createOrderType.indexOf(element.orderTypeCode.toLowerCase()) != -1 ? result.push(element) : '';
    });
  }
  return result;  
  }
}
