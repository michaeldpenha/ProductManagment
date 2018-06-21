import { EndPoints } from './../../constants/endPoints';
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
  private _changeReasons : any = [];

  // API URLS
  private getItemDetailsUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.itemPath}/`;
  private fetchOrderTypesUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.orderTypesPath}/`;
  private fetchOrderStatusUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.orderStatusPath}/`;
  private uploadBulkOrderUrl = `${EndPoints.batchProcessorUrl}/${EndPoints.batchChildUrlPath.bulkUpload}`;
  private submitInboxBatchUrl = `${EndPoints.batchProcessorUrl}/${EndPoints.batchChildUrlPath.getAllBatches}/`;
  private cancelInboxBatchUrl = `${EndPoints.batchProcessorUrl}/${EndPoints.batchChildUrlPath.getAllBatches}/`;
  private fetchInboxRecordsUrl = `${EndPoints.batchProcessorUrl}/${EndPoints.batchChildUrlPath.getAllBatches}`;
  private fetchChangeReasonsUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.changeReasonPath}`;
  private createSingleOrderUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.orderPath}`;
  private viewOrderDetailsUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.searchPath}`;
  private fetchOrderUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.searchPath}`;
  private updateOrdersUrl = `${EndPoints.orderProcessorUrl}/${EndPoints.orderChildUrlPath.updatePath}`;

  get changeReasons () :any {
    return this._changeReasons;
  }
  set changeReasons(items : any) {
    this._changeReasons = items;
  }
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
  set datesTypes(options: any) {
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
    return this._http.get(this.getItemDetailsUrl + `${val}`);
  }
  public fetchOrderTypes = () => {
    return this._http.get(this.fetchOrderTypesUrl);
  }
  /**
   * fetchOrderStatus
   */
  public fetchOrderStatus = () => {
    return this._http.get(this.fetchOrderStatusUrl);
  }

  /** Upload Bulk Order */
  public uploadBulkOrder = (param: any) => {
    return this._http.post(this.uploadBulkOrderUrl, param);
  }

  /** Submit Inbox batch */
  public submitInboxBatch = (batchId: any) => {
    return this._http.get(this.submitInboxBatchUrl + batchId + '/process', batchId);
  }

  /** Cancel Inbox batch */
  public cancelInboxBatch = (batchId: any) => {
    return this._http.get(this.cancelInboxBatchUrl + batchId + '/cancel', batchId);
  }
  

  /**
   * fetchOrderStatus
   */


  public fetchInboxRecords = () => {
    return this._http.get(this.fetchInboxRecordsUrl);
  }
  public fetchChangeReasons = () => {
    return this._http.get(this.fetchChangeReasonsUrl);
  }
  /**
   * fetchTransferTypes
   */
  public fetchTransferTypes = () => {
    this.transferTypeOptions = [{
      label: 'inter-division transfer',
      value: 'M2'
    }, {
      label: 'expense',
      value: 'M3'
    }, {
      label: 'intra-division transfer',
      value: 'M9'
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
      label : 'Process Date',
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
      label: 'Division 1',
      value: 'Division 1'
    }, {
      label: 'Division 2',
      value: 'Division 2'
    }, {
      label: 'Division 3',
      value: 'Division 3'
    }]
  }
  /**
   * fetchStaticValues
   */
  public fetchStaticValues = () => {
    (this.orderTypeOptions.length === 0) ? this.fetchOrderTypes().subscribe(el => { this.loaderService.hide(); this.orderTypeOptions = el; }) : '';
    (this.orderTypeStatus.length === 0) ? this.fetchOrderStatus().subscribe(el => { this.loaderService.hide(); this.orderTypeStatus = el; }) : '';
    //this.fetchTransferTypes().subscribe(el => this._transferTypeOptions = el)
    this.changeReasons.length === 0 ? this.fetchChangeReasons().subscribe(el => {this.loaderService.hide();this.changeReasons = el}) : '';
    (this.transferTypeOptions.length === 0) ? this.fetchTransferTypes() : '';
    (this.datesTypes.length === 0) ? this.fetchDatesTypes() : '';
    (this.divisionTypes.length == 0) ? this.fetchDivisionTypes() : '';
  }
  /**
   * createSingleOrder
   */
  public createSingleOrder = (params: any) => {
    return this._http.post(this.createSingleOrderUrl, params);
  }
  /**
  * viewOrderDetails
  */
  public viewOrderDetails = (id: string) => {
    return this._http.post(this.viewOrderDetailsUrl, { orderId: id });
  }
  /**
   * fetchOrder
   */
  public fetchOrder = (params: any) => {
    return this._http.post(this.fetchOrderUrl, params);
  }
  /**
   * updateOrders
   */
  public updateOrders = (params :any) => {
    return this._http.post(this.updateOrdersUrl, params);
  }
}
