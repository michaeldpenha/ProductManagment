import { Injectable } from '@angular/core';

@Injectable()
export class SingleOrderService {
  public _orderTypeOptions : any;
  get orderTypeOptions ():any {
    return this._orderTypeOptions; 
  }
  set orderTypeOptions (options : any){
    this._orderTypeOptions = options;
  }
  constructor() { 
    this.orderTypeOptions = [{
      label : 'Rush',
      value : 'rush'
    },{
      label : 'Transfer',
      value : 'transfer'
    },{
      label : 'Standing',
      value : 'standing'
    }]
  }
}
