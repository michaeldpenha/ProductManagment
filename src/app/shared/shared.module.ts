import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from './components/index';
import { RouterModule } from '@angular/router';
import { DatepickerComponent } from './components/datepicker/datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    GridComponent,
    SidebarComponent,
    DropDownComponent,
    ButtonComponent
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
  ]
})
export class SharedModule { }
