import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrdersRoutingModule } from './create-orders-routing.module';
import {
  SingleOrderComponent,
  BulkOrderComponent,
  BulkOrderInboxComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    CreateOrdersRoutingModule
  ],
  declarations: [
    SingleOrderComponent,
    BulkOrderComponent,
    BulkOrderInboxComponent
  ]
})
export class CreateOrdersModule { }
