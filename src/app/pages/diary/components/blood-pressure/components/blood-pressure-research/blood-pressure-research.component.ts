import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { BodyTemperatureItemDialogComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-item-dialog/body-temperature-item-dialog.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { BloodPressureItemDialogComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-item-dialog/blood-pressure-item-dialog.component';

@Component({
	selector: 'app-blood-pressure-research',
	templateUrl: './blood-pressure-research.component.html',
	styleUrls: ['./blood-pressure-research.component.scss'],
})
export class BloodPressureResearchComponent extends BaseComponent implements OnInit, AfterViewInit {
	public lastItem: IBloodPressure;
	public firstItem: IBloodPressure;
	public lineChart: any;
	public normBloodPressure: IBloodPressure = {
		pulse: 70,
		bloodPressureSystolic: 80,
		bloodPressureDiastolic: 120,
	};
	public bloodPressureList: IBloodPressure[] = [];
	public bloodPressureMiddleValue: IBloodPressure;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;


	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private bloodPressureService: BloodPressureService,
	) {
		super(cd);
	}

	ngOnInit() {}
	ngAfterViewInit() {
		this.initData();
		this.lineChartMethod();
	}

	public initData() {
		this.subscriptions.add([
			this.bloodPressureService.list.subscribe((data: IBloodPressure[]) => {
				if (data && data.length) {
					this.lastItem = data[data.length - 1];
					this.firstItem = data[0];
					this.bloodPressureList = data;
				}

				this.lineChartMethod();
			})
		]);
	}

	public openDialog() {
		const dialogRef = this.dialog.open(BloodPressureItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.create
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IBloodPressure, mode: PopupModeEnum }) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.bloodPressureService.create(result.item).then(async () => {
						await this.toastService.showSuccess('Ваше самочувствие успешно сохранено');
					}).catch(async (error) => {
						await this.toastService.showError(error);
					});
				}
			})
		]);
	}

	lineChartMethod() {
		const dateArray = this.bloodPressureList.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const bloodPressurePulseList = this.bloodPressureList.map((x) => x.pulse);
		const bloodPressureSystolicList = this.bloodPressureList.map((x) => x.bloodPressureSystolic);
		const bloodPressureDiastolicList = this.bloodPressureList.map((x) => x.bloodPressureDiastolic);

		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
			options: {
				scales: {
					yAxes: [{
						ticks: {
							suggestedMin: 30,
							suggestedMax: 250
						}
					}]
				}
			},
			data: {
				labels: [...dateArray],
				datasets: [
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
					{
						label: 'Пульс',
						data: [...bloodPressurePulseList ],
						type: 'line',
					},
				]
			}
		});
	}

}
