import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { WeightItemDialogComponent } from 'src/app/pages/diary/components/weight/components/weight-item-dialog/weight-item-dialog.component';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import * as moment from 'moment';
import { IWeightSettings } from 'src/app/pages/diary/components/weight/interfaces/weight-settings.interface';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
	selector: 'app-weight-research',
	templateUrl: './weight-research.component.html',
	styleUrls: ['./weight-research.component.scss'],
})
export class WeightResearchComponent extends BaseComponent implements AfterViewInit {
	public lastItem: IWeight;
	public firstItem: IWeight;
	public lineChart: any;
	public normWeight = 0;
	public weightData: IWeight[] = [];
	public weightSettings: IWeightSettings;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private titleService: TitleService,
		private toastService: ToastService,
		private weightService: WeightService,
		private settingsService: SettingsService,
	) {
		super(cd);
	}

	ngAfterViewInit() {
		this.initData();
		this.lineChartMethod();
	}

	initData() {
		this.titleService.setTitle('Обзор веса');
		this.subscriptions.add([
			this.settingsService.appSettings.subscribe((settings: ISettings) => {
				if (settings) {
					const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(settings.birthday)));
					const userAge = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;
					this.normWeight = this.weightService.getNormWeight(userAge, settings.growth, settings.sex);
					this.lineChartMethod();
				}
			}),
			this.weightService.weightSettings.subscribe((settings: IWeightSettings) => {
				if (settings) {
					this.weightSettings = settings;
				}
			}),
			this.weightService.weightList.subscribe((data: IWeight[]) => {
				if (data && data.length) {
					this.lastItem = data[data.length - 1];
					this.firstItem = data[0];
					this.weightData = data;
				}

				this.lineChartMethod();
			})
		]);
	}
	openDialog() {
		const dialogRef = this.dialog.open(WeightItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.create
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IWeight, mode: PopupModeEnum }) => {
				if (result && result.item && result.item.weight && result.mode === PopupModeEnum.create) {
					await this.weightService.addWeight(result.item).then(async () => {
						await this.toastService.showSuccess('Ваш вес сохранен');
					}).catch(async (error) => {
						await this.toastService.showError(error);
					});
				}
			})
		]);
	}

	lineChartMethod() {
		const dateArray = this.weightData.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const weightArray = this.weightData.map((x) => x.weight);
		const normArray = new Array(dateArray.length).fill(this.normWeight);

		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'bar',
			options: {
				scales: {
					yAxes: [{
						ticks: {
							suggestedMin: 0,
							suggestedMax: 200.0
						}
					}]
				}
			},
			data: {
				labels: [...dateArray],
				datasets: [
          {
            label: 'Норма',
            data: [ ...normArray ],
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
						data: [...weightArray],
						spanGaps: false,
					}
				]
			}
		});
	}
}
