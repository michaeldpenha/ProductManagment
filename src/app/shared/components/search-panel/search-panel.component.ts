import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() fetchForm = new EventEmitter<any>();
  @Input() formFields : any;
  public searchText : string = 'Search';
  public seatchBtnCls: string = 'btn btn-success';
  public resetText : string = 'Reset';
  public resetBtnCls: string = 'btn btn-default';
  constructor() { }

  ngOnInit() {
  }
  /**
   * fetchSearchForm
   */
  public fetchSearchForm = (e :any ) =>{
    this.fetchForm.emit(e);
  }

}
