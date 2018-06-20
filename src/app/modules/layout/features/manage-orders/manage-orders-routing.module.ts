import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchOrdersComponent,EditOrderComponent , ViewOrderComponent, HeaderUpdateComponent } from './components/index';
const routes: Routes = [{
  path: '',
  component: SearchOrdersComponent
},{
  path : 'edit-order/:id',
  component : EditOrderComponent
},{
  path : 'view-order/:id',
  component : ViewOrderComponent
},{
  path : 'header-update',
  component : HeaderUpdateComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOrdersRoutingModule { }
