import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-urine-research',
  templateUrl: './urine-research.component.html',
  styleUrls: ['./urine-research.component.scss'],
})
export class UrineResearchComponent implements OnInit, AfterViewInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  lineChart: any;
  constructor() { }

  ngOnInit() {}
  ngAfterViewInit() {
    this.lineChartMethod();
  }
  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['10.02', '13.02', '15.02', '17.03', '20.03', '25.03', '01.04', '02.04', '10.04', '15.04', '20.05'],
        datasets: [
          {
            label: 'Норма',
            data: [ 1500, 1500, 1500, 1500, 1500, 1500, 1500 ],
            type: 'line',

          },
          {
            label: 'Вес',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#3f51b5',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1300, 1600, 1500, 1500, 1600, 1700, 1800, 1900],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
