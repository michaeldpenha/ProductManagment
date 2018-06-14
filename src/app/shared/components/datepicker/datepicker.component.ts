import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

 // defaultDate = new Date();
  @Input() datepickerCls : string;
  @Input() placeholder: any;
  @Input() disabled : boolean = false;
  @Input() getMinDate : any;
  @Input() getMaxDate : any;
  @Input() dateFormat: any;
  @Output() change = new EventEmitter<any>();


  constructor() { }


  ngOnInit() {
    this.placeholder = this.placeholder ? this.placeholder : "Select Date";
    this.datepickerCls = this.datepickerCls ? this.datepickerCls : "form-control";
    this.getMinDate = this.getMinDate ? this.getMinDate : '';
    this.getMaxDate = this.getMaxDate ? this.getMaxDate : '';
    this.dateFormat = this.dateFormat ? this.dateFormat : '';
  }

  /**
   * Date value onchange event
   */ 
  public onValueChange(value: Date) {
    this.change.emit(value);
  }

}
