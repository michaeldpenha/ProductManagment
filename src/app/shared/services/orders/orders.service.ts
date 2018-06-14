import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

@Injectable()
export class OrdersService {

  constructor(private _http: HttpClient) { }

  public getSupplierInfo = (id : string) => {
    return this._http.get(`order/item/${id}`);
  }
  /**
   * getItemDetails
   */
  public getItemDetails = (val : string) => {
    return this._http.get(`http://dev-op-api.centralus.cloudapp.azure.com/order-processor/webapi/order/item/${val}`);
  }
}
