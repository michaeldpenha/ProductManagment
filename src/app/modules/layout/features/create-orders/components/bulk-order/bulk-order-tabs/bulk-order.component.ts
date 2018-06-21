import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormFieldConfig } from "@app/shared/model";
import { Validators, FormGroup } from "@angular/forms";
import { StaticText } from "@app/shared/constants";
import { MessagesService, RouterService } from "@app/shared/services";

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.scss']
})
export class BulkOrderComponent implements OnInit {
  @ViewChild('inbox') fileInput:ElementRef;
  constructor(private msgService: MessagesService,private routerService : RouterService) { }
  public bulkOrder: any = 'Bulk Order';
  public inBox: any = 'Inbox';
  public buttonItems : any = [];
  ngOnInit() {
    this.configureButtonItems();
  }
  /**
   * configureButtonItems
   */
  public configureButtonItems = () => {
    this.buttonItems = [{
      click : (cfg: any) => {
        this.navigateTo('/create-order/bulk-order');
      },
      class : '',
      text : this.bulkOrder
      
    },{
       click : (cfg: any) => {
        this.navigateTo('/create-order/bulk-order/inbox');
      },
      class : '',
      text : this.inBox
    }];
  }
  public setActiveInactive = () =>{ 
     
  }
  /**
   * navigateTo
   */
  public navigateTo = (url) => {
    this.routerService.navigateTo(url);
  }
}
