import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { SideBarConfig } from '@app/shared/config';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarData: any;
  public selectedItem: any;
  public locationPath: any;
  public href: any;
  public counter: number = 0;

  constructor(private location: Location) { }

  ngOnInit() {
    this.defaultData();
  }

  /**
   * defaultData
   */
  public defaultData = () => {
    this.counter++;
    this.sidebarData = SideBarConfig;
    
    // on Refresh page set current menu active
    this.locationPath = window.location.pathname;
    this.sidebarData.forEach(element => {
      if (this.locationPath === element.link) {
        this.selectedItem = element;
      } else if(element.sub) {
        (element.sub).forEach(subElement => {
          if (this.locationPath === subElement.link) {
            this.selectedItem = subElement;
            setTimeout(() => {
              $("a[href$='#" + this.counter + "']").attr("aria-expanded","true");
              $("#" + this.counter).parent().find("ul").addClass("show");
            }, 500);
          }
        });
      }
    });
  }

  /**
   * menuClick
   */
  menuClick(newValue) {
    if (!newValue.sub) {
      this.selectedItem = "";
      this.selectedItem = newValue;
    }
  }

}
