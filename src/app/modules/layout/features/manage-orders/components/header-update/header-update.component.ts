import { Component, OnInit } from '@angular/core';
import { StaticText, Messages } from "@app/shared/constants";

@Component({
  selector: 'app-header-update',
  templateUrl: './header-update.component.html',
  styleUrls: ['./header-update.component.scss']
})
export class HeaderUpdateComponent implements OnInit {
  public data: any;
  public noDataFound: string = StaticText.searchQuery;

  constructor() { }

  ngOnInit() {
    this.initializeGrid();
  }

  /**
   * Intializing basic grid configuration for painting th egrid
   */
  public initializeGrid = () => {
    this.data = [];
  }


  

}
