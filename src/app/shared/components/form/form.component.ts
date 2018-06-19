import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import {FormConfig} from '.';
@Component({ 
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  @Input() formFields: any = [];
  @Output() fetchForm = new EventEmitter<any>();
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  public defaultFieldWidthCls: string = '';
  public defaultDisplayLabelCls: string = "";
  public defaultInputSubType : string = 'text';
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
    this.fetchForm.emit(this.form);
  }
  createGroup() {
    const group = this.formBuilder.group({});
    this.formFields.forEach(control => group.addControl(control.config.formName, this.createControl(control.config)));
    return group;
  }
  createControl(config : FormConfig){
     let { disabled, validation, defaultValue } = config;
     return this.formBuilder.control({value : defaultValue , disabled : disabled}, validation);
  }
  /**
   * This method will set the width of the field
   * formFieldWidth
   */
  public formFieldWidth = (item: any): string => {
    return item && item.fieldWidthCls ? item.fieldWidthCls : this.defaultFieldWidthCls;
  }
  /**
   * isReadOnly
   */
  public isReadOnly = (item :any) => {
    return item && item.readOnly ? item.readOnly() : false;
  }
  /**
   * fieldLabelCls
   */
  public fieldLabelCls = (cfg : any) => {
    return cfg.fieldLabelClass ? cfg.fieldLabelClass : '';
  }
  /**
   * inputClass
   */
  public inputClass = (cfg :any) => {
    return cfg.inputClass ? cfg.inputClass : '';
  }
  public fieldWidth = (cfg :any) =>{
    return cfg.fieldWidth ? cfg.fieldWidth : '';
  }
  /**
   * this method will set the label inline or block
   * displayLabelInline
   */
  public displayLabelInline = (item: any): string => {
    return item && item.displayLabelCls ? item.displayLabelCls : this.defaultDisplayLabelCls;
  }
  /**
   * Will print field label
   * printFieldLabel
   */
  public printFieldLabel = (item: any) => {
    return item && item.renderLabel ? item.renderLabel(item) : item.label ? item.label : '';
  }
  /**
   * get Input sub type
   */
  public getInputSubType = (item: any) => {
    return item && item.subtype ?item.subtype.toLowerCase() : this.defaultInputSubType;
  }
  /**
   * onBlur
   */
  public onBlur = (e : any,item : any) => {
    (item && item.blur) ? item.blur(e,item) : '';
  }
  /**
   * hidden
   */
  public isHidden = (item : any)  : string => {
    return (item && item.hidden) ? item.hidden(item) : false ;
  }
  /**
   * isDisabled
   */
  public isDisabled = (item : any) : boolean => {
    return item && item.disabled ? item.disabled(item) : false;
  }
  /**
   * onKeyUp
   */
  public onKeyUp= (e:any,item : any) => {
    return item && item.keyUp ? item.keyUp(e,item) : '';
  }
  /**
   * onKeyPress
   */
  public onKeyPress = (e:any,item : any) => {
    return item && item.keyPress ? item.keyPress(e,item) : '';
    
  }
  /**
   * onChange
   */
  public onChange = (e:any,item : any) => {
    this.form.get(item.formName).setValue(e);
    return item && item.change ? item.change(e,item) : '';
  }
  /**
   * toDisplayErrorMessage
   */
  public toDisplayError = (item : any) : boolean => {
    return item && item.isErrorMessageVisible ? item.isErrorMessageVisible(item) : false;
  }
  /**
   * toDisplayError
   */
  public toDisplayErrorMessage = (item : any) => {
    return item && item.displayErrorMessage ? item.displayErrorMessage(item) : 'Required';
  }
  /**
   * printPlaceHolder 
   */
  public printPlaceHolder = (cfg : any) : string => {
    return cfg.placeholder ? cfg.placeholder : '';
  }
  /**
   * fetchMaxDate
   */
  public fetchMaxDate = (cfg :any) => {
    return cfg && cfg.maxDate ? cfg.maxDate(cfg) : '';
  }
  /**
   * minDate
   */
  public fetchMinDate = (cfg :any) => {
    return cfg && cfg.minDate ? cfg.minDate(cfg) : '';
  }
  /**
   * fetchOptions
   */
  public fetchOptions = (cfg :any) => {
    return cfg && cfg.options ? cfg.options(cfg) : '';
  }
  /**
   * setMinimum
   */
  public setMinimum = (cfg : any) => {
    return cfg && (cfg.min || cfg.min == 0) ? cfg.min : '';
  }
  
  /**
   * setMax
   */
  public setMaximum = (cfg : any) => {
    return cfg && cfg.max ? cfg.max : '';
  }

  /**
   * getBtnCls
   */
  public getBtnCls = (item: any) => {
    return item && item.btnCls ? item.btnCls.toLowerCase() : "btn btn-default";
  }

  /**
   * getBtnText
   */
  public getBtnText = (item: any) => {
    return item && item.btnText ?item.btnText : "Sample Text";
  }

  /**
   * getBtnClick
   */
  public getBtnClick = (e:any, item: any) => {
    return item.btnClick ? item.btnClick(e,item) : '';
  }
}
