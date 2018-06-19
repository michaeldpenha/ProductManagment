import { Component, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { SingleOrderService } from './single-order.service';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from "@app/shared/components";
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
import { StaticText } from "@app/shared/constants";
import { OrdersConfig } from "@app/shared/config";
import { DialogService } from "@app/shared/components/modal-dialog/modal-dialog.service";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  [x: string]: any;
  public gridConfig: any = [];
  public coloumnConfig: any = [];
  public data: any = [];
  public form: any;
  public fromFields: any = [];
  public submitText: string = 'Create';
  public submitBtnClass: string = 'btn btn-success';
  public supplierObj: any[] = [];
  public addLineText: string = 'Add Line';
  public previousIconClass: string = 'fa fa-plus';
  public previousBtnClass: string = 'btn btn-primary';
  public cancelBtnText: string = 'Cancel';
  public cancelBtnClass: string = 'btn btn-default';
  public displayGridErrorMessage: boolean = false;

  constructor(private singleOrderService: SingleOrderService,
    private orderService: OrdersService,
    private msgService: MessagesService, private cdRef: ChangeDetectorRef,
    private dialogService: DialogService) { }

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
    (this.data.length == OrdersConfig.maxAdditionOfItemsInSingleOrder) ? this.displayGridErrorMessage = true : this.pushBlankObjectInGrid();
  }
  /**
   * displayMinAndMaxErrorMsg
   */
  public displayMinAndMaxErrorMsg = (): string => {
    return this.data.length === 1 ? this.msgService.fetchMessage('minItemLimitForCreation') : this.data.length == OrdersConfig.maxAdditionOfItemsInSingleOrder ? `${this.msgService.fetchMessage('additionUpto')} ${OrdersConfig.maxAdditionOfItemsInSingleOrder} ${this.msgService.fetchMessage('records')}!` : '';

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
    let requestData: any = {};
    requestData = JSON.parse(JSON.stringify(this.form.getRawValue()));
    requestData['itemDetails'] = this.data;
    requestData['deliveryDate'] = moment(requestData['deliveryDate']).format('MM/DD/YYYY');
    requestData['releaseDate'] = moment(requestData['releaseDate']).format('MM/DD/YYYY');
    requestData['orderType'].toLowerCase() === 'rush' ? delete requestData['transferType'] : '';
    requestData['supplierId'] = requestData['supplierId'].split("/")[1];
    this.orderService.createSingleOrder(requestData).subscribe(data => {
      // this.dialogService.sho
    })
  }
  public isDisabled = (): boolean => {
    return this.form && !this.form.valid || !this.validateTransferType() || this.validateSupplierID()|| !this.checkGridValues();
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
    return this.form && this.form.get('orderType').value.toLowerCase() === "rush" ? true : (this.form && this.form.get('transferType').value != StaticText.selectTransferTypeLabel && this.form.get('transferType').value != '') && (this.form.get('orderType').value.toLowerCase() === 'transfer' || this.form.get('orderType').value.toLowerCase() === 'standing');
  }
  public validateSupplierID = () => {
    return this.form && this.form.get('supplierId').value.toLowerCase() == '' || this.form.get('supplierId').value == StaticText.selectSupplier;
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
    (this.data.length == 1) ? this.displayGridErrorMessage = true : (this.data[index].itemNumber && this.data[index].itemNumber != '') ? this.triggerWarning(index) : this.data.splice(index,1);
  }

  /**
   * deleteSingleOrder
   */
  public triggerWarning = (index: number) => {
    this.dialogService.showDialog(true, "Warning !", "", "", "Are you sure you want to delete this item?", "Delete", () => {
      this.data.splice(index, 1)
    }, "Cancel", () => { });
  }
}
