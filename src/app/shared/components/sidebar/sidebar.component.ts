import { Component, OnInit } from '@angular/core';
import {SideBarConfig} from '@app/shared/config';
@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarData: any;
  public selectedItem: any;
  public selectedSubItem: any;

  constructor() { }

  ngOnInit() {
    this.defaultGrid();
  }

  /**
   * defaultGrid
   */
  public defaultGrid = () => {
    this.sidebarData = SideBarConfig;
    // By default select first element
    this.selectedItem = this.sidebarData[0];
  }

  listClick(newValue) {
    if (!newValue.sub) {
      this.selectedSubItem = "";
      this.selectedItem = newValue;
    }
  }
  subListClick(newSubValue) {
    this.selectedItem = "";
    this.selectedSubItem = newSubValue;
  }

}
