import { Component, OnInit, Input } from '@angular/core';
import { GridActionsConfig, GridColoumnConfig, GridConfiguration } from "@app/shared/model";
import { StaticText } from "@app/shared/constants";
import { RouterService } from "@app/shared/services";

@Component({
  selector: 'app-header-update-grid',
  templateUrl: './header-update-grid.component.html',
  styleUrls: ['./header-update-grid.component.scss']
})
export class HeaderUpdateGridComponent implements OnInit {
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
      new GridColoumnConfig({ name: 'orderId', title: 'Ord #' }),
      new GridColoumnConfig({ name: 'totalQty', title: 'Total Qty' }),
      new GridColoumnConfig({ name: 'division', title: 'Division' }),
      new GridColoumnConfig({ name: 'custId', title: 'Cust ID' }),
      new GridColoumnConfig({ name: 'supplier', title: 'Supplier' }),
      new GridColoumnConfig({ name: 'orderStatus', title: 'Order Status' }),
      new GridColoumnConfig({ name: 'releaseDate', title: 'Release Date' }),
      new GridColoumnConfig({ name: 'deliveryDate', title: 'Delivery Date' })
    ]
  }
}
