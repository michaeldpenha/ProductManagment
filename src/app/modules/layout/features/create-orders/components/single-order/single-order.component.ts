import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { SingleOrderService } from './single-order.service';
import * as moment from 'moment';
import {
  GridColoumnConfig,
  GridConfiguration,
  GridActionsConfig,
  CellEditConfiguration,
  FormFieldConfig
} from '@app/shared/model';
import {
  OrdersService,
  MessagesService
} from '@app/shared/services';
@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  public gridConfig: any = [];
  public coloumnConfig: any = [];
  public data: any = [];
  public form: any;
  public fromFields: any = [];
  public submitText: string = 'Submit';
  public supplierObj: any[] = [];
  public displayGridErrorMessage: boolean = false;
  constructor(private singleOrderService: SingleOrderService,
    private orderService: OrdersService,
    private msgService: MessagesService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.initalizeGridData();
  }
  public ngDoCheck() {
    this.cdRef.detectChanges();
  }
  /**
   * initalizeGridData
   */
  public initalizeGridData = () => {
    this.pushBlankObjectInGrid();
  }
  /**
   * pushBlankObjectInGrid
   */
  public pushBlankObjectInGrid = () => {
    this.data.push(this.createObjectWithBlankValues(this.coloumnConfig));
  }
  /**
   * addLine
   */
  public addRow = () => {
    this.displayGridErrorMessage = false;
    (this.data.length == 5) ? this.displayGridErrorMessage = true : this.pushBlankObjectInGrid();
  }
  /**
   * displayMinAndMaxErrorMsg
   */
  public displayMinAndMaxErrorMsg = (): string => {
    return this.data.length === 1 ? this.msgService.fetchMessage('minItemLimitForCreation') : this.data.length == 5 ? this.msgService.fetchMessage('maxItemLimitForCreation') : '';

  }
  /**
   * 
   * Need to put this function at one place
   * TODO 
   */
  public createObjectWithBlankValues = (ary: any[]): any => {
    let result: any = {};
    ary.forEach(element => {
      let key: string = element.config.name;
      result[key] = '';
    });
    return result;
  }
  /**
   * onSubmit
   */
  public onSubmit = (e) => {
    debugger;
  }
  public isDisabled = (): boolean => {
    return this.form && !this.form.valid || !this.validateTransferType() || !this.checkGridValues();
  }
  /**
   * fetchForm = 
   */
  public fetchForm = (form: any) => {
    this.form = form;
  }
  /**
   * validateTransferType
   */
  public validateTransferType = () => {
    return this.form && this.form.get('transferType').value === "rush" ? true : (this.form && this.form.get('transferType').value != 'Select Transfer Type' && this.form.get('transferType').value != '') && (this.form.get('orderType').value === 'transfer' || this.form.get('orderType').value === 'standing');
  }
  /**
   * checkGridValues
   */
  public checkGridValues = () => {
    let result = true;
    this.data.forEach(element => {
      result = result && (element.itemNumber != '' && element.quantity && element.quantity != '')
    });
    return result;
  }
  /**
   * deleteAction
   */
  public deleteAction = (index: number) => {
    this.displayGridErrorMessage = false;
    (this.data.length == 1) ? this.displayGridErrorMessage = true : this.data.splice(index, 1);
  }
}
