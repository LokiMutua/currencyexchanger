import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-historical-data-chart',
  templateUrl: './historical-data-chart.component.html',
  styleUrls: ['./historical-data-chart.component.scss']
})
export class HistoricalDataChartComponent implements OnInit {
  public lineChartType: ChartType = 'line';
  dataSetData!: any[];


  @Input() chartData!: any[];
  @Input() chartTitle!: string;
  @Input() toCurrency!: string;
  constructor() {
  }

  ngOnInit(): void {
    this.chartData.map(monthRate => {
      this.dataSetData.push(monthRate.rates[this.toCurrency])
    });
  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.dataSetData,
        label: this.chartTitle,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
  };


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = HistoricalDataChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }
}
