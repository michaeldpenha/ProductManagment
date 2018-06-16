import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrdersRoutingModule } from './create-orders-routing.module';
import {SharedModule} from '@app/shared';
import {
  SingleOrderComponent,
  BulkOrderComponent,
  BulkOrderInboxComponent,
  SingleOrderGridComponent,
  SingleOrderFormComponent
} from './components';
import { SingleOrderService } from "./components/single-order/single-order.service";
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateOrdersRoutingModule
  ],
  declarations: [
    SingleOrderComponent,
    BulkOrderComponent,
    BulkOrderInboxComponent,
    SingleOrderGridComponent,
    SingleOrderFormComponent
  ],
  providers : [SingleOrderService]
})
export class CreateOrdersModule { }
