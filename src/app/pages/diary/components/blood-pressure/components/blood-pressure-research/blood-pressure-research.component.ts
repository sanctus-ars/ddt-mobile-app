import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-blood-pressure-research',
	templateUrl: './blood-pressure-research.component.html',
	styleUrls: ['./blood-pressure-research.component.scss'],
})
export class BloodPressureResearchComponent implements OnInit, AfterViewInit {
	@ViewChild('lineCanvas') private lineCanvas: ElementRef;
	lineChart: any;
	constructor() { }

	ngOnInit() {}
	ngAfterViewInit() {
		this.lineChartMethod();
	}
	private lineChartMethod() {
		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Дата'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Значение'
            }
          }]
        }

      },
			data: {
				labels: ['10.02', '13.02', '15.02', '17.03', '20.03', '25.03', '01.04', '02.04', '10.04', '15.04', '20.05'],
				datasets: [
					{
						label: 'Нижнее давление',
						borderColor: 'red',
						backgroundColor: 'red',
						fill: false,
						data: [
							60,
							50,
							55,
              70,
              70,
              60,
              50,
              55,
              70,
              70,
						],
					},
					{
						label: 'Верхнее давление',
						borderColor: 'blue',
						backgroundColor: 'blue',
						fill: false,
						data: [
							100,
							120,
							110,
              130,
              150,
              100,
              120,
              110,
              130,
              150
						],
					}
				]
			}
		});
	}

}
