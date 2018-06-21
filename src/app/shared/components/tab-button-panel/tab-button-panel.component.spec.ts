import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabButtonPanelComponent } from './tab-button-panel.component';

describe('TabButtonPanelComponent', () => {
  let component: TabButtonPanelComponent;
  let fixture: ComponentFixture<TabButtonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabButtonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabButtonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
