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
  @Input('receivedInputData') receivedInputData: any;
  @Input('defaultValue') defaultValue: any;
  @Input('defaultSelectHeight') defaultSelectHeight: any;
  @Input('defaultSelectWidth') defaultSelectWidth: any;
  @Output('selectedInputData') selectedInputData = new EventEmitter<any>();

  ngOnInit() {
    this.receivedInputData = this.receivedInputData ? this.receivedInputData : [{label : 'TEST1',value : 'test1'},{label : 'TEST2',value:'test2'}];
    this.defaultValue = this.defaultValue ? this.defaultValue : 'Select';
  }

  public onChange = (selectedValue: any) => {
    this.selectedInputData.emit(selectedValue);
  }
}
