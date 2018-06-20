import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  FormFieldConfig
} from '@app/shared/model';
import { StaticText, Messages } from "@app/shared/constants";
import * as moment from 'moment';
import { OrdersService, MessagesService, RouterService } from "@app/shared/services";
import { LoaderService } from "@app/core/services";
@Component({
  selector: 'app-search-orders',
  templateUrl: './search-orders.component.html',
  styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {
  public data: any;
  public form: any;
  public selectedRecords: any = [];
  public formFields: any = [];
  public noDataFound: string = StaticText.searchQuery;
  public headerUpdate: string = 'Header Update';
  public searchParams: any = {};
  public page: number = 1;
  public limit: number = 5;
  public total: number;
  public sortBy: string = 'orderId,DESC';
  public searchQueryData: any = {};

  public displayErrMessage: string;
  public displayErr: boolean = false;
  public supplierObj: any = [];

  constructor(private cdRef: ChangeDetectorRef, private routerService: RouterService,
    private msgService: MessagesService, private ordersService: OrdersService, private loadingService: LoaderService) { }

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
    // this.form.valueChanges.subscribe(val => {
    //   this.prepareSearchParams(val)
    // });
  }
  /**
   * prepareSearchParams 
   */
  public prepareSearchParams = (val) => {
    console.log(val);
  }
  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({
        type: 'input', blur: (e: any, cfg: any) => {
          this.populateSearchQuery(e.target.value, cfg);
        }, subtype: 'number', min: 0, formName: 'orderId', placeholder: StaticText.orderIdPlaceHolder, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm"
      }),
      new FormFieldConfig({
        type: 'input', blur: (e: any, cfg: any) => {
          this.populateSearchQuery(e.target.value, cfg);
        }, subtype: 'number', min: 0, formName: 'itemId', placeholder: StaticText.itemNumber, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm"
      }),
      new FormFieldConfig({
        type: 'input', formName: 'customerGroupId', placeholder: StaticText.customerId, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
        blur: (e: any, item: any) => {
          //this.form.get('supplierId').enable({ onlySelf: true });
          e.target.value != '' ? this.fetchSupplierInfo(e, item) : this.populateSearchQuery(e.target.value, item);
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.customErrorVisible(item);
        }, displayErrorMessage: (item: any) => {
          return this.msgService.fetchMessage('customerId', 'validation');
        }
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'label', defaultOptionsValue: 'value', formName: 'dateColumn', defaultValue: StaticText.dateType, options: () => { return this.ordersService.datesTypes }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          this.displayDatePickers(e, item);
        }
      }), new FormFieldConfig({
        type: 'datefield', change: (e: any, cfg: any) => {
          this.populateSearchQuery(moment(e).format('MM/DD/YYYY'), cfg);
        }, minDate: () => { return null }, disabled: (cfg: any) => {
          return this.hideDateField(cfg);
        }, maxDate: () => {
          return this.form && this.form.get('startDate').value ? this.form.get('startDate').value : null;
        }, formName: 'endDate', showDefaultDate: true, placeholder: 'mm/dd/yyyy', defaultValue: moment(new Date()),
        readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'datefield', disabled: (cfg: any) => {
          return this.hideDateField(cfg);
        }, change: (e: any, cfg: any) => {
          this.populateSearchQuery(moment(e).format('MM/DD/YYYY'), cfg);
        }, minDate: () => { return this.form && this.form.get('endDate').value ? this.form.get('endDate').value : new Date(); }, maxDate: () => {
          return null;
        }, formName: 'startDate', showDefaultDate: true, placeholder: 'mm/dd/yyyy', defaultValue: moment(new Date()),
        readOnly: () => {
          return 'readonly';
        }, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm",
      }),
      new FormFieldConfig({
        type: 'input', blur: (e: any, cfg: any) => {
          this.populateSearchQuery(e.target.value, cfg);
        }, hidden: () => {
          return this.hideSupplierCombo();
        }, min: 0, subtype: 'number', formName: 'supplierId', placeholder: StaticText.supplier, fieldWidthCls: 'col-lg-2 col-md-4', fieldWidth: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm"
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'supplierId', defaultOptionsValue: 'supplierId', formName: 'supplierId', defaultValue: StaticText.selectSupplier, options: () => { return this.supplierObj }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          // this.populateSearchQuery(e, item);
        }, hidden: () => {
          //console.log(this.form.get('customerGroupId').value)
          return !this.hideSupplierCombo();
        }
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'label', defaultOptionsValue: 'value', formName: 'divisionId', defaultValue: StaticText.division, options: () => { return this.ordersService.divisionTypes }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          this.populateSearchQuery(e, item);
        }
      }), new FormFieldConfig({
        type: 'dropdown', change: (e: any, cfg: any) => {
          this.populateSearchQuery(e, cfg);
        }, defaultDisplayLabel: 'orderTypeCode', defaultOptionsValue: 'orderTypeCode', formName: 'orderType', defaultValue: StaticText.selectOrderTypeLabel, options: () => { return this.ordersService.orderTypeOptions }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12"
      }),
      new FormFieldConfig({
        type: 'dropdown', change: (e: any, cfg: any) => {
          this.populateSearchQuery(e, cfg);
        }, defaultDisplayLabel: 'orderStatusCode', defaultOptionsValue: 'orderStatusCode', formName: 'status', defaultValue: StaticText.orderStatusLabel, options: () => { return this.ordersService.orderTypeStatus }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12"
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-6 col-lg-3', fieldWidth: "pull-right", btnCls: "btn btn-success", btnText: "Search", btnClick: (e) => {
          this.search(e);
        }, disabled: (e) => {
          return this.customErrorVisible(e);
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-1', fieldWidth: "pull-right-lg", btnCls: "btn btn-default", btnText: "Reset", btnClick: (e) => {
          this.reset(e);
        }
      })
    ]
  }
  public customErrorVisible = (item: any) => {
    return this.supplierObj.length === 0 && this.searchQueryData && this.searchQueryData['customerGroupId'];
  }
  public populateSearchQuery = (val: any, cfg: any) => {
    (val != '') ? this.searchQueryData[cfg.formName] = val : (val === '' && this.searchQueryData[cfg.formName]) ? delete this.searchQueryData[cfg.formName] : '';
  }
  public hideDateField = (cfg: any) => {
    let result = false;
    result = this.form && this.form.get('dateColumn').value == '' || this.form.get('dateColumn').value.toLowerCase() == StaticText.dateType.toLowerCase();
    (result) ? this.appendDateInSearch(true, cfg, '') : '';
    return result;
  }
  /**
   * displayDatePickers
   */
  public displayDatePickers = (e: any, item: any) => {
    (e === '' || e == StaticText.dateType) ? this.appendDateInSearch(true, item, e) : this.appendDateInSearch(false, item, e);
  }
  /**
   * hideSupplierCombo
   */
  public hideSupplierCombo = () => {
    return this.searchQueryData && this.searchQueryData['customerGroupId'];
  }
  /**
   * appendDateInSearch
   */
  public appendDateInSearch = (deleteKey: boolean, item: any, val: any) => {
    (deleteKey) ? delete this.searchQueryData[item.formName] : this.searchParams[item.formName] = val;
  }
  public fetchSupplierInfo = (e: any, item: any) => {
    let val: string = e.target.value;
    this.ordersService.getSupplierInfo(val).subscribe((data: any[]) => {
      this.loadingService.hide();
      let filteredResult: any = {};
      this.populateSearchQuery(e.target.value, item);
      filteredResult = data.filter((customer) => { return customer.customerId == val; });
      (Object.keys(filteredResult.length > 0)) ? this.populateSupplierInfo(filteredResult[0], true) : this.populateSupplierInfo({}, false);

    })
    // let mock = [{ "supplier": [{ "customerId": 273, "customerName": "Adela Bonciu", "supplierId": "WH/2527/GROC", "supplierName": "WalmartCanada" }] }];
    // //this.form ? this.form.get('supplierId').setValue() : '';
    // this.form.get('supplierId').setValue(mock[0].supplier[0].supplierId.split('/')[1]);
    // this.form.get('supplierId').disable({ onlySelf: true });
  }
  /**
   * populateSupplierInfo
   */
  public populateSupplierInfo = (res, displaySupplierDropDown) => {
    this.supplierObj = res && res.suppliers ? res.suppliers : [];
    this.form.get('customerGroupId').setErrors(null);
    (!displaySupplierDropDown) ? this.form.get('customerGroupId').setErrors({ validation: true }) : '';
  }
  /**
   * search
   */
  public search = (e) => {
    this.checkIfOneFieldhasValue() ? this.triggerSearch() : this.displaySearchErrorMessage(Messages.searchError.atleastOneField);
  }
  /**
   * checkIfOneFieldhasValue
   */
  public checkIfOneFieldhasValue = (): boolean => {
    return Object.keys(this.searchQueryData).length > 0;
  }
  /**
   * triggerSearch
   */
  public triggerSearch = () => {
    this.fetchOrders();
  }
  /**
   * fetchOrders
   */
  public fetchOrders = () => {
    this.searchParams['page'] = this.page;
    this.searchParams['pageSize'] = this.limit;
    this.searchParams['sortBy'] = this.sortBy;
    Object.assign(this.searchParams, this.searchQueryData);
    this.ordersService.fetchOrder(this.searchParams).subscribe(data => {
      this.loadingService.hide();
      this.data = data['orders'];
      this.total = data['total'];
      (this.data.length === 0) ? this.displayGridErrorMessage(Messages.noDataFound) : '';
    }, err => {
      this.data = [];
      this.displayGridErrorMessage(Messages.searchError.serverError);
    });
  }
  /**
   * displaySearchErrorMessage
   */
  public displaySearchErrorMessage = (msg) => {
    this.displayErr = true;
    this.displayErrMessage = msg;
  }
  /**
   * displayGridErrorMessage
   */
  public displayGridErrorMessage = (msg) => {
    this.noDataFound = msg;
  }
  /**
   * reset = 
   */
  public reset = (form: any) => {
    this.form.reset();
    this.displayErr = false;
  }
  /**
   * navigateToHeaderUpdate
   */
  public navigateToHeaderUpdate = () => {
    this.routerService.navigateTo('/manage-order/header-update');
  }
  /**
   * triggerSorting
   */
  public triggerSorting = (colDef) => {

  }
}
