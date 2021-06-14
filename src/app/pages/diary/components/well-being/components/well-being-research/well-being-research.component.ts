import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WellBeingService } from 'src/app/pages/diary/components/well-being/services/well-being.service';
import * as moment from 'moment';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { MatDialog } from '@angular/material/dialog';
import { WellBeingItemDialogComponent } from 'src/app/pages/diary/components/well-being/components/well-being-item-dialog/well-being-item-dialog.component';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Chart } from 'chart.js';
import { combineLatest } from 'rxjs';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { MatTableDataSource } from '@angular/material/table';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';

@Component({
	selector: 'app-well-being-research',
	templateUrl: './well-being-research.component.html',
	styleUrls: ['./well-being-research.component.scss'],
})
export class WellBeingResearchComponent extends BaseComponent implements AfterViewInit {
	public lineChart: any;
	public wellBeingList: IWellBeing[] = [];
	public wellBeingMiddleValue: number = 5;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private wellBeingService: WellBeingService,
		private dateAndTimeService: DateAndTimeService,
		private bloodPressureService: BloodPressureService,
		private bodyTemperatureService: BodyTemperatureService,
	) {
		super(cd);
	}

	async ngAfterViewInit() {
		this.initData();
		this.lineChartMethod();

	}
	initData() {
		this.subscriptions.add([
			combineLatest([
				this.wellBeingService.list,
				this.bodyTemperatureService.list,
				this.bloodPressureService.list,
			]).subscribe(([wellBeing, bodyTemperature, bloodPressureList]: [IWellBeing[], IBodyTemperature[], IBloodPressure[]]) => {
				const resultArray: IWellBeing[] = [...wellBeing, ...bodyTemperature, ...bloodPressureList];
				const clearArray: IWellBeing[] = this.dateAndTimeService.sortArray(resultArray);
				this.wellBeingList = clearArray;
				this.wellBeingMiddleValue = clearArray.reduce((acum, item) => {
					acum += item.wellBeing;
					return acum;
				}, 0) / clearArray.length;
				this.lineChartMethod();
			}),
		]);
	}
	openDialog() {
		const dialogRef = this.dialog.open(WellBeingItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.create
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IWellBeing, mode: PopupModeEnum }) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.wellBeingService.create(result.item).then(async () => {
						await this.toastService.showSuccess('Ваше самочувствие успешно сохранено');
					}).catch(async (error) => {
						await this.toastService.showError(error);
					});
				}
			})
		]);
	}

	lineChartMethod() {
		const dateArray = this.wellBeingList.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const wellBeingArray = this.wellBeingList.map((x) => x.wellBeing);

		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'bar',
			options: {
				scales: {
					yAxes: [{
						ticks: {
							suggestedMin: -1,
							suggestedMax: 10
						}
					}]
				}
			},
			data: {
				labels: [...dateArray],
				datasets: [
					{
						label: 'Самочувствие',
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
						data: [...wellBeingArray],
						spanGaps: false,
					}
				]
			}
		});
	}
}
