import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormFieldConfig } from "@app/shared/model";
import { SingleOrderService } from "@app/modules/layout/features/create-orders/components/single-order/single-order.service";
import { Validators, FormGroup } from "@angular/forms";
import { MessagesService } from "@app/shared/services";
import * as moment from 'moment';

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

  constructor(private singleOrderService: SingleOrderService, private msgService: MessagesService) { }

  ngOnInit() {
    this.initializeForm();
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
        type: 'dropdown', formName: 'orderType', label: 'Order Type', defaultValue: 'Select Order Types', options: this.singleOrderService.orderTypeOptions, fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-8", validation: [Validators.required], renderLabel: (item) => {
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
      new FormFieldConfig({ type: 'input', formName: 'routeId', label: 'Route Id', fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", }),
      new FormFieldConfig({
        type: 'input', subtype: 'text', label: 'Customer Id', fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", formName: 'customerId', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
          (e != '') ? this.fetchSupplierInfo(e, item) : this.supplierObj = [];
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, keyPress: (e: any, cfg: any) => {
          (this.supplierObj && this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId && this.form) ? this.form.get('supplierId').setValue('') : '';
        }, keyUp: (e: any, cfg: any) => {
          (this.supplierObj && this.supplierObj[0] && e.target.value != this.supplierObj[0].customerId && this.form) ? this.form.get('supplierId').setValue('') : '';
        }
      }),
      new FormFieldConfig({
        type: 'input', formName: 'routeCode', label: 'Route Code', validation: [Validators.minLength(2)], renderLabel: (item) => {
          return this.renderLabel(item, false);
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
        type: 'dropdown', defaultValue: 'Select Transfer Type', options: this.singleOrderService.transferTypeOptions, formName: 'transferType', disabled: () => { return this.disableTransferType() }, label: 'Transfer Type', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm",
        renderLabel: (item: any) => {
          let result: boolean = this.form && (this.form.get('orderType').value === 'transfer' || this.form.get('orderType').value === 'standing');
          return this.renderLabel(item, result);
        }, change: (e: any, item: any) => {
          this.onOrderTypeChange(e, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.form && this.form.get('transferType').value == '' && this.form.get('transferType').touched && this.form.get('orderType').value === 'transfer' && this.form.get('orderType').value === 'standing';
        }, displayErrorMessage: (item: any) => {
          return this.form && (this.form.get('orderType').value === 'transfer' || this.form.get('orderType').value === 'standing') ? this.displayFormErrorMsg(item) : '';
        }
      }),
      new FormFieldConfig({
        type: 'datefield', minDate: () => { return new Date() }, maxDate: () => {
          return this.form && this.form.get('deliveryDate').value ? this.form.get('deliveryDate').value : null;
        }, formName: 'releaseDate', placeholder: 'mm/dd/yyyy', label: 'Process Date', renderLabel: (item) => {
          return this.renderLabel(item, false);
        }, change: (e: any, item: any) => {
          //this.onDateChange(e, item);
        }, readOnly: () => {
          return 'readonly';
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'refDocNum', disabled : () =>{return true;},label: 'Ref Doc', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({
        type: 'datefield', minDate: () => {
          return this.form && this.form.get('releaseDate').value ? this.form.get('releaseDate').value : new Date();
        }, maxDate: () => { }, placeholder: 'mm/dd/yyyy', formName: 'deliveryDate', label: 'Delivery Date', renderLabel: (item) => {
          return this.renderLabel(item, false);
        }, readOnly: () => {
          return 'readonly';
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, fieldWidthCls: 'col-md-6', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'comments', label: 'Comments', fieldWidthCls: 'col-md-6', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm" }),
    ]
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
    let mock = [{ "customerId": 273, "customerName": "Adela Bonciu", "supplierId": "WH/2527/GROC", "supplierName": "WalmartCanada" }];
    this.supplierObj = mock;
    this.form ? this.form.get('supplierId').setValue('') : '';
    (mock[0].customerId == e.target.value && this.form) ? this.form.get('supplierId').setValue(mock[0].supplierId) : (e.target.value != '' && this.form) ? this.form.get(item.formName).setErrors({ validation: true }) : '';
  }
  /**
   * disableTransferType
   */
  public disableTransferType = (): boolean => {
    return this.form && (this.form.get('orderType').value === 'transfer' || this.form.get('orderType').value === 'standing') ? false : true;
  }
  /**
   * disableRefDoc
   */
  public disableRefDoc = (e:any) => {
    (e == '' || e =='rush' && this.form) ? this.form.get('refDocNum').disable({onlySelf : true}) : (this.form) ? this.form.get('refDocNum').enable({onlySelf : true}) : '';
  }
}
