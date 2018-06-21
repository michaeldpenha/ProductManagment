import { Component, OnInit } from '@angular/core';
import { StaticText, Messages } from "@app/shared/constants";
import { OrdersService } from "@app/shared/services";
import { FormFieldConfig } from "@app/shared/model";
import { DialogService } from "@app/shared/components";
import { LoaderService } from "@app/core/services";
import * as moment from 'moment';
@Component({
  selector: 'app-header-update',
  templateUrl: './header-update.component.html',
  styleUrls: ['./header-update.component.scss']
})
export class HeaderUpdateComponent implements OnInit {
  formFields: any[];
  public data: any;
  public headerUpDateLabel: string = StaticText.headerUpDateLabel;
  public noDataFound: string = Messages.noDataFound;
  public searchQueryParams: any = {};

  /**
   * DatePIcekr Config
   */
  public processDateMinDdate: any = new Date();
  public processDateMaxDdate: any = null;
  public deliveryDateMinDate: any = new Date();
  public deliveryDateMaxDdate: any = null;
  public dateBulkDafaultValue: boolean = false;
  public processDatePlaceHolder: string = "Process Date";
  public deliveryDatePlaceHolder: string = "Delivery Date";

  constructor(private orderService: OrdersService, private loaderService: LoaderService, private ordersService: OrdersService, private dialogService: DialogService) { }

  ngOnInit() {
    this.ordersService.fetchStaticValues();
    this.initializeGrid();
    this.initializeForm();
  }
  /**
   * onDateChange
   */
  public onDateChange = (e, dataIndex, limit) => {
    this[limit] = e;
    let dupData : any = JSON.parse(JSON.stringify(this.data));
    dupData.forEach(el => {
      el[dataIndex] = moment(e).format('MM/DD/YYYY');
    });
    this.resetGridData(dupData);
  }
  /**
   * resetGridData= 
  =>  */
  public resetGridData= (newData) => {
    this.data = [];
    this.data = newData;
  }
  /**
   * Intializing basic grid configuration for painting th egrid
   */
  public initializeGrid = () => {
    this.data = this.orderService.headerUpdate;
  }
  /**
   * initializeForm
   */
  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'orderStatusCode', defaultOptionsValue: 'orderStatusCode', formName: 'status', defaultValue: StaticText.orderStatusLabel, options: () => { return this.ordersService.orderTypeStatus }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          //this.displayDatePickers(e, item);
          this.populateSearchParams(e, item);
        }
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'changeReasonCode', defaultOptionsValue: 'changeReasonCode', formName: 'changeReason', defaultValue: StaticText.selectChangeReason, options: () => { return this.ordersService.changeReasons }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          // this.populateSearchQuery(e, item);
          this.populateSearchParams(e, item);
        }, hidden: () => {
          //console.log(this.form.get('customerGroupId').value)
          return false;
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-6 col-lg-3', fieldWidth: "pull-right", btnCls: "btn btn-default", btnText: "Cancel", btnClick: (e) => {
          // this.search(e);
        }, disabled: (e) => {
          //return this.customErrorVisible(e);
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-1', fieldWidth: "pull-right-lg", btnCls: "btn btn-success", btnText: "Submit", btnClick: (e) => {
          //this.reset(e);
          this.submitBatch();
        }, disabled: (e) => {
          return this.searchQueryParams && Object.keys(this.searchQueryParams).length == 0;
        }
      })
    ]
  }
  /**
   * submitBatch 
   */
  public submitBatch = () => {
    let paramData: any[] = this.prepareParams();
    this.orderService.updateOrders(paramData).subscribe(data => {
      this.loaderService.hide();
      this.dialogService.showDialog('Success', 'fa fa-check circle-green', '', '', 'Order updated successfuly', 'OK', () => {

      }, '', () => { })
    });
  }
  public prepareParams = (): any => {
    let filteredData: any = [];
    this.data.forEach(element => {
      let itemObj: any = {};
      itemObj['orderId'] = element['orderId'];
      (element['releaseDate']) ? itemObj['releaseDate'] = element['releaseDate'] : '';
      (element['deliveryDate']) ? itemObj['deliveryDate'] = element['deliveryDate'] : '';
      Object.keys(this.searchQueryParams).forEach(el => {
        itemObj[el] = this.searchQueryParams[el];
      });
      filteredData.push(itemObj);
    });
    return filteredData;
  }
  /**
   * populateSearchParams
   */
  public populateSearchParams = (val: any, cfg: any) => {
    (val != '' && val != cfg.defaultValue) ? this.searchQueryParams[cfg.formName] = val : (this.searchQueryParams[cfg.formName]) ? delete this.searchQueryParams[cfg.formName] : '';
  }

}
