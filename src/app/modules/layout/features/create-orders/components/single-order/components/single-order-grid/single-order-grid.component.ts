import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridConfiguration, GridColoumnConfig, CellEditConfiguration, GridActionsConfig } from "@app/shared/model";
import { OrdersService, MessagesService } from "@app/shared/services";
import { LoaderService } from "@app/core/services";

@Component({
  selector: 'app-single-order-grid',
  templateUrl: './single-order-grid.component.html',
  styleUrls: ['./single-order-grid.component.scss']
})
export class SingleOrderGridComponent implements OnInit {
  @Output() deleteActionTrigger = new EventEmitter<any>();
  @Input() data: any = [];
  @Input() coloumnConfig: any;
  @Input() gridConfig: any;
  constructor(private orderService: OrdersService, private msgService: MessagesService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.initializeGrid();
  }/**
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
      new GridColoumnConfig({ name: '', title: '#', width: 50, editable: (item) => { return false; }, render: (item, col, i) => { return i + 1; } }),
      new GridColoumnConfig({
        name: 'itemNumber', title: 'Item No.', requiredIcon: true, width: 150, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
            e.target.value == "" ? this.fillGridObjectValues(index, {}) : this.isDuplicateRec(index) ? this.fillGridObjectValues(index, {}) : this.fetchItemsInfo(e.target.value, index, e);
            this.data[index]['itemNumber'] = e.target.value.trim();
          }, displayCellEdit: true, disabled: () => { return false; }, printErrorMsg: (cfg, i, errEl) => {
            return this.itemNumberErrorMessage(cfg, i, errEl);
          }, showErrorMsg: (cfg, i, errEl) => {
            return this.showItemNumberErrorMsg(i, (errEl && errEl.getAttribute('dirty') == "true"));

          }, focus: (cfg: any, index: number) => {

          },
          dirty: false
        })
      }),
      new GridColoumnConfig({ name: 'pack', width: 100, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', subType: 'text', displayCellEdit: true, disabled: () => { return true; } }), title: 'Pack' }),
      new GridColoumnConfig({ name: 'size', width: 100, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'Size' }),
      new GridColoumnConfig({ name: 'description', width: 400, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'Description' }),
      new GridColoumnConfig({ name: 'tixhi', width: 100, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', displayCellEdit: true, disabled: () => { return true; } }), title: 'TixHi' }),
      new GridColoumnConfig({ name: 'upc', width: 150, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({ type: 'input', subType: 'text', displayCellEdit: true, disabled: () => { return true; } }), title: 'UPC' }),
      new GridColoumnConfig({
        name: 'quantity', width: 100, editable: (item) => { return true; }, cellEdit: new CellEditConfiguration({
          type: 'input', blur: (e: any, item: any, cfg: any, index: number) => {
            e.target && e.target.getAttribute('dirty') ? e.target.setAttribute('dirty', "true") : '';
          },
          keyPress: (e) => { return e.charCode >= 48 },
          min: 1,
          printErrorMsg: (cfg, i, errEl) => {
            return this.msgService.fetchMessage(cfg.name, 'required');
          }, showErrorMsg: (cfg, i, errEl) => {
            return this.data[i]['itemNumber'] != '' && !this.showItemNumberErrorMsg(i, true) && this.data[i][cfg.name] == '' && errEl && errEl.getAttribute('dirty') == "true";

          }, subType: 'number', displayCellEdit: true, disabled: (item: any, cfg: any, index: any) => { return this.data[index]['itemNumber'] == '' ? true : this.showItemNumberErrorMsg(index, true); }
        }), title: 'Quantity', requiredIcon: true
      }),
      new GridColoumnConfig({
        name: 'actions',
        title: 'Action', width: 100,
        actionItems: [
          new GridActionsConfig({
            iconClass: 'fa fa-trash', iconTooltip: 'Delete', label: '', click: (item: any, actionCfg: any, index: number) => {
              this.deleteAction(index);
            }
          })
        ]

      })
    ]
  }
  /**
   * deleteAction
   */
  public deleteAction = (i: number) => {
    this.deleteActionTrigger.emit(i);
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
   * fetchItemsInfo
   */
  public fetchItemsInfo = (val: string, index: number, el: any) => {
    this.orderService.getItemDetails(val).subscribe(element => {
      this.loaderService.hide();
      (element['description'] && element['description'].toLowerCase() == "no matching item found") ? this.noItemNumberFound(index, el) : this.fillGridObjectValues(index, element);
      this.data[index]['itemNumber'] = val;
    });
  }
  /**
   * itemNumberErrorMessage 
   */
  public itemNumberErrorMessage = (cfg: any, i: number, el: any): string => {
    console.log(this.data[i][cfg.name])
    return !this.data[i][cfg.name] || this.data[i][cfg.name] == '' ? this.msgService.fetchMessage(cfg.name, 'required') : this.isDuplicateRec(i) ? this.msgService.fetchMessage(cfg.name, 'duplicate') : el.getAttribute('error');
  }
  /**
   * showItemNumberErrorMsg
   */
  public showItemNumberErrorMsg = (i: number, dirty: boolean) => {
    let result = false;
    result = !(this.data[i]['description'] && this.data[i]['description'] != '') && dirty;
    return result ? result : false;
  }
  /**
   * noItemNumberFound
   */
  public noItemNumberFound = (index: number, el: any) => {
    el.target.setAttribute('error', this.msgService.fetchMessage('itemNumber', 'notFound'));
    this.fillGridObjectValues(index, {})
  }

}
