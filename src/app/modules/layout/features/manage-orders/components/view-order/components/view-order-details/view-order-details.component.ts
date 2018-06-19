import { OrdersService } from '@app/shared/services';
import { Component, OnInit, Input } from '@angular/core';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig } from "@app/shared/model";
import { StaticText } from "@app/shared/constants";

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.scss']
})
export class ViewOrderDetailsComponent implements OnInit {
  public detailsFooterVisible: boolean = false;
  public detailsHeader: string = StaticText.details;
  public logisticsHeader: string = StaticText.logistics;
  public logisticsFooterVisible: boolean = false;
  public addLineText: string = 'Add Line';
  public previousIconClass: string = 'fa fa-plus';
  public orderDetailsData: any[];
  
  @Input() gridConfig: any;
  @Input() data: any = [];
  @Input() coloumnConfig: any;

  // public orderDetailsData: any[] = [
  //   {
  //     label : 'Order Number',
  //     value : '98'
  //   },
  //   {
  //     label : 'Order Type',
  //     value : 'Rush'
  //   },
  //   {
  //     label : 'Order Status',
  //     value : 'New'
  //   },
  //   {
  //     label : 'Customer Number',
  //     value : '273'
  //   },
  //   {
  //     label : 'Supplier',
  //     value : 'WH/2527/GROC'
  //   },
  //   {
  //     label : 'Created By',
  //     value : 'annonymous on 06/19/2018 09:05'
  //   },
  // ];
  constructor(private orderService: OrdersService) { }

  ngOnInit() {
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
      new GridColoumnConfig({ name: 'No', width: 50, title: 'No' }),
      new GridColoumnConfig({ name: 'Item Number', width: 100, title: 'Item Number' }),
      new GridColoumnConfig({ name: 'Pack', width: 100, title: 'Pack' }),
      new GridColoumnConfig({ name: 'Size', width: 100, title: 'Size' }),
      new GridColoumnConfig({ name: 'Description', width: 100, title: 'Description' }),
      new GridColoumnConfig({ name: 'TixHi', width: 100, title: 'TixHi' }),
      new GridColoumnConfig({ name: 'Quantity', width: 100, title: 'Quantity' }),
      new GridColoumnConfig({ name: 'Status', width: 100, title: 'Status' })
    ];
  }

  // view order details
  public fetchViewOrderDetails = (id: string) => {
    this.orderService.viewOrderDetails(id).subscribe(element => {
      // this.orderDetailsData = element[];
    });
  }

  }
