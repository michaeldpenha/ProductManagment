import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  public defaultDate = new Date();
  @Input() datepickerCls : string;
  @Input() placeholder: any;
  @Input() disabled : boolean = false;
  @Input() minDate : any;
  @Input() maxDate : any;
  @Input() dateFormat: any;
  @Input() value : any;
  @Output() change = new EventEmitter<any>();


  constructor() { }


  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Select Date";
    this.datepickerCls = this.datepickerCls ? this.datepickerCls : "form-control";
    this.dateFormat = this.dateFormat ? this.dateFormat : 'mm/dd/yyyy';
    this.defaultDate = this.value ? new Date(this.value) : new Date();
  }

  /**
   * Date value onchange event
   */ 
  public onValueChange(value: Date) {
    this.change.emit(value);
  }

}
