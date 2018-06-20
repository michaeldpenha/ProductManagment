import { Component, OnInit, Input } from '@angular/core';
import { GridActionsConfig, GridColoumnConfig, GridConfiguration, CellEditConfiguration } from "@app/shared/model";
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
  @Input() noDataFound: string;
  @Input() gridData: any;
  constructor(private routerService: RouterService) { }

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
      noRecord: () => {
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
      new GridColoumnConfig({ name: 'divisionId', title: 'Division' }),
      new GridColoumnConfig({ name: 'customerId', title: 'Cust ID' }),
      new GridColoumnConfig({ name: 'supplierId', title: 'Supplier' }),
      new GridColoumnConfig({ name: 'status', title: 'Order Status' }),
      new GridColoumnConfig({ name: 'releaseDate', title: 'Release Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', defaultValue: moment(new Date()),showDefaultDate: false, subType: 'text', displayCellEdit: true, }) }),
      new GridColoumnConfig({ name: 'deliveryDate', title: 'Delivery Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', subType: 'text', showDefaultDate: false, displayCellEdit: true, }) })
    ]
  }
}
