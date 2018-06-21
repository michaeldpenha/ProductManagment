import { TabComponent } from './components/tabs/tab.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HeaderComponent,
  SidebarComponent,
  ButtonComponent,
  PaginationComponent,
  GridComponent,
  DropDownComponent,
  // FileUploadComponent,
  // DragDropComponent,
  TabsComponent,
  ModalDialogComponent,
  CardsComponent,
  DatepickerComponent,
  FormComponent,
  DialogService,
  SearchPanelComponent,
  PanelComponent,
  TabButtonPanelComponent
} from './components/index';
import {
  OrdersService,
  MessagesService,
  RouterService
} from './services';
import { RouterModule } from '@angular/router';
import { HttpInterceptorsService } from "@app/core/services";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
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
    CardsComponent,
    HttpClientModule,
    SearchPanelComponent,
    HttpClientModule,
    ModalDialogComponent,
    PanelComponent,
    TabButtonPanelComponent,
    PaginationComponent
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ButtonComponent,
    PaginationComponent,
    GridComponent,
    DropDownComponent,
    // FileUploadComponent,
    // DragDropComponent,
    TabsComponent,
    ModalDialogComponent,
    DatepickerComponent,
    CardsComponent,
    TabComponent,
    FormComponent,
    SearchPanelComponent,
    PanelComponent,
    TabButtonPanelComponent
  ],
  entryComponents: [ModalDialogComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorsService,
    multi: true
  },
    OrdersService,
    MessagesService,
    BsModalService,
    DialogService,
    RouterService
  ]
})
export class SharedModule { }
