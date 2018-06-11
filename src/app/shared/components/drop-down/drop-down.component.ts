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
  @Input('receivedInputData') receivedInputData: any;
  @Input('defaultValue') defaultValue: any;
  @Input('defaultSelectHeight') defaultSelectHeight: any;
  @Input('defaultSelectWidth') defaultSelectWidth: any;
  @Output('selectedInputData') selectedInputData = new EventEmitter<any>();

  ngOnInit() {
    this.receivedInputData = ['TEST1', 'TEST2', 'TEST3'];
    this.defaultValue = this.defaultValue ? this.defaultValue : 'Select';
  }

  public onChange = (selectedValue: any) => {
    this.selectedInputData.emit(selectedValue);
  }

  public getSelectStyle = (styleTo: any) => {
    if (styleTo == 'ul') {
      return {
        height: this.defaultSelectHeight = this.defaultSelectHeight ? this.defaultSelectHeight : '18px',
        width: this.defaultSelectWidth = this.defaultSelectWidth ? this.defaultSelectWidth : '150px',
      }
    }
    else {
      return {
        height: this.defaultSelectHeight = this.defaultSelectHeight ? this.defaultSelectHeight : '100px',
        width: this.defaultSelectWidth = this.defaultSelectWidth ? this.defaultSelectWidth : '300px'
      }
    }
  }
}
