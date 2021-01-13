import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';

@Component({
	selector: 'app-blood-pressure-chart',
	templateUrl: './blood-pressure-chart.component.html',
	styleUrls: ['./blood-pressure-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloodPressureChartComponent implements OnInit, OnChanges {
	@Input() public bloodPressureList: BloodPressureModel[];
	public chartConfig: GoogleChartInterface;

	constructor(
		private cd: ChangeDetectorRef,
	) { }

	ngOnInit() {
		this.initData();
	}

	ngOnChanges(changes) {
		if (changes.bloodPressureList && changes.bloodPressureList?.currentValue) {
			this.bloodPressureList = changes.bloodPressureList?.currentValue;
			this.initData();
		}
	}

	public initData() {
		const dataTableValue = this.bloodPressureList.map(( item) => {
			return [item.date, item.lowPressure, item.heightPressure];
		});
		this.chartConfig = {
			chartType: 'LineChart',
			dataTable: [[Date, 'Low', 'Height'],
				...dataTableValue
			],
			// firstRowIsData: true,
			options: {
				allowHtml: true,
				height: '100%',
				width: '100%',
				hAxis: {
					title: 'Date'
				},
				vAxis: {
					title: 'Blood Pressure'
				},
				backgroundColor: '#fff'
			},
		};
		this.cd.markForCheck();
	}


}
