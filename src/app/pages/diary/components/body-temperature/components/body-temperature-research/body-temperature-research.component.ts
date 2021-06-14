import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import * as moment from 'moment';
import { BodyTemperatureItemDialogComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-item-dialog/body-temperature-item-dialog.component';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';

@Component({
	selector: 'app-body-temperature-research',
	templateUrl: './body-temperature-research.component.html',
	styleUrls: ['./body-temperature-research.component.scss'],
})
export class BodyTemperatureResearchComponent extends BaseComponent implements OnInit, AfterViewInit {
	public lastItem: IBodyTemperature;
	public firstItem: IBodyTemperature;
	public lineChart: any;
	public normBodyTemperature = 36.6;
	public bodyTemperatureList: IBodyTemperature[] = [];
	public bodyTemperatureMiddleValue: number = 5;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;


	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private bodyTemperatureService: BodyTemperatureService,
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
			this.bodyTemperatureService.list.subscribe((data: IBodyTemperature[]) => {
				if (data && data.length) {
					this.lastItem = data[data.length - 1];
					this.firstItem = data[0];
					this.bodyTemperatureList = data;
					this.bodyTemperatureMiddleValue = data.reduce((acum, item) => {
						acum += item.temperature;
						return acum;
					}, 0) / data.length;
				}

				this.lineChartMethod();
			})
		]);
	}

 public openDialog() {
		const dialogRef = this.dialog.open(BodyTemperatureItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.create
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IBodyTemperature, mode: PopupModeEnum }) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.bodyTemperatureService.create(result.item).then(async () => {
						await this.toastService.showSuccess('Ваше самочувствие успешно сохранено');
					}).catch(async (error) => {
						await this.toastService.showError(error);
					});
				}
			})
		]);
	}

	lineChartMethod() {
		const dateArray = this.bodyTemperatureList.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const bodyTemperatureList = this.bodyTemperatureList.map((x) => x.temperature);
		const bodyTemperatureNormList = Array(bodyTemperatureList.length).fill(36.6);
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
				labels: [...dateArray],
				datasets: [
					{
						label: 'Норма',
						data: [...bodyTemperatureNormList ],
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
						data: [ ...bodyTemperatureList],
						spanGaps: false,
					}
				]
			}
		});
	}

}
