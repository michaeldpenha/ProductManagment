import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOrdersRoutingModule } from './manage-orders-routing.module';
import {
  SearchOrdersComponent,
  HeaderUpdateComponent,
  EditOrderComponent,
  ViewOrderComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    ManageOrdersRoutingModule
  ],
  declarations: [SearchOrdersComponent, HeaderUpdateComponent, EditOrderComponent, ViewOrderComponent]
})
export class ManageOrdersModule { }
