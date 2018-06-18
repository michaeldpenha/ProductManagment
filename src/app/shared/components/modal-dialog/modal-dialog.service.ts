import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from './modal-dialog.component';
import { Injectable, TemplateRef } from '@angular/core';

@Injectable()
export class DialogService {
  constructor(private modalService: BsModalService) { }

  showDialog(successError:boolean,headerTitle :any,template: any, data:any, successButtonText: string, successCallback : Function, cancelButtonText: string, cancelCallBack : Function) {
    let bsModalRef = this.modalService.show(ModalDialogComponent, { animated: true, keyboard: false, backdrop: true, ignoreBackdropClick: true });
    bsModalRef.content.successError = successError;
    bsModalRef.content.headerTitle = headerTitle;
    bsModalRef.content.template = template;
    bsModalRef.content.successButtonText = successButtonText;
    bsModalRef.content.data = data;
    bsModalRef.content.onSuccess = () => {
        bsModalRef.hide();
        successCallback();
    }
    bsModalRef.content.cancelButtonText = cancelButtonText;
    bsModalRef.content.onCancel = () => {
        bsModalRef.hide();
    }
  }
}