import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SingleOrderComponent,
  BulkOrderComponent,
  BulkOrderInboxComponent
} from './components';
const routes: Routes = [{
  path: 'single-order',
  component: SingleOrderComponent
}, {
  path: 'bulk-order',
  children: [{
    path: '',
    component: BulkOrderComponent
  }, {
    path: 'inbox',
    component: BulkOrderInboxComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateOrdersRoutingModule { }
