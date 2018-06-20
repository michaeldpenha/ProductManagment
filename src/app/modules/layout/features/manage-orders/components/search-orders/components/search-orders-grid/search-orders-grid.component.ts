import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridActionsConfig, GridColoumnConfig, GridConfiguration } from "@app/shared/model";
import { StaticText } from "@app/shared/constants";
import { RouterService } from "@app/shared/services";

@Component({
  selector: 'app-search-orders-grid',
  templateUrl: './search-orders-grid.component.html',
  styleUrls: ['./search-orders-grid.component.scss']
})
export class SearchOrdersGridComponent implements OnInit {
  public gridConfig: GridConfiguration;
  public coloumnConfig: GridColoumnConfig[];
  @Input() noDataFound : string;
  @Input() gridData : any;
  @Output() sort = new EventEmitter<any>();
  constructor(private routerService  :RouterService) { }

  ngOnInit() {
    this.populateGridConfig();
    this.populateColoumnConfig();
  }

  /**
   * To populate Grid Configuration
   */
  public populateGridConfig = () => {
    this.gridConfig = new GridConfiguration({
      displayCheckBox: true,
      enableCellEdit: false,
      allItemsSelected: false,
      noRecord : () => {
        return this.noDataFound
      }
    });
  }
  /**
     * populateColoumnConfig
     */
  public populateColoumnConfig = () => {
    this.coloumnConfig = [
      new GridColoumnConfig({ name: 'orderId', sortIndex : 'orderId' ,title: 'Order Id', enableSorting: true, sortDirection: 'ASC' }),
      new GridColoumnConfig({ name: 'divisionId', title: 'Division' }),
      new GridColoumnConfig({ name: 'customerId', title: 'Customer Id' }),
      new GridColoumnConfig({ name: 'supplierId', title: 'Supplier' }),
      new GridColoumnConfig({ name: 'itemQty', title: 'Total Quantity' }),
      new GridColoumnConfig({ name: 'orderType', title: 'Order Type' }),
      new GridColoumnConfig({ name: 'status', title: 'Status', render: (item, dataIndex) => {
        //return `<div class="sachin">${item[dataIndex]}</div>`; 
        switch( item[dataIndex] ) {
            case "New":
                return `<div class="badge badge-primary">${item[dataIndex]}</div>`;
            case "Hold":
                return `<div class="badge badge-warning">${item[dataIndex]}</div>`;
            case "Active":
                return `<div class="badge badge-success">${item[dataIndex]}</div>`;
            case "Inactive":
                return `<div class="badge badge-secondary">${item[dataIndex]}</div>`;
            case "Released for fulfillement":
                return `<div class="badge badge-success">${item[dataIndex]}</div>`;
            case "Released to routing":
                return `<div class="badge badge-warning">${item[dataIndex]}</div>`;
            case "Cancelled":
                return `<div class="badge badge-danger">${item[dataIndex]}</div>`;
            default: return `<div class="badge badge-info">${item[dataIndex]}</div>`;
        }
      } }),
      new GridColoumnConfig({ name: 'createdDate',sortIndex : 'createTs' , title: 'Created Date', enableSorting: true, sortDirection: 'DESC' }),
      new GridColoumnConfig({ name: 'releaseDate',sortIndex : 'scheduledReleaseDate' , title: 'Release Date', enableSorting: true, sortDirection: 'DESC' }),
      new GridColoumnConfig({ name: 'deliveryDate',sortIndex : 'scheduledDeliveryDate' , title: 'Delivery Date', enableSorting: true, sortDirection: 'DESC' }),
      new GridColoumnConfig({
        name: 'actions',
        title : 'Action',
        actionItems: [
          new GridActionsConfig({ label: '', iconClass:'fa fa-edit', click: (item, actionCfg) => { this.navigate(`/manage-order/edit-order/${item['orderId']}`); } }),
          new GridActionsConfig({ label: '', iconClass:'fa fa-eye', click: (item, actionCfg) => { this.navigate(`/manage-order/view-order/${item['orderId']}`); } })
        ]
      })
    ]
  }
  /**
   * navigate
   */
  public navigate= (url) => {
    this.routerService.navigateTo(url);
  }
  /**
   * triggerSorting
   */
  public triggerSorting =  (cfg:any )=> {
    this.sort.emit(cfg);
}
}
