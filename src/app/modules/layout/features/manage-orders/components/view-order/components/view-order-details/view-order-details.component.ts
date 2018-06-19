import { Component, OnInit } from '@angular/core';
import { StaticText } from "@app/shared/constants";

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss']
})
export class ViewOrderDetailsComponent implements OnInit {
  public detailsFooterVisible : boolean = false;
  public detailsHeader : string = StaticText.details;
  public logisticsHeader : string = StaticText.logistics;
  public logisticsFooterVisible : boolean = false;
  public addLineText: string = 'Add Line';
  public previousIconClass: string = 'fa fa-plus';
  constructor() { }

  ngOnInit() {
  }

}
