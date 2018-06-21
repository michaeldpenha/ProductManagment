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
      new GridColoumnConfig({ name: 'orderId', title: 'Order Id' }),
      new GridColoumnConfig({ name: 'totalQty', title: 'Quantity' }),
      new GridColoumnConfig({ name: 'divisionId', title: 'Division' }),
      new GridColoumnConfig({ name: 'customerId', title: 'Customer ID' }),
      new GridColoumnConfig({ name: 'supplierId', title: 'Supplier' }),
      new GridColoumnConfig({
        name: 'status', title: 'Status', render: (item, dataIndex) => {
          return `<div class="badge ${this.fetchStatusCls(item, dataIndex)} wrap-text">${item[dataIndex]}</div>`;
        }
      }),
      new GridColoumnConfig({
        name: 'releaseDate', title: 'Process Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'datepicker', defaultValue: 'MM/DD/YYYY', value: (cfg, data) => {
            cfg.cellEdit.config.showDefaultDate = data[cfg.name] ? true : false;
            return data[cfg.name] ? new Date(data[cfg.name]) : '';
          }, minDate: (cfg: any, item: any) => {
            return new Date();
          }, disabled: (cfg: any) => {
            return false;
          }, readOnly: () => {
            return 'readonly';
          },change : (e:any,item : any,data:any) => {
            data[item.name] = moment(e).format('MM/DD/YYYY');
          },
          maxDate: (cfg: any, item: any) => {
            return item['deliveryDate'] ? new Date(item['deliveryDate']) : null;
          }, showDefaultDate: true, subType: 'text', displayCellEdit: true,
        })
      }),
      new GridColoumnConfig({
        name: 'deliveryDate', title: 'Delivery Date', editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'datepicker', subType: 'text', showDefaultDate: true, displayCellEdit: true, value: (cfg, data) => {
            cfg.cellEdit.config.showDefaultDate = data[cfg.name] ? true : false;
            return data[cfg.name] ? new Date(data[cfg.name]) : '';
          }, minDate: (cfg, item) => { return item['releaseDate'] ? new Date(item['releaseDate']) : null; },
          maxDate: () => {
            return null;
          }, change : (e:any,item : any,data:any) => {
            data[item.name] =moment(e).format('MM/DD/YYYY');
          },disabled: (cfg: any) => {
            return false;
          }, readOnly: () => {
            return 'readonly';
          }
        })
      })
    ]
  }

  /**
   * fetchStatusCls
   */
  public fetchStatusCls = (item: any, dataIndex: string) => {
    let cls: string;
    switch (item[dataIndex]) {
      case "New": cls = 'badge-primary'; break;
      case "Hold": cls = 'badge-warning'; break;
      case "Inactive": cls = 'badge-secondary'; break;
      case "Active":
      case "Released for fulfillement": cls = 'badge-success'; break;
      case "Released to routing": cls = 'badge-warning'; break;
      case "Cancelled": cls = 'badge-danger'; break;
      default: cls = 'badge-info'; break;
    }
    return cls;
  }
}
