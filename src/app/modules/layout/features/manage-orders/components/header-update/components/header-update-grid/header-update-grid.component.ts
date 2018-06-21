import { Component, OnInit, Input } from '@angular/core';
import { GridActionsConfig, GridColoumnConfig, GridConfiguration, CellEditConfiguration } from "@app/shared/model";
import { StaticText } from "@app/shared/constants";
import { RouterService } from "@app/shared/services";
import * as moment from 'moment';

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
      new GridColoumnConfig({
        name: 'releaseDate', title: 'Release Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'datepicker', defaultValue: 'MM/DD/YYYY', value: (cfg, data) => {
            cfg.cellEdit.config.showDefaultDate = data[cfg.name] ? true : false;
            return data[cfg.name] ? new Date(data[cfg.name]) : '';
          }, minDate: (cfg: any, item: any) => {
            return null;
          }, disabled: (cfg: any) => {
            return false;
          },readOnly: () => {
            return 'readonly';
          },
          maxDate: (cfg: any, item: any) => {
            return item['releaseDate'] ? new Date(item['releaseDate']) : null;
          }, showDefaultDate: true, subType: 'text', displayCellEdit: true,
        })
      }),
      new GridColoumnConfig({
        name: 'deliveryDate', title: 'Delivery Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'datepicker', subType: 'text', showDefaultDate: true, displayCellEdit: true, value: (cfg, data) => {
            cfg.cellEdit.config.showDefaultDate = data[cfg.name] ? true : false;
            return data[cfg.name] ? new Date(data[cfg.name]) : '';
          }, minDate: (cfg, item) => { return item['deliveryDate'] ? new Date(item['deliveryDate']) : null; },
          maxDate: () => {
            return null;
          }, disabled: (cfg: any) => {
            return false;
          }, readOnly: () => {
            return 'readonly';
          }
        })
      })
    ]
  }
}
