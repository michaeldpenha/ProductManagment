import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import {SharedModule} from '@app/shared/index';
import {
  SearchOrdersComponent,
  HeaderUpdateComponent,
  EditOrderComponent,
  ViewOrderComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    ManageOrdersRoutingModule,
    SharedModule
  ],
  declarations: [SearchOrdersComponent, HeaderUpdateComponent, EditOrderComponent, ViewOrderComponent]
})
export class ManageOrdersModule { }
