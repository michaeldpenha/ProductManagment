import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../loader/loader.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { DialogService } from "@app/shared/components/modal-dialog/modal-dialog.service";

@Injectable()
export class HttpInterceptorsService implements HttpInterceptor {

    constructor(private loaderService: LoaderService, private dialogService: DialogService) { }

    // addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    //    // return req.clone({ setHeaders: { Authorization: 'Basic '+ this.auth.token } })
    // }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loaderService.show();
        return next.handle(req)
            .catch(error => {
              this.loaderService.hide();
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 403:
                            return this.handleError(error, false);
                        case 401:
                            return this.handleError(error, false);
                        default: return this.handleError(error, false)
                    }
                } else {
                    return Observable.throw(error);
                }
            });
    }

    handleError = (err: any, logOut: any) => {
        if (logOut) {
          //To implement Modal popup
            //this.loginService.logOutUser();
            // this.showModal('Session Expired','Error');
        } else {
            let msg = err && err.error && err.error.message ? err.error.message : err && err.message ? err.message : 'Service Error Occured';
            this.showModal(msg, 'Error');
            console.log("err: ", err);
        }
        throw new Error(err);
    }
    /**
     * This method will show modal popup to disply error received from http calls
     */
    showModal = (message, headerText) => {
        setTimeout(() => {
            this.dialogService.showDialog(headerText, "fa fa-exclamation circle-red", "", "", message, 
            "", () => { }, "Ok", () => { });
        }, 500);
    }
}