import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';

@Component({
	selector: 'app-blood-pressure-chart',
	templateUrl: './blood-pressure-chart.component.html',
	styleUrls: ['./blood-pressure-chart.component.scss'],
})
export class BloodPressureChartComponent implements OnInit {
	@Input() public chartData: BloodPressureModel[] = [];
	public chartConfig: GoogleChartInterface;

	constructor() { }

	ngOnInit() {
		this.initData();
	}

	public initData() {
		this.chartConfig = {
			chartType: 'LineChart',
			dataTable: [[Date, 'Low', 'Height'],
				[new Date(-10), 80, 120],
				[new Date(-9), 70, 110],
				[new Date(-8), 90, 120],
				[new Date(-7), 60, 100],
				[new Date(-6), 70, 120],
				[new Date(-5), 80, 110],
			],
			// firstRowIsData: true,
			options: {
				height: '100%',
				width: '100%',
				hAxis: {
					title: 'Data'
				},
				vAxis: {
					title: 'Blood Pressure'
				},
				backgroundColor: '#fff'
			},
		};
	}


}
