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
import {SupplierInfoService} from './services';
import { RouterModule } from '@angular/router';
import { FormButtonComponent } from './components/dynamic-form/form-button/form-button.component';
import { FormInputComponent } from './components/dynamic-form/form-input/form-input.component';
import { FormSelectComponent } from './components/dynamic-form/form-select/form-select.component';

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
    FormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent
  ],
  providers:[SupplierInfoService]
})
export class SharedModule { }
