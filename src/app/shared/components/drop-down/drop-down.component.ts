import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  constructor() { }
  public styleObject;
  @Input() name : string;
  @Input() formControlName : string;
  @Input() disabled : string;
  @Input() hidden : string;
  @Input() required : string;
  @Input() inputClass : string;
  @Input() defaultDisplayLabel : string;
  @Input() defaultOptionsValue : string;
  @Input('receivedInputData') receivedInputData: any;
  @Input('defaultValue') defaultValue: any;
  @Input('defaultSelectHeight') defaultSelectHeight: any;
  @Input('defaultSelectWidth') defaultSelectWidth: any;
  @Output('selectedInputData') selectedInputData = new EventEmitter<any>();

  ngOnInit() {
    this.receivedInputData = this.receivedInputData ? this.receivedInputData : [];
    this.defaultValue = this.defaultValue ? this.defaultValue : 'Select';
  }
  public onChange = (selectedValue: any) => {
    this.selectedInputData.emit(selectedValue);
  }
  /**
   * optionsValue
   */
  public optionsValue = (item : any) => {
    return item && item[this.defaultOptionsValue];
  }
  /**
   * optionsLabel
   */
  public optionsLabel = (item :any) => {
    return item && item[this.defaultDisplayLabel];
  }
}
