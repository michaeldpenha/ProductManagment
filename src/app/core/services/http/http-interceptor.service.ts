import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoaderService } from '../loader/loader.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpInterceptorsService implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

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
        }
        throw new Error(err);
    }
}