import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() page: number; // the current page
  @Input() count: number; // how many total items there are in all pages
  @Input() perPage: number; // how many items we want to show per page
  @Input() pagesToShow: number; // how many pages between next/prev
  @Input() pageLimitArray: any = []; //Number of Records per page

  @Output() goPrev = new EventEmitter<null>(); // Event emitted when click on previous
  @Output() goNext = new EventEmitter<null>(); // Event emitted when click on next 
  @Output() goPage = new EventEmitter<number>(); // Event emitted when click on the page number
  @Output() changeInPerPage = new EventEmitter<number>(); // Event emitted when change in no of records per page

  public currentPageCount: number;
  public selectedItem: any;
  public selectedPageRecord: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.calculateCurrentPageCount();
    this.managePagination();
  }
  /**
   * This method will trigger when any of the input arguments changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['count']) {
      this.count = this.count;
      this.calculateCurrentPageCount();
    }
  }
  /**
   * calculateCurrentPageCount
   */
  public calculateCurrentPageCount = () => {
    this.currentPageCount = (!this.lastPage()) ? this.perPage * this.page : this.count;
  }
  /**
   * getMin
   */
  public getMin = (): number => {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }
  /**
   * getMax
   */
  public getMax = (): number => {
    let max = this.perPage * this.page;
    if (max > this.count) {
      max = this.count;
    }
    return max;
  }
  /**
   * onPage
   */
  public onPage = (n: number): void => {
    this.page = n;
    this.calculateCurrentPageCount();
    this.goPage.emit(n);
  }
  /**
   * onPrev
   */
  public onPrev = (): void => {
    this.page = this.page - 1;
    this.calculateCurrentPageCount();
    this.goPrev.emit();
  }
  /**
   * onNext 
   */
  public onNext = (): void => {
    this.page = this.page + 1;
    this.calculateCurrentPageCount();
    this.goNext.emit();
  }
  /**
   * totalPages
   */
  public totalPages = (): number => {
    return Math.ceil(this.count / this.perPage) || 0;
  }
  /**
   * lastPage
   */
  public lastPage = (): boolean => {
    return this.perPage * this.page >= this.count;
  }
  /**
   * onPageSelect
   */
  public onPageSelect = (...n) => {
    this.perPage = Number(n[0]);
    this.calculateCurrentPageCount();
    this.changeInPerPage.emit(this.perPage);
  }
  /**
   * getPages
   */
  public getPages = (): number[] => {
    const totalPages = this.totalPages();
    const page = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(page);
    const iteration = pagesToShow - 1;
    for (let i = 0; i < iteration; i++) {
      (pages && pages.length < pagesToShow && Math.min.apply(null, pages) > 1) ? pages.push(Math.min.apply(null, pages) - 1) : (pages.length < pagesToShow && Math.max.apply(null, pages) < totalPages) ? pages.push(Math.max.apply(null, pages) + 1) : '';
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

  /**
   * listClick
   */
  listClick(newValue) {
      this.selectedItem = newValue;
      sessionStorage.setItem('selected', newValue);
  }
  /**
   * managePagination
   */
  public managePagination() {
    if(sessionStorage.getItem('selected')) {
      this.selectedItem = sessionStorage.getItem('selected');
    } else {
      this.selectedItem = 1;
    }
    // on Refresh clear selected
    window.onbeforeunload = (ev) => {
      sessionStorage.setItem('selected', "");
    };
    // On url change clear selected
    this.router.events.subscribe((event) => {
      sessionStorage.setItem('selected', "");
    });
  }
}
