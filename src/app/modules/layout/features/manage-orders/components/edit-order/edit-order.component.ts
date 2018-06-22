import { Component, OnInit } from '@angular/core';
import { StaticText } from "@app/shared/constants";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "@app/core/services";
import * as moment from 'moment';
import { OrdersService, RouterService, MessagesService } from '@app/shared/services';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig, FormFieldConfig } from "@app/shared/model";
import { OrdersConfig } from "@app/shared/config";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  displayGridErrorMessage: boolean;
  public searchParam: any = {};
  public detailsFooterVisible: boolean = false;
  public detailsHeader: string = StaticText.details;
  public editOrderHeader: string = StaticText.editHeader;
  public okButtonText: string = StaticText.editSubmitText;
  public cancelButtontext: string = StaticText.editCancelText;
  public editOrderFooterVisible: boolean = false;
  public orderDetailsData: any[];
  public id: string;
  public gridConfig: any;
  public data: any = [];
  public coloumnConfig: any;
  public detailsToBeDisplayed: any = [];
  public editHeaderInfoToBeDisplayed: any = [];
  public formFields: any = [];
  public addLineText: string = 'Add Line';
  public previousIconClass: string = 'fa fa-plus';
  public previousBtnClass: string = 'btn btn-primary';
  constructor(private orderService: OrdersService, private route: ActivatedRoute, private routerService: RouterService, private loaderService: LoaderService, private msgService: MessagesService) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.orderService.fetchStaticValues();
    this.fetchViewOrderDetails(this.id);
    this.initializeGrid();
    this.initializeForm();
  }
  /**
   * initializeForm
   */
  public initializeForm = () => {
    this.formFields = [
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'orderStatusCode', name: 'status', defaultOptionsValue: 'orderStatusCode', formName: 'status', defaultValue: StaticText.orderStatusLabel, options: () => { return this.orderService.orderTypeStatus }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          //this.displayDatePickers(e, item);
          //this.populateSearchParams(e, item);
          this.searchParam['status'] = e;
        }, hidden: () => {
          //console.log(this.form.get('customerGroupId').value)
          document.getElementsByName('status')[0] ? document.getElementsByName('status')[0]['value'] = this.searchParam && this.searchParam['status'] ? this.searchParam['status'] : '' : '';
          return false;
        }
      }),
      new FormFieldConfig({
        type: 'dropdown', defaultDisplayLabel: 'changeReasonCode', name: 'changeReason', defaultOptionsValue: 'changeReasonCode', formName: 'changeReason', defaultValue: StaticText.selectChangeReason, options: () => { return this.orderService.changeReasons }, fieldWidthCls: 'col-lg-2 col-md-4', displayLabelCls: 'form-group required row', fieldLabelClass: 'col-md-3 col-form-label', inputClass: "form-control form-control-sm", fieldWidth: "col-md-12", change: (e: any, item: any) => {
          // this.populateSearchQuery(e, item);
          //this.populateSearchParams(e, item);
          this.searchParam['changeReason'] = e;
        }, hidden: () => {
          //console.log(this.form.get('customerGroupId').value)
          document.getElementsByName('changeReason')[0] ? document.getElementsByName('changeReason')[0]['value'] = this.searchParam && this.searchParam['changeReason'] ? this.searchParam['changeReason'] : '' : '';
          return false;
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'ml-auto', fieldWidth: "ml-3", btnCls: "btn btn-default", btnText: "Cancel", btnClick: (e) => {
          // this.search(e);

        }, disabled: (e) => {
          //return this.customErrorVisible(e);
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: '', fieldWidth: "mr-3", btnCls: "btn btn-success mr-3", btnText: "Update", btnClick: (e) => {
          //this.reset(e);
          //this.submitBatch();
        }, disabled: (e) => {
          //return this.searchQueryParams && Object.keys(this.searchQueryParams).length == 0;
        }
      })
    ]
  }
  /**
  * initializeGrid
  */
  public initializeGrid = () => {
    this.populateGridConfig();
    this.populateColoumnConfig();
  }
  /**
   * populateGridConfig
   */
  public populateGridConfig = () => {
    this.gridConfig = new GridConfiguration({
      displayCheckBox: false,
      enableCellEdit: true
    });
  }
  /**
   * 
   * Need to put this function at one place
   * TODO 
   */
  public createObjectWithBlankValues = (ary: any[]): any => {
    let result: any = {};
    ary.forEach(element => {
      let key: string = element.config.name;
      result[key] = '';
    });
    result['rowAction'] = 'new';
    return result;
  }
  /**
   * addLine
   */
  public addRow = () => {
    this.displayGridErrorMessage = false;
    (this.data.length == OrdersConfig.maxAdditionOfItemsInSingleOrder) ? this.displayGridErrorMessage = true : this.pushBlankObjectInGrid();
  }
  /**
   * pushBlankObjectInGrid
   */
  public pushBlankObjectInGrid = () => {
    this.data.push(this.createObjectWithBlankValues(this.coloumnConfig));
  }
  /**
   * populateColoumnConfig
   */
  public populateColoumnConfig = () => {
    this.coloumnConfig = [
      new GridColoumnConfig({
        name: '', width: 50, title: 'No', render: (rec: any, cfg: any, i: number) => {
          return i + 1;
        }
      }),
      new GridColoumnConfig({
        name: 'itemNumber', width: 130, title: 'Item Number', editable: (item: any) => { return item.rowAction === "new"}, cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
            ///this.data[index].cellAction = this.isDuplicateRec(index) ? 'error' : 'new';
            e.target.value == "" ? this.fillGridObjectValues(index, {}) : this.isDuplicateRec(index) ? this.fillGridObjectValues(index, {}) :
              this.fetchItemsInfo(e.target.value, index, e);
            this.data[index]['itemNumber'] = e.target.value.trim();
          }, displayCellEdit: true, disabled: () => { return false; }, printErrorMsg: (cfg, i, errEl) => {
            return this.itemNumberErrorMessage(cfg, i, errEl);
          }, showErrorMsg: (cfg, i, errEl) => {
            return this.showItemNumberErrorMsg(i, (errEl && errEl.getAttribute('dirty') == 'true'));

          }, focus: (cfg: any, index: number) => {

          },
          dirty: false
        })
      }),
      new GridColoumnConfig({ name: 'pack', width: 50, title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', width: 50, title: 'Size' }),
      new GridColoumnConfig({ name: 'description', width: 300, title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', width: 100, title: 'TixHi' }),
      new GridColoumnConfig({ name: 'boh', width: 100, title: 'BOH' }),
      new GridColoumnConfig({
        name: 'qty', width: 50, title: 'Quantity', editable: (item: any) => { return item.rowAction == 'new' || (item.rowAction == "exist" && (item.cellAction.toLowerCase() == 'update' || item.cellAction.toLowerCase() === 'error')) },  cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
            this.data[index][cfg.name] = e.target.value;
           // this.data[index].cellAction = this.data[index][cfg.name] == "" ? 'invalid' : 'edit';
          },
          keyPress: (e) => { return e.charCode >= 48 },
          min: 1,
          printErrorMsg: (cfg, i, errEl) => {
            return this.msgService.fetchMessage('quantity', 'required');
          }, showErrorMsg: (cfg, i, errEl) => {
            this.data[i].cellAction = (this.data[i]['itemNumber'] != '' && !this.showItemNumberErrorMsg(i, true) && this.data[i][cfg.name] == '' && errEl && errEl.getAttribute('dirty') == "true") ? 'error' : 'update';
            return this.data[i]['itemNumber'] != '' && !this.showItemNumberErrorMsg(i, true) && this.data[i][cfg.name] == '' && errEl && errEl.getAttribute('dirty') == "true";

          }, subType: 'number', displayCellEdit: true, disabled: (item: any, cfg: any, index: any) => { return this.data[index]['itemNumber'] == ''; }
        })
      }),
      new GridColoumnConfig({
        name: 'changeReason', width: 130, title: 'Change Reason',editable: (item: any) => { return item.rowAction && item.rowAction.toLowerCase() === "exist" && item.cellAction && (item.cellAction.toLowerCase() === 'update' || item.cellAction.toLowerCase() === 'error')}, cellEdit: new CellEditConfiguration({
          type: 'dropdown',inputClass: 'form-control form-control-sm',change:(e,item,index)=>{
            debugger;
            this.data[index]['changeReason'] =  e != '' && e != StaticText.selectChangeReason ? e : '';
          },name:'changeReason',defaultOptionsValue : 'changeReasonCode',defaultDisplayLabel:'changeReasonCode', defaultValue: StaticText.selectChangeReason, options: () => { return this.orderService.changeReasons },blur: (e: any, item: any, cfg: any, index: number) => { }
        })
      }),
      new GridColoumnConfig({
        name: 'actions',
        width: 130,
        title: 'Action',
        actionItems: [
          new GridActionsConfig({
            btnCls: 'btn btn-outline-primary btn-sm',
            label: '',
            iconClass: 'fa fa-edit', iconTooltip: 'Edit',
            iconClassMethod : (cfg : any ,i : number) => {
              return (this.data[i].cellAction == 'update') ? 'fa fa-check' : 'fa fa-edit';
            },iconsTooltipMethod : (cfg : any , i : number)=>{
              return (this.data[i].cellAction == 'update') ? 'Check' : 'Edit';
            }, click: (item : any,cfg :any) => {
              item.cellAction =  (item.cellAction == 'update') ? 'view' : 'update';
              //item.action = "update";
              //this.navigate(`/manage-order/edit-order/${item['orderId']}`);
            }, disable: (item: any,i) => {
              return i.rowAction === 'new' || (i.cellAction == "error");
            }
          }),
          new GridActionsConfig({
            btnCls: 'btn btn-outline-danger btn-sm',
            label: '',
            iconClass: 'fa fa-trash', iconTooltip: 'Cancel', iconClassMethod : (cfg : any ,i : number) => {
              return 'fa fa-trash';
            },iconsTooltipMethod : (cfg : any , i : number)=>{
              return 'Cancel';
            }, click: (item) => {
              //item.rowAction = "cancelled";
              //this.navigate(`/manage-order/view-order/${item['orderId']}`);
            }
          })
        ]
      })
    ];
  }

  // view order details
  public fetchViewOrderDetails = (id: string) => {
    this.loaderService.show();
    this.orderService.fetchOrder({ orderId: id }).subscribe(items => {
      this.loaderService.hide();
      this.orderDetailsData = items['orders'] && items['orders'][0] ? items['orders'][0] : [];
      this.configInitialization();
      this.data = items['orders'] && items['orders'][0] ? items['orders'][0]['items'] : [];
      this.appendActionToItem('exist');
      this.prepareSubmitData();
    });
  }
  /**
   * appendActionToItem
   */
  public appendActionToItem = (status) => {
    this.data.forEach(el => {
      el.rowAction = status;
      el.cellAction = "view";
    });
  }
  /**
   * prepareSubmitData
   */
  public prepareSubmitData = () => {
    this.searchParam = {};
    this.searchParam = {
      'status': this.orderDetailsData['status'] ? this.orderDetailsData['status'] : '',
      'changeReason': this.orderDetailsData['changeReason'] ? this.orderDetailsData['changeReason'] : '',
      'releaseDate': this.orderDetailsData['releaseDate'] ? this.orderDetailsData['releaseDate'] : '',
      'deliveryDate': this.orderDetailsData['deliveryDate'] ? this.orderDetailsData['deliveryDate'] : ''
    }
  }
  /**
   * configInitialization
   */
  public configInitialization = () => {
    this.detailsToBeDisplayed = [{ label: 'Order No', key: 'orderId', value: '' }, { label: 'Order Type', key: 'orderType', value: '' },
    { label: 'Status', key: 'status', value: '' }, { label: 'Customer Id', key: 'customerId', value: '' }, { label: 'Supplier Id', key: 'supplierId', value: '' },
    { label: 'Created By', key: 'created', value: '' }];
    this.editHeaderInfoToBeDisplayed = [{ label: 'Process Date', key: 'releaseDate', value: '', type: 'datepicker', readonly: true, showDefaultDate: true }, { readonly: true, type: 'datepicker', label: 'Delivery Date', key: 'deliveryDate', showDefaultDate: true, value: '' },
    { label: 'Schedule cut-off time', key: '', value: '', type: 'input', subTYpe: 'text', disabled: true }];
  }
  /**
   * navigate
   */
  public navigate = () => {
    this.routerService.navigateTo('/manage-order');
  }

  /**
   * formatTheTemplate
   */
  public formatTheTemplate = (cfg: any) => {
    let result: string;
    result = (cfg.key.toLowerCase().indexOf('created') > -1 && this.orderDetailsData) ? `${this.orderDetailsData['createdBy']}
   on ${moment(this.orderDetailsData['createdTimeStamp']).format('MM/DD/YYYY HH:mm')}` : (this.orderDetailsData) ?
        this.orderDetailsData[cfg.key] : '';
    return result;
  }

  public formatLogisticOrderData = (cfg: any) => {
    let result: string;
    result = this.orderDetailsData[cfg.key];
    return result;
  }
  /**
   * fetchDatepickerValue
   */
  public fetchDatepickerValue = (key: any) => {
    return this.orderDetailsData ? this.orderDetailsData[key] : '';
  }
  /**
     * itemNumberErrorMessage 
     */
  public itemNumberErrorMessage = (cfg: any, i: number, el: any): string => {
    return !this.data[i][cfg.name] || this.data[i][cfg.name] == '' ? this.msgService.fetchMessage(cfg.name, 'required') : this.isDuplicateRec(i) ? this.msgService.fetchMessage(cfg.name, 'duplicate') : el.getAttribute('error');
  }
  /**
   * isDuplicateRec
   */
  public isDuplicateRec = (i: number): boolean => {
    let result: boolean = false;
    this.data.forEach((element, index) => {
      result = result || (element && element['itemNumber'] &&this.data[i]['itemNumber'] &&  element['itemNumber'] == this.data[i]['itemNumber'].trim() && i != index)
    });
    return result;
  }
  /**
   * fillGridObjectValues
   */
  public fillGridObjectValues = (index: number, obj: any) => {
    let item: any = this.coloumnConfig;
    item.forEach(element => {
      let itemObj: any = this.data[index];
      (element['config']['name'] != 'actions' || element['config']['name'] != '' || element['config']['name'] != 'itemNumber') ? itemObj[element['config']['name']] = obj[element['config']['name']] : '';
    });
  }
  /**
 * fetchItemsInfo
 */
  public fetchItemsInfo = (val: string, index: number, el: any) => {
    this.orderService.getItemDetails(val).subscribe(element => {
      this.loaderService.hide();
      (element['description'] && element['description'].toLowerCase() == "no matching item found") ? this.noItemNumberFound(index, el) : this.fillGridObjectValues(index, element);
      this.data[index]['itemNumber'] = val;
    });
  }
  /**
   * noItemNumberFound
   */
  public noItemNumberFound = (index: number, el: any) => {
    el.target.setAttribute('error', this.msgService.fetchMessage('itemNumber', 'notFound'));
    this.fillGridObjectValues(index, {})
  }
  /**
   * showItemNumberErrorMsg
   */
  public showItemNumberErrorMsg = (i: number, dirty: boolean) => {
    let result = false;
    result = !(this.data[i]['pack'] >= 0) && dirty;
    return result ? result : false;
  }

}
