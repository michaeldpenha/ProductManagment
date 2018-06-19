import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  FormFieldConfig
} from '@app/shared/model';
import { StaticText } from "@app/shared/constants";
import * as moment from 'moment';
import { OrdersService } from "@app/shared/services";
@Component({
  selector: 'app-search-orders',
  templateUrl: './search-orders.component.html',
  styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {
  public headerUpdateText: string = StaticText.headerUpdate;
  public headerUpdateBtnCls: string = 'btn btn-primary';
  public data: any;
  public form: any;
  public formFields: any = [];
  public noDataFound : string = StaticText.searchQuery;

  constructor(private cdRef: ChangeDetectorRef, private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.fetchStaticValues();
    this.initializeForm();
    this.initializeGrid();
  }
  public ngDoCheck() {
    this.cdRef.detectChanges();
  }
  /**
   * Intializing basic grid configuration for painting th egrid
   */
  public initializeGrid = () => {
    this.populateGridData();
  }
  /**
   * populateGridData
   */
  public populateGridData = () => {
    //let res = { "total": 16, "orders": [{ "orderId": 47, "divisionId": 0, "customerId": 111, "supplierId": 5000, "orderType": "Rush", "status": "New", "createdDate": "06/11/2018", "deliveryDate": "06/30/2018", "createdTimeStamp": "2018-06-11T13:43:23.55", "createdBy": "annonymous", "releaseDate": "06/14/2018", "tog": null, "scheduledCutOffTime": null, "changeReason": "Not Interested", "itemQty": 0, "itemWt": 0.0, "palletQty": 0.0, "orderVolume": 0.0, "planRouteNo": null, "totalQty": 0, "routeId": 0, "routeCode": "11", "items": [{ "itemNumber": 1, "description": "", "uom": null, "boh": null, "itemChangeReason": null, "upc": "", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 0 }] }, { "orderId": 46, "divisionId": 0, "customerId": 111, "supplierId": 5000, "orderType": "Rush", "status": "New", "createdDate": "06/11/2018", "deliveryDate": "06/23/2018", "createdTimeStamp": "2018-06-11T11:57:47.813", "createdBy": "annonymous", "releaseDate": "06/16/2018", "tog": null, "scheduledCutOffTime": null, "changeReason": "Not Interested", "itemQty": 0, "itemWt": 0.0, "palletQty": 0.0, "orderVolume": 0.0, "planRouteNo": null, "totalQty": 15, "routeId": 0, "routeCode": "12", "items": [{ "itemNumber": 1, "description": "Whopper Sandwich", "uom": null, "boh": null, "itemChangeReason": null, "upc": "1111", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 12 }, { "itemNumber": 2, "description": "Mushroom ketchup", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": null, "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 3 }] }, { "orderId": 45, "divisionId": 0, "customerId": 111, "supplierId": 5000, "orderType": "Rush", "status": "New", "createdDate": "06/11/2018", "deliveryDate": "06/30/2018", "createdTimeStamp": "2018-06-11T11:55:30.647", "createdBy": "annonymous", "releaseDate": "06/24/2018", "tog": null, "scheduledCutOffTime": null, "changeReason": "Not Interested", "itemQty": 0, "itemWt": 0.0, "palletQty": 0.0, "orderVolume": 0.0, "planRouteNo": null, "totalQty": 270, "routeId": 0, "routeCode": "11", "items": [{ "itemNumber": 1, "description": "Whopper Sandwich", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": "1111", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 50 }, { "itemNumber": 2, "description": "Mushroom ketchup", "uom": null, "boh": null, "itemChangeReason": null, "upc": "2222", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 100 }, { "itemNumber": 3, "description": "Sonic Cherry Limeade", "uom": null, "boh": null, "itemChangeReason": null, "upc": "3333", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 120 }] }, { "orderId": 44, "divisionId": 0, "customerId": 111, "supplierId": 5000, "orderType": "Rush", "status": "New", "createdDate": "06/11/2018", "deliveryDate": "06/24/2018", "createdTimeStamp": "2018-06-11T11:06:16.947", "createdBy": "annonymous", "releaseDate": "06/15/2018", "tog": null, "scheduledCutOffTime": null, "changeReason": "Not Interested", "itemQty": 0, "itemWt": 0.0, "palletQty": 0.0, "orderVolume": 0.0, "planRouteNo": null, "totalQty": 70, "routeId": 0, "routeCode": "12", "items": [{ "itemNumber": 1, "description": "Whopper Sandwich", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": "1111", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 20 }, { "itemNumber": 2, "description": "Mushroom ketchup", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": null, "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 20 }, { "itemNumber": 3, "description": "Sonic Cherry Limeade", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": null, "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Cancelled", "qty": 30 }] }, { "orderId": 43, "divisionId": 0, "customerId": 111, "supplierId": 5000, "orderType": "Rush", "status": "New", "createdDate": "06/11/2018", "deliveryDate": "06/30/2018", "createdTimeStamp": "2018-06-11T10:30:40.02", "createdBy": "annonymous", "releaseDate": "06/22/2018", "tog": null, "scheduledCutOffTime": null, "changeReason": "Not Interested", "itemQty": 0, "itemWt": 0.0, "palletQty": 0.0, "orderVolume": 0.0, "planRouteNo": null, "totalQty": 130, "routeId": 0, "routeCode": "12", "items": [{ "itemNumber": 1, "description": "Whopper Sandwich", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": "1111", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Cancelled", "qty": 10 }, { "itemNumber": 2, "description": "Mushroom ketchup", "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": "2222", "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 100 }, { "itemNumber": 3, "description": null, "uom": null, "boh": null, "itemChangeReason": "Not Interested", "upc": null, "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 10 }, { "itemNumber": 1, "description": null, "uom": null, "boh": null, "itemChangeReason": null, "upc": null, "pack": 0, "size": 0, "tixhi": null, "itemStatus": "Active", "qty": 10 }] }] }
    this.data = [];
  }
  /**
   * fetchForm
   */
  public fetchForm = (form: any) => {
    this.form = form;
  }
  public headerUpdate = () => {
    console.log('HeaderUpdate')
  }
  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({ type: 'input', formName: 'orderId',  placeholder: StaticText.orderIdPlaceHolder, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({ type: 'input', formName: 'itemNumber', placeholder: StaticText.itemNumber, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({ type: 'input', formName: 'customerId', placeholder: StaticText.customerId, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'label',defaultOptionsValue: 'value', formName: 'dateType', defaultValue: StaticText.dateType, options: () => { return this.ordersService.datesTypes }, fieldWidthCls: 'col-md-2', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          this.displayDatePickers(e, item);
        }
      }), new FormFieldConfig({
        type: 'datefield', minDate: () => { return null }, hidden : () =>{
          return this.form && this.form.get('dateType').value == '' || this.form.get('dateType').value.toLowerCase() == StaticText.dateType.toLowerCase();
        }, maxDate: () => {
          return this.form && this.form.get('toDate').value ? this.form.get('toDate').value : null;
        }, formName: 'fromDate', showDefaultDate: true, placeholder: 'mm/dd/yyyy', defaultValue: moment(new Date()), 
        readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'datefield',  hidden : () =>{
          return this.form && this.form.get('dateType').value == '' || this.form.get('dateType').value.toLowerCase() == StaticText.dateType.toLowerCase();
        }, minDate: () => { return this.form && this.form.get('fromDate').value ? this.form.get('fromDate').value : new Date(); }, maxDate: () => {
          return null;
        }, formName: 'toDate', showDefaultDate: true, placeholder: 'mm/dd/yyyy', defaultValue: moment(new Date()),
        readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({ type: 'input', formName: 'supplierId', placeholder: StaticText.supplier, fieldWidthCls: 'col-md-2', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm" }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'label', defaultOptionsValue: 'value', formName: 'divisionType', defaultValue: StaticText.division, options: () => { return this.ordersService.divisionTypes }, fieldWidthCls: 'col-md-2', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
         // this.displayDatePickers(e, item);
        }
      }), new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'orderTypeCode', defaultOptionsValue: 'orderTypeCode', formName: 'orderType',  defaultValue: StaticText.selectOrderTypeLabel, options: () => { return this.ordersService.orderTypeOptions }, fieldWidthCls: 'col-md-2', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12"
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'orderStatusCode', defaultOptionsValue: 'orderStatusCode', formName: 'orderStatus',  defaultValue: StaticText.orderStatusLabel, options: () => { return this.ordersService.orderTypeStatus }, fieldWidthCls: 'col-md-2', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12"
      })
    ]
  }
  /**
   * displayDatePickers
   */
  public displayDatePickers = (e: any, item: any) => {
    console.log(e)
  }
}
