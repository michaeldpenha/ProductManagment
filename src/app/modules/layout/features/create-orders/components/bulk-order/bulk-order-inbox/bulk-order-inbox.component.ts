import { DialogService } from '@app/shared/components/modal-dialog/modal-dialog.service';
import { LoaderService } from './../../../../../../../core/services/loader/loader.service';
import { OrdersService } from '@app/shared/services';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig } from "@app/shared/model";
import { moment } from "ngx-bootstrap/chronos/test/chain";

@Component({
  selector: 'app-bulk-order-inbox',
  templateUrl: './bulk-order-inbox.component.html',
  styleUrls: ['./bulk-order-inbox.component.scss']
})
export class BulkOrderInboxComponent implements OnInit {

  @Output() deleteActionTrigger = new EventEmitter<any>();
  public data: any = [];
  public coloumnConfig: any;
  public gridConfig: any;
  public refreshBtnCls: string = "btn btn-primary btn-sm pull-right";
  public refreshBtnTooltip: string = "Refresh";
  public refreshBtnIconClass: string = "fa fa-refresh";

  constructor(private orderService: OrdersService, private loaderService: LoaderService, private dialogService: DialogService) { }

  ngOnInit() {
    this.initializeGrid();
    this.fillInboxDetails();
  }

  /*
   * initializeGrid
   */
  public initializeGrid = () => {
    this.populateGridConfig();
    this.populateColoumnConfig();
  }


  /** Fill Inbox details */
  public fillInboxDetails = () => {
    this.data = [];
    this.orderService.fetchInboxRecords().subscribe((resultSet: any) => {
      this.loaderService.hide();
      this.data = resultSet;
    })
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
      new GridColoumnConfig({ name: '', width: 100, title: 'User Id' }),
      new GridColoumnConfig({ name: 'createTS', width: 100, title: 'Date & Time Of Upload', render: (item, col, i) => { return moment(item.createTS).format('MM/DD/YYYY HH:mm'); } }),
      new GridColoumnConfig({ name: 'id', width: 100, title: 'Batch Id' }),
      new GridColoumnConfig({
        name: 'id', width: 100, title: 'UploadStatus', render: (item, col, i) => {
          return `
       <div><b>Upload Status:</b> ${item.uploadStatus}</div>
       <div><b>Batch Status:</b> ${item.batchStatus}</div>
       <div><b>Total Orders:</b> ${item.totalCount}</div>
       <div><b>Order validated Successful:</b> ${item.validCount}</div>
       <div><b>Orders with error:</b> ${item.errorCount}</div>
       <div><b>Order with warning:</b> ${item.processedCount}</div>
      ` }
      }),
      new GridColoumnConfig({
        name: 'actions',
        title: 'Action', width: 100,
        actionItems: [
          new GridActionsConfig({
            btnCls: 'btn btn-outline-primary btn-sm', disable: (cfg, item) => {
              return item.batchStatus.toUpperCase() === "CANCELLED" || item.batchStatus.toUpperCase() === "PROCESSING_SUCCESSFUL";
            }, iconClass: 'fa fa-check', iconTooltip: 'Process Order', label: '', click: (item: any, actionCfg: any, index: number) => {
              this.dialogService.showDialog('Warning', '', '', 'Warning', 'Are you sure you want to process this order ?', 'Submit', () => {
                this.submitInboxBatch(item.id);
              }, 'Cancel', () => {

              });
            }
          }),
          new GridActionsConfig({
            btnCls: 'btn btn-outline-danger btn-sm', disable: (cfg, item) => {
              return item.batchStatus.toUpperCase() === "CANCELLED" || item.batchStatus.toUpperCase() === "PROCESSING_SUCCESSFUL";
            }, iconClass: 'fa fa-times', iconTooltip: 'Cancel Order', label: '', click: (item: any, actionCfg: any, index: number) => {
              this.dialogService.showDialog('Warning', '', '', 'Warning', 'Are you sure you want to cancel this order ?', 'Submit', () => {
                this.cancelInboxBatch(item.id);
              }, 'Cancel', () => {

              });
            }
          }),
          new GridActionsConfig({
            btnCls: 'btn btn-outline-info btn-sm', disable: (cfg, item) => {
              return item.errorCount === 0;
            }, iconClass: 'fa fa-download', iconTooltip: 'Error Report', label: '', click: (item: any, actionCfg: any, index: number) => {
            }
          })
        ]
      })
    ]
  }

  /** Submit Inbox */
  public submitInboxBatch = (batchId: any) => {
    this.orderService.submitInboxBatch(batchId)
      .subscribe(data => {
        this.loaderService.hide();
        this.dialogService.showDialog('Success', 'fa fa-check circle-green', '', 'Success', 'Submitted Successfully', 'Ok', () => {
          this.fillInboxDetails();
        }, '', () => {
        });
      });
  }


  /** Cancel Inbox */

  public cancelInboxBatch = (batchId: any) => {
    this.orderService.cancelInboxBatch(batchId)
      .subscribe(data => {
        this.loaderService.hide();
        this.dialogService.showDialog('Success', 'fa fa-check circle-green', '', 'Success', 'Cancelled Successfully', 'Ok', () => {
          this.fillInboxDetails();
        }, '', () => {
        });
      });
  }
}
