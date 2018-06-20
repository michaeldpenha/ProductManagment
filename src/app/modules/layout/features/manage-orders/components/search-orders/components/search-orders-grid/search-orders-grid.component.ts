import { Component, OnInit, Input } from '@angular/core';
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
      new GridColoumnConfig({ name: 'orderId', title: 'Order Id #', enableSorting: true, sortDirection: 'ASC' }),
      new GridColoumnConfig({ name: 'divisionId', title: 'Division' }),
      new GridColoumnConfig({ name: 'customerId', title: 'Customer Id #' }),
      new GridColoumnConfig({ name: 'supplierId', title: 'Supplier' }),
      new GridColoumnConfig({ name: 'itemQty', title: 'Total Quantity' }),
      new GridColoumnConfig({ name: 'orderType', title: 'Order Type' }),
      new GridColoumnConfig({ name: 'status', title: 'Status', render: (item, dataIndex) => { return `<div class="sachin">${item[dataIndex]}</div>`; } }),
      new GridColoumnConfig({ name: 'createdDate', title: 'Created Date', enableSorting: true, sortDirection: 'DESC' }),
      new GridColoumnConfig({ name: 'releaseDate', title: 'Release Date', enableSorting: true, sortDirection: 'DESC' }),
      new GridColoumnConfig({ name: 'deliveryDate', title: 'Delivery Date', enableSorting: true, sortDirection: 'DESC' }),
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
}
