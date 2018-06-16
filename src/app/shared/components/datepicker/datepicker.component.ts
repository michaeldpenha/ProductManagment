import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  public defaultDate : any;
  @Input() datepickerCls : string;
  @Input() placeholder: any;
  @Input() isDisabled : boolean = false;
  @Input() minDate : any;
  @Input() maxDate : any;
  @Input() dateFormat: any;
  @Input() readonly : string;
  @Input() value : any;
  @Output() change = new EventEmitter<any>();


  constructor() { }


  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Select Date";
    this.datepickerCls = this.datepickerCls ? this.datepickerCls : "form-control";
    this.isDisabled = this.isDisabled ? true : false;
    this.minDate = this.minDate ? this.minDate : '';
    this.maxDate = this.maxDate ? this.maxDate : '';
    this.readonly = this.readonly ? 'readonly' : '';
    this.dateFormat = this.dateFormat ? this.dateFormat : 'mm/dd/yyyy';
  }

  /**
   * Date value onchange event
   */ 
  public onValueChange(value: Date) {
    this.change.emit(value);
  }

}
