import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { Router } from '@angular/router';
import { ChartDataSets, ChartType } from 'chart.js';

@Component({
	selector: 'app-blood-pressure-research',
	templateUrl: './blood-pressure-research.component.html',
	styleUrls: ['./blood-pressure-research.component.scss'],
})
export class BloodPressureResearchComponent extends BaseComponent implements AfterViewInit {
	public lineChartType: ChartType = 'line';
	public lineChartLabels = [];
	public lineChartPulseData: ChartDataSets[] = [];
	public lineChartPressureData: ChartDataSets[] = [];
	public lineChartColors = [
		{
			borderColor: 'rgba(2, 136, 209, 0.4)',
			backgroundColor: 'rgba(255,0,0,0)',
			pointBorderColor: 'rgba(2, 136, 209, 0.4)',
		}
	];

	public lastItem: IBloodPressure;
	public firstItem: IBloodPressure;
	public bloodPressureList: IBloodPressure[] = [];

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private toastService: ToastService,
		private bloodPressureService: BloodPressureService,
	) {
		super(cd);
	}

	ngAfterViewInit() {
		this.initData();
	}

	public initData() {
		this.subscriptions.add([
			this.bloodPressureService.list.subscribe((data: IBloodPressure[]) => {
				if (data && data.length) {
					this.lastItem = data[data.length - 1];
					this.firstItem = data[0];
					this.bloodPressureList = data;
					this.lineChartMethod();
				}
			})
		]);
	}

	public async createBloodPressureAction() {
		await this.router.navigate(['/pages/diary/blood-pressure/item', {
			mode: PopupModeEnum.create,
		}]);
	}

	private lineChartMethod() {
		const dateArray = this.bloodPressureList.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const bloodPressurePulseList = this.bloodPressureList.map((x) => x.pulse);
		const bloodPressureSystolicList = this.bloodPressureList.map((x) => x.bloodPressureSystolic);
		const bloodPressureDiastolicList = this.bloodPressureList.map((x) => x.bloodPressureDiastolic);

		this.lineChartLabels = [ ...dateArray ];
		this.lineChartPulseData = [
			{
				label: 'Пульс',
				data: [...bloodPressurePulseList ],
				type: 'line',
			},
		];
		this.lineChartPressureData = [
			{
				label: 'Верхнее давление',
				data: [...bloodPressureSystolicList ],
				type: 'line',
			},
			{
				label: 'Нижнее давление',
				data: [...bloodPressureDiastolicList ],
				type: 'line',
			},
		];
	}
}
