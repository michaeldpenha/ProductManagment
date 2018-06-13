import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HeaderConfig } from '@app/shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headerData: any;

  constructor() { }

  ngOnInit() {
    this.defaultConfig();
  }

  /**
   * defaultConfig
   */
  public defaultConfig = () => {
    this.headerData = HeaderConfig;
  }

}
