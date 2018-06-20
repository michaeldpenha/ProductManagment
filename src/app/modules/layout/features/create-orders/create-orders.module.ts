// import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
// import { DragDropComponent } from './../../../../shared/components/drag-drop/drag-drop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOrdersRoutingModule } from './create-orders-routing.module';
import {SharedModule} from '@app/shared';
import {
  SingleOrderComponent,
  // BulkOrderComponent,
  // BulkOrderInboxComponent,
  SingleOrderGridComponent,
  SingleOrderFormComponent
  //BulkOrderUploadComponent
} from './components';
import { SingleOrderService } from "./components/single-order/single-order.service";
import { DragDropComponent, FileUploadComponent } from "@app/shared/components";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreateOrdersRoutingModule
  ],
  declarations: [
    SingleOrderComponent,
    // BulkOrderComponent,
    // BulkOrderUploadComponent,
    // BulkOrderInboxComponent,
    SingleOrderGridComponent,
    SingleOrderFormComponent,
    DragDropComponent, 
    FileUploadComponent
  ],
  providers : [SingleOrderService]
})
export class CreateOrdersModule { }
