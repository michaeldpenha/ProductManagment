import { Component, OnInit } from '@angular/core';
import { StaticText } from "@app/shared/constants";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "@app/core/services";
import * as moment from 'moment';
import { OrdersService, RouterService } from '@app/shared/services';
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
  public okButtonText : string = StaticText.ok;
  public logisticsFooterVisible: boolean = false;
  public addLineText: string = 'Add Line';
  public previousIconClass: string = 'fa fa-plus';
  public orderDetailsData: any[];
  public id: string;
  public gridConfig: any;
  public data: any = [];
  public coloumnConfig: any;
  public detailsToBeDisplayed = [{label : 'Order No',key : 'orderId',value: ''},{label : 'Order Type',key : 'orderType',value: ''},
  {label : 'Status',key : 'status',value: ''},{label : 'Customer Id',key : 'customerId',value: ''},{label : 'Supplier Id',key : 'supplierId',value: ''},
  {label : 'Created By',key : 'created',value: ''}];
  public editHeaderInfoToBeDisplayed = [{label : 'Release Date', key : 'releaseDate', value: ''}, {label: 'Delivery Date', key : 'deliveryDate',  value: ''},
   {label: 'Schedule cut-off time', key: '',  value: ''}];
  constructor(private orderService: OrdersService, private route: ActivatedRoute, private routerService : RouterService,private loadingService: LoaderService) {
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
      enableCellEdit: true,
      allItemsSelected: false
    });
  }
  /**
   * populateColoumnConfig
   */
  public populateColoumnConfig = () => {
    this.coloumnConfig = [
      new GridColoumnConfig({ name: '', width: 50, title: 'No',render : (rec :any,cfg :any,i : number) => {
        return i + 1;
      } }),
      new GridColoumnConfig({ name: 'itemNumber', width: 100, title: 'Item Number' }),
      new GridColoumnConfig({ name: 'pack', width: 100, title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', width: 100, title: 'Size' }),
      new GridColoumnConfig({ name: 'description', width: 100, title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', width: 100, title: 'TixHi' }),
      new GridColoumnConfig({ name: 'boh', width: 100, title: 'BOH' }),
      new GridColoumnConfig({ name: 'qty', width: 100, title: 'Quantity' }),
      new GridColoumnConfig({ name: 'changeReason', width: 100, title: 'Change Reason' }),
      new GridColoumnConfig({ name: '', width: 100, title: 'Action' })
    ];
  }

  // view order details
  public fetchViewOrderDetails = (id: string) => {
    this.loadingService.show();
    this.orderService.fetchOrder({ orderId: id }).subscribe(items => {
      this.loadingService.hide();
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
public formatTheTemplate = (cfg : any) => {
  let result :string;
  result = (cfg.key.toLowerCase().indexOf('created') > -1 && this.orderDetailsData) ? `${this.orderDetailsData['createdBy']}
   on ${moment(this.orderDetailsData['createdTimeStamp']).format('MM/DD/YYYY HH:mm')}` :(this.orderDetailsData) ?  
    this.orderDetailsData[cfg.key] : '';
  return result;
}

public formatLogisticOrderData = (cfg: any) => {
  let result: string;
  result = this.orderDetailsData[cfg.key];
  return result;
}

}
