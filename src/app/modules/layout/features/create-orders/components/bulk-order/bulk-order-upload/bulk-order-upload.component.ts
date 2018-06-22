import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormFieldConfig } from "@app/shared/model";
import { Validators, FormGroup } from "@angular/forms";
import { StaticText } from "@app/shared/constants";
import { MessagesService, OrdersService, RouterService } from "@app/shared/services";
import { LoaderService } from "@app/core/services";
import { DialogService } from "@app/shared/components";

@Component({
  selector: 'app-bulk-order-upload',
  templateUrl: './bulk-order-upload.component.html',
  styleUrls: ['./bulk-order-upload.component.scss']
})
export class BulkOrderUploadComponent implements OnInit {

  constructor(private dialogService: DialogService,private routerService: RouterService,private msgService: MessagesService, private orderService: OrdersService,private loaderService : LoaderService) { }

  @Input() form: FormGroup;
  @Output() fetchForm = new EventEmitter<any>();
  @Output() redirectToInbox= new EventEmitter();
  public formFields: any;
  public data: any = [];
  public fileName: any;
  public hideUploadButton: boolean = true;
  public isValidFileExtension: boolean = false;
  public fileInfo: any;
  public cancelBtnText: string = 'Reset';
  public cancelBtnClass: string = 'btn btn-default';
  public submitText: string = 'Upload';
  public submitBtnClass: string = 'btn btn-success';

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * onSubmit
   */
  public onSubmit = (e) => {
    let requestData: any = {};
    requestData = JSON.parse(JSON.stringify(this.form.getRawValue()));
    let formValues: any = new FormData();
    formValues.append('email', requestData.emailId);
    formValues.append('userId', requestData.userId);
    formValues.append('comment', requestData.comments);
    formValues.append('file', this.fileInfo[0]);
    this.orderService.uploadBulkOrder(formValues)
      .subscribe(data => {
        this.loaderService.hide();
        this.dialogService.showDialog('Bulk Upload','fa fa-check circle-green','','','File Upload Successful. Batch number is: ' + data['batchId'], 'OK', () => {
           this.routerService.navigateTo('/create-order/bulk-order/inbox');
        }, '', () => { });
      });
  }


  /** To reset the form  */
  resetForm = () => {
    // this.bulkOrderFormData.patchValue({ orderEmailId: '', orderComments: '' });
    this.fileName = '';
    // this.hideUploadButton = false;
    // this.bulkOrderFormData.reset();
    // this.bulkOrderFormData.patchValue({ userId: this.customerUserID });
    this.hideUploadButton = true;
    let targetInbox: HTMLElement = document.getElementsByClassName('nav-link')[4] as HTMLElement;
    targetInbox.click();
  }

  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({
        type: 'textarea', subtype: 'text', label: StaticText.comments, fieldWidthCls: 'col-md-12', fieldWidth: 'col-md-8', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", formName: 'comments', validation: [Validators.required], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, keyPress: (e: any, cfg: any) => {
        }, keyUp: (e: any, cfg: any) => {
        }
      }),
      new FormFieldConfig({
        type: 'input', formName: 'emailId', label: StaticText.emailId, fieldWidthCls: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm", validation: [Validators.required, Validators.email], renderLabel: (item) => {
          return this.renderLabel(item, true);
        }, blur: (e: any, item: any) => {
        }, errorMessages: true, isErrorMessageVisible: (item: any) => {
          return this.basicFieldValidation(item);
        }, displayErrorMessage: (item: any) => {
          return this.displayFormErrorMsg(item);
        }, keyPress: (e: any, cfg: any) => {
        }, keyUp: (e: any, cfg: any) => {
        }
      }),
      new FormFieldConfig({ type: 'input', formName: 'userId', defaultValue: 'toshik11', disabled: () => { return true; }, label: StaticText.userId, fieldWidthCls: 'col-md-12', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', fieldWidth: "col-md-8", inputClass: "form-control form-control-sm" }),
    ]
  }


  /**
    * basicFieldValidation
    */
  public basicFieldValidation = (item: any): boolean => {
    return this.form && !this.form.get(item.formName).valid && this.form.get(item.formName).touched;
  }
  /**
   * displayFormErrorMsg
   */
  public displayFormErrorMsg = (cfg: any) => {
    let key = cfg.formName;
    let errorType = this.form && this.form.get(cfg.formName).errors ? Array.isArray(this.form.get(cfg.formName).errors) ? Object.keys(this.form.get(cfg.formName).errors)[0] : Object.keys(this.form.get(cfg.formName).errors)[0] : '';
    return this.msgService.fetchMessage(key, errorType);
  }

  /**
   * renderMandatoryLabel
   */
  public renderLabel = (cfg, required) => {
    return cfg && cfg.label && required ? `${cfg.label}<sup>*</sup>` : (cfg && cfg.label) ? cfg.label : '';
  }

  public isDisabled = (): boolean => {
    return this.form && !this.form.valid;
  }

  /**
   * validateTransferType
   */
  public validateTransferType = () => {
    return this.form && this.form.get('orderType').value.toLowerCase() === "rush" ? true : (this.form && this.form.get('transferType').value != StaticText.selectTransferTypeLabel && this.form.get('transferType').value != '') && (this.form.get('orderType').value.toLowerCase() === 'transfer' || this.form.get('orderType').value.toLowerCase() === 'standing');
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

  public onDrop = (eventFileInfo: any) => {
    this.isValidFileExtension = false;
    this.fileName = eventFileInfo.dataTransfer.files[0].name;
    var extensionArray = ['txt', 'tsv'];
    let fileExtension = this.fileName.replace(/^.*\./, '');
    this.fileInfo = eventFileInfo.dataTransfer.files;
    this.hideUploadButton = false;
    if (!extensionArray.includes(fileExtension)) {
      this.fileName = '';
      this.isValidFileExtension = true;
      return false;
    }
  }

  /**
   * onDragOver
   */
  public onDragOver = (e) => {

  }
  /**
   * onDragLeave
   */
  public onDragLeave = (e) => {

  }
  public InputChange = (e) => {
    this.fileName = e[0].name;
    var extensionArray = ['txt', 'tsv'];
    let fileExtension = this.fileName.replace(/^.*\./, '');
    this.fileInfo = e;
    this.isValidFileExtension = false;
    this.hideUploadButton = false;
    if (!extensionArray.includes(fileExtension)) {
      this.fileName = '';
      this.isValidFileExtension = true;
      this.hideUploadButton = true;
      return false;

    }
  }
  /**
   * fetchBulkOrderForm
   */
  public fetchBulkOrderForm = (form: any) => {
    this.form = form;
  }
}
