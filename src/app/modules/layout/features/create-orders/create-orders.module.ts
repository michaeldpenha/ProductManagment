import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrdersRoutingModule } from './create-orders-routing.module';
import {SharedModule} from '@app/shared';
import {
  SingleOrderComponent,
  BulkOrderComponent,
  BulkOrderInboxComponent
} from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateOrdersRoutingModule
  ],
  declarations: [
    SingleOrderComponent,
    BulkOrderComponent,
    BulkOrderInboxComponent
  ]
})
export class CreateOrdersModule { }
