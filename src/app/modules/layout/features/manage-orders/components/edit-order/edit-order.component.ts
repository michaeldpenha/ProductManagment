import { Component, OnInit } from '@angular/core';
import { StaticText } from "@app/shared/constants";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "@app/core/services";
import * as moment from 'moment';
import { OrdersService, RouterService, MessagesService } from '@app/shared/services';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig } from "@app/shared/model";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  public detailsFooterVisible: boolean = false;
  public detailsHeader: string = StaticText.details;
  public editOrderHeader: string = StaticText.editHeader;
  public okButtonText: string = StaticText.ok;
  public editOrderFooterVisible: boolean = false;
  public orderDetailsData: any[];
  public id: string;
  public gridConfig: any;
  public data: any = [];
  public coloumnConfig: any;
  public detailsToBeDisplayed = [{ label: 'Order No', key: 'orderId', value: '' }, { label: 'Order Type', key: 'orderType', value: '' },
  { label: 'Status', key: 'status', value: '' }, { label: 'Customer Id', key: 'customerId', value: '' }, { label: 'Supplier Id', key: 'supplierId', value: '' },
  { label: 'Created By', key: 'created', value: '' }];
  public editHeaderInfoToBeDisplayed = [{ label: 'Release Date', key: 'releaseDate', value: '' }, { label: 'Delivery Date', key: 'deliveryDate', value: '' },
  { label: 'Schedule cut-off time', key: '', value: '' }];
  constructor(private orderService: OrdersService, private route: ActivatedRoute, private routerService: RouterService, private loaderService: LoaderService, private msgService: MessagesService) {
    this.id = this.route.snapshot.params.id;
  }


  ngOnInit() {
    this.fetchViewOrderDetails(this.id);
    this.initializeGrid();
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
        name: 'changeReason', width: 100, title: 'Change Reason', editable : ()=>{return true },cellEdit: new CellEditConfiguration({
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
      this.data = items['orders'] && items['orders'][0] ? items['orders'][0]['items'] : [];
    });
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
     * itemNumberErrorMessage 
     */
  public itemNumberErrorMessage = (cfg: any, i: number, el: any): string => {
    console.log(this.data[i][cfg.name])
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
