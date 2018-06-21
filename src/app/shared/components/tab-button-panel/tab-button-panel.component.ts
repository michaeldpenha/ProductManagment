import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-button-panel',
  templateUrl: './tab-button-panel.component.html',
  styleUrls: ['./tab-button-panel.component.scss']
})
export class TabButtonPanelComponent implements OnInit {
  @Input() buttonItems : any = [];
  constructor() { }

  ngOnInit() {
  }

}
