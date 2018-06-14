import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
@Injectable()
export class SupplierInfoService {

  constructor(private _http: HttpClient) { }

  public getSupplierInfo = (id : string) => {
    return this._http.get(`order/item/${id}`);
  }
}
