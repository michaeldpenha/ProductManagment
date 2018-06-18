import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { LoaderService } from "@app/core/services";

@Injectable()
export class OrdersService {
  public _orderTypeOptions: any = [];
  public _transferTypeOptions: any = [];
  public _orderTypeStatus: any = [];

  get orderTypeOptions(): any {
    return this._orderTypeOptions
  }
  set orderTypeOptions(options: any) {
    this._orderTypeOptions = options;
  }
  get orderTypeStatus(): any {
    return this._orderTypeStatus;

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
  constructor(private _http: HttpClient,private loaderService : LoaderService) { }

  public getSupplierInfo = (id: string) => {
    return this._http.get(`order/item/${id}`);
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
   * fetchTransferTypes
   */
  public fetchTransferTypes= () => {
    this._transferTypeOptions = [{
      label : 'inter-division transfer',
      value : 'M2'
    },{
      label : 'expense',
      value : 'M3'
    },{
      label : 'intra-division transfer',
      value : 'M9'
    }]
  }
  /**
   * fetchStaticValues
   */
  public fetchStaticValues = () => {
    (this._orderTypeOptions.length === 0 ) ? this.fetchOrderTypes().subscribe(el => {this.loaderService.hide();this._orderTypeOptions = el;}) : '';
    (this._orderTypeStatus.length === 0 ) ? this.fetchOrderStatus().subscribe(el => {this.loaderService.hide();this._orderTypeStatus = el;}) : '';
    //this.fetchTransferTypes().subscribe(el => this._transferTypeOptions = el)
    (this._transferTypeOptions.length === 0) ? this.fetchTransferTypes() : '';
  }
}
