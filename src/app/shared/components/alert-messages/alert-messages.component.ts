import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss']
})
export class AlertMessagesComponent implements OnInit {

  constructor() { }

  @Input('message') message: string
  @Input('messageType') messageType: string = "success";
  
  ngOnInit() {
      this.messageType == 'success' ? 'alert alert-success' : 'alert alert-danger'; 
  }
}
