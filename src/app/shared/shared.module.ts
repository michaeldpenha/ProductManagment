import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  SidebarComponent,
  ButtonComponent,
  LoaderComponent,
  PaginationComponent,
  GridComponent,
  DropDownComponent,
  FileUploadComponent,
  DragDropComponent,
  TabsComponent,
  ModalDialogComponent
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
    SidebarComponent
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ButtonComponent,
    LoaderComponent,
    PaginationComponent,
    GridComponent,
    DropDownComponent,
    FileUploadComponent,
    DragDropComponent,
    TabsComponent,
    ModalDialogComponent,
    DatepickerComponent
  ]
})
export class SharedModule { }
