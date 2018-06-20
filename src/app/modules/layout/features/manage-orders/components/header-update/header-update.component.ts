import { Component, OnInit } from '@angular/core';
import { StaticText, Messages } from "@app/shared/constants";
import { OrdersService } from "@app/shared/services";

@Component({
  selector: 'app-header-update',
  templateUrl: './header-update.component.html',
  styleUrls: ['./header-update.component.scss']
})
export class HeaderUpdateComponent implements OnInit {
  public data: any;
  public noDataFound: string = StaticText.nodataFound;

  constructor(private orderService : OrdersService) { }

  ngOnInit() {
    this.initializeGrid();
  }

  /**
   * Intializing basic grid configuration for painting th egrid
   */
  public initializeGrid = () => {
    this.data = this.orderService.headerUpdate;
  }


  

}
