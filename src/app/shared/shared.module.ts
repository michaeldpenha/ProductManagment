import { TabComponent } from './components/tabs/tab.component';
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
    SidebarComponent,
    DropDownComponent,
    TabsComponent,
    TabComponent
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
    TabComponent
  ]
})
export class SharedModule { }
