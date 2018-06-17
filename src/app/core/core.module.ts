import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {RouterModule} from '@angular/router';
import {
  LoginComponent,
  NotFoundComponent,
  SignUpComponent,
  LoaderComponent
} from './components';
import {
  AuthGuardService,
  HttpInterceptorsService,
  LoaderService
} from './services';
import { HTTP_INTERCEPTORS } from "@angular/common/http";


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [LoginComponent, NotFoundComponent,SignUpComponent, LoaderComponent],
  providers : [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorsService,
    multi: true
  },LoaderService],
  exports : [
    RouterModule,
    LoaderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoreModule { }
