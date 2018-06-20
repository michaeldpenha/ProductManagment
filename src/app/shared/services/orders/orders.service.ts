import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { LoaderService } from "@app/core/services";

@Injectable()
export class OrdersService {
  private _orderTypeOptions: any = [];
  private _transferTypeOptions: any = [];
  private _orderTypeStatus: any = [];
  private _datesTypes: any = [];
  private _divisionTypes: any = [];
  private _headerUpdate : any = [];
  get headerUpdate () : any {
    return this._headerUpdate;
  }
  set headerUpdate(items) {
    this._headerUpdate = items;
  } 
  get orderTypeOptions(): any {
    return this._orderTypeOptions;
  }
  set orderTypeOptions(options: any) {
    this._orderTypeOptions = options;
  }
  get orderTypeStatus(): any {
    return this._orderTypeStatus;
  }
  set divisionTypes(options: any) {
    this._divisionTypes = options;
  }
  get divisionTypes(): any {
    return this._divisionTypes;
  }
  get datesTypes(): any {
    return this._datesTypes;
  }
  set datesTypes (options: any){
    this._datesTypes = options;
  }
  set orderTypeStatus(options: any) {
    this._orderTypeStatus = options;
  }
  get transferTypeOptions(): any {
    return this._transferTypeOptions;
  }
  set transferTypeOptions(options: any) {
    this._transferTypeOptions = options;
  }
  
  constructor(private _http: HttpClient, private loaderService: LoaderService) { }

  public getSupplierInfo = (id: string) => {
    let url ="./assets/json/customerList.json";
    return this._http.get(url);
   // return this._http.get(`order/item/${id}`);
  }
  /**
   * getItemDetails
   */
  public getItemDetails = (val: string) => {
    return this._http.get(`http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/item/${val}`);
  }
  public fetchOrderTypes = () => {
    return this._http.get('http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/ordertypes');
  }
  /**
   * fetchOrderStatus
   */
  public fetchOrderStatus = () => {
    return this._http.get('http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/orderstatus');
  }


  /**
   * fetchOrderStatus
   */


  public fetchInboxRecords = () => {
    return this._http.get('http://dev-batch-api.centralus.cloudapp.azure.com/batch-processor/batch');
  }

  /**
   * fetchTransferTypes
   */
  public fetchTransferTypes= () => {
    this.transferTypeOptions = [{
      label : 'inter-division transfer',
      value : 'M2'
    }, {
      label : 'expense',
      value : 'M3'
    }, {
      label : 'intra-division transfer',
      value : 'M9'
    }]
  }
  /**
   * fetchDatesTypes
   */
  public fetchDatesTypes = () => {
    this.datesTypes = [{
      label : 'Created Date',
      value : 'createTs'
    }, {
      label : 'Release Date',
      value : 'scheduledReleaseDate'
    }, {
      label : 'Delivery Date',
      value : 'scheduledDeliveryDate'
    }]
  }
  /**
   * fetchDivisionTypes
   */
  public fetchDivisionTypes = () => {
    this.divisionTypes = [{
      label : 'Division 1',
      value : 'Division 1'
    }, {
      label : 'Division 2',
      value : 'Division 2'
    }, {
      label : 'Division 3',
      value : 'Division 3'
    }]
  }
  /**
   * fetchStaticValues
   */
  public fetchStaticValues = () => {
    (this.orderTypeOptions.length === 0 ) ? this.fetchOrderTypes().subscribe(el => {this.loaderService.hide();this._orderTypeOptions = el;}) : '';
    (this.orderTypeStatus.length === 0 ) ? this.fetchOrderStatus().subscribe(el => {this.loaderService.hide();this._orderTypeStatus = el;}) : '';
    //this.fetchTransferTypes().subscribe(el => this._transferTypeOptions = el)
    (this.transferTypeOptions.length === 0) ? this.fetchTransferTypes() : '';
    (this.datesTypes.length === 0) ? this.fetchDatesTypes() : '';
    (this.divisionTypes.length == 0) ? this.fetchDivisionTypes() : '';
  }
  /**
   * createSingleOrder
   */
  public createSingleOrder = (params: any) => {
    return this._http.post('http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order', params);
  }
   /**
   * viewOrderDetails
   */
  public viewOrderDetails = (id: string) => {
    return this._http.post(`http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/search`,{orderId : id});
  }
  /**
   * fetchOrder
   */
  public fetchOrder = (params : any) => {
    return this._http.post('http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/search',params);
  }
}
