import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text : string = '';
  @Input() cls : string = '';
  @Input() iconClass : string = '';
  @Input() previousIconClass : string = '';
  @Input() disabled : boolean = false;
  @Output() onButtonClick  = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit() {
    
  }
  /**
   * buttonClick
   */
  public buttonClick = () => {
    this.onButtonClick.emit();
  }

}
