import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class OrdersService {
  public _orderTypeOptions: any = [];
  public _transferTypeOptions: any = [];
  public _orderTypeStatus  :any = [];

  get orderTypeOptions(): any {
    return this._orderTypeOptions;
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
  constructor(private _http: HttpClient) { }

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
    return this._http.get('order/ordertypes');
  }
  /**
   * fetchOrderStatus
   */
  public fetchOrderStatus = () => {
    return this._http.get('order/orderstatus');
  }
}
