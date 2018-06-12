import { Component, OnInit } from '@angular/core';
import {SideBarConfig} from '@app/shared/config';
@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarData: any;

  constructor() { }

  ngOnInit() {
    this.defaultGrid();
  }

  /**
   * defaultGrid
   */
  public defaultGrid = () => {
    this.sidebarData = SideBarConfig
  }

}
