import { TabComponent } from './components/tabs/tab.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  HeaderComponent,
  SidebarComponent,
  ButtonComponent,
  PaginationComponent,
  GridComponent,
  DropDownComponent,
  FileUploadComponent,
  DragDropComponent,
  TabsComponent,
  ModalDialogComponent,
  CardsComponent,
  DatepickerComponent,
  FormComponent
} from './components/index';
import {OrdersService} from './services';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    GridComponent,
    SidebarComponent,
    DropDownComponent,
    TabsComponent,
    TabComponent,
    ButtonComponent,
    DatepickerComponent,
    FormComponent,
    HttpClientModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ButtonComponent,
    PaginationComponent,
    GridComponent,
    DropDownComponent,
    FileUploadComponent,
    DragDropComponent,
    TabsComponent,
    ModalDialogComponent,
    DatepickerComponent,
    CardsComponent,
    TabComponent,
    FormComponent
  ],
  providers:[OrdersService]
})
export class SharedModule { }
