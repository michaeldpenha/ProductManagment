import { Component, OnInit } from '@angular/core';
import { StaticText } from "@app/shared/constants";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "@app/core/services";
import * as moment from 'moment';
import { OrdersService, RouterService, MessagesService } from '@app/shared/services';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig, FormFieldConfig } from "@app/shared/model";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public searchParam : any = {};
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
        },hidden: () => {
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
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-6 col-lg-3', fieldWidth: "pull-right", btnCls: "btn btn-default", btnText: "Cancel", btnClick: (e) => {
          // this.search(e);
          
        }, disabled: (e) => {
          //return this.customErrorVisible(e);
        }
      }),
      new FormFieldConfig({
        type: 'button', formName: '', fieldWidthCls: 'col-6 col-md-1', fieldWidth: "pull-right-lg", btnCls: "btn btn-success", btnText: "Update", btnClick: (e) => {
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
   * populateColoumnConfig
   */
  public populateColoumnConfig = () => {
    this.coloumnConfig = [
      new GridColoumnConfig({
        name: '', width: 50, title: 'No', render: (rec: any, cfg: any, i: number) => {
          return i + 1;
        }
      }),
      new GridColoumnConfig({ name: 'itemNumber', width: 100, title: 'Item Number' }),
      new GridColoumnConfig({ name: 'pack', width: 100, title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', width: 100, title: 'Size' }),
      new GridColoumnConfig({ name: 'description', width: 100, title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', width: 100, title: 'TixHi' }),
      new GridColoumnConfig({ name: 'boh', width: 100, title: 'BOH' }),
      new GridColoumnConfig({
        name: 'qty', width: 100, title: 'Quantity', cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
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
      new GridColoumnConfig({
        name: 'changeReason', width: 100, title: 'Change Reason', editable: () => { return true }, cellEdit: new CellEditConfiguration({
          type: 'dropdown', blur: (e: any, item: any, cfg: any, index: number) => { }
        })
      }),
      new GridColoumnConfig({
        name: 'actions',
        width: 100,
        title: 'Action',
        actionItems: [
          new GridActionsConfig({
            label: '',
            iconClass: 'fa fa-edit', click: (item) => {
              //this.navigate(`/manage-order/edit-order/${item['orderId']}`);
            }
          }),
          new GridActionsConfig({
            label: '',
            iconClass: 'fa fa-close', click: (item) => {
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
      this.prepareSubmitData();
    });
  }
  /**
   * prepareSubmitData
   */
  public prepareSubmitData = () => {
    this.searchParam= {};
    this.searchParam = {
      'status' : this.orderDetailsData['status'] ? this.orderDetailsData['status'] : '',
      'changeReason' : this.orderDetailsData['changeReason'] ? this.orderDetailsData['changeReason'] : '',
      'releaseDate' : this.orderDetailsData['releaseDate'] ? this.orderDetailsData['releaseDate'] : '',
      'deliveryDate' : this.orderDetailsData['deliveryDate'] ? this.orderDetailsData['deliveryDate'] : ''
    }
  }
  /**
   * configInitialization
   */
  public configInitialization = () => {
    this.detailsToBeDisplayed = [{ label: 'Order No', key: 'orderId', value: '' }, { label: 'Order Type', key: 'orderType', value: '' },
    { label: 'Status', key: 'status', value: '' }, { label: 'Customer Id', key: 'customerId', value: '' }, { label: 'Supplier Id', key: 'supplierId', value: '' },
    { label: 'Created By', key: 'created', value: '' }];
    this.editHeaderInfoToBeDisplayed = [{ label: 'Process Date', key: 'releaseDate', value: '', type: 'datepicker', showDefaultDate: true }, { type: 'datepicker', label: 'Delivery Date', key: 'deliveryDate', showDefaultDate: true, value: '' },
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
      result = result || (element['itemNumber'] && element['itemNumber'].trim() == this.data[i]['itemNumber'].trim() && i != index)
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
      //(element['description'] && element['description'].toLowerCase() == "no matching item found") ? this.noItemNumberFound(index, el) : this.fillGridObjectValues(index, element);
      this.data[index]['itemNumber'] = val;
    });
  }
  /**
   * showItemNumberErrorMsg
   */
  public showItemNumberErrorMsg = (i: number, dirty: boolean) => {
    let result = false;
    result = !(this.data[i]['description'] && this.data[i]['description'] != '') && dirty;
    return result ? result : false;
  }

}
