import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-body-temperature-research',
  templateUrl: './body-temperature-research.component.html',
  styleUrls: ['./body-temperature-research.component.scss'],
})
export class BodyTemperatureResearchComponent implements OnInit, AfterViewInit {

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
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 35.0,
              suggestedMax: 42.0
            }
          }]
        }
      },
      data: {
        labels: ['10.02', '13.02', '15.02', '17.03', '20.03', '25.03', '01.04', '02.04', '10.04', '15.04', '20.05'],
        datasets: [
          {
            label: 'Норма',
            data: [ 36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.6, 36.6 ],
            type: 'line',

          },
          {
            label: 'Температура',
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
            data: [36.2, 36.6, 37.2, 37.2, 37.2, 37.2, 38.2, 39.2, 37.2, 37.2, 37.2, 37.2],
            spanGaps: false,
          }
        ]
      }
    });
  }

}
