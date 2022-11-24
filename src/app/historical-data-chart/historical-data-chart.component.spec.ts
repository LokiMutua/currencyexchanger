import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalDataChartComponent } from './historical-data-chart.component';

describe('HistoricalDataChartComponent', () => {
  let component: HistoricalDataChartComponent;
  let fixture: ComponentFixture<HistoricalDataChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalDataChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDataChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
