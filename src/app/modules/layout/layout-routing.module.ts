import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'manage-order'
    }, {
      path: 'manage-order',
      loadChildren: './features/manage-orders/manage-orders.module#ManageOrdersModule'
    }, {
      path: 'create-order',
      loadChildren: './features/create-orders/create-orders.module#CreateOrdersModule'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
