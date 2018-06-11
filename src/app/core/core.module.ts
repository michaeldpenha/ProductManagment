import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreRoutingModule} from './core-routing.module';
import {RouterModule} from '@angular/router';
import {
  LoginComponent,
  NotFoundComponent,
  SignUpComponent
} from './components/index';
import {
  AuthGuardService,
  HttpInterceptorService
} from './services/index';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [LoginComponent, NotFoundComponent,SignUpComponent],
  providers : [],
  exports : [
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoreModule { }
