import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { FormFieldConfig } from "@app/shared/model";
import { Validators, FormGroup } from "@angular/forms";
import { StaticText } from "@app/shared/constants";
import { MessagesService } from "@app/shared/services";

@Component({
  selector: 'app-bulk-order',
  templateUrl: './bulk-order.component.html',
  styleUrls: ['./bulk-order.component.scss']
})
export class BulkOrderComponent implements OnInit {
  @ViewChild('inbox') fileInput:ElementRef;
  constructor(private msgService: MessagesService) { }
  public bulkOrder: any = 'Bulk Order';
  public inBox: any = 'Inbox';
  
  ngOnInit() {
  }

  public setActiveInactive = () =>{ 
     
  }
}
