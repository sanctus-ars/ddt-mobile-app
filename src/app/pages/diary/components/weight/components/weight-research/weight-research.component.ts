import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

@Component({
	selector: 'app-weight-research',
	templateUrl: './weight-research.component.html',
	styleUrls: ['./weight-research.component.scss'],
})
export class WeightResearchComponent implements OnInit, AfterViewInit {
	public lastItem: IWeight;
	public firstItem: IWeight;
	public lineChart: any;
	public normWeight = 0;
	public weightData: IWeight[] = [];
	public weightSettings: IWeightSettings;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;

	constructor(
		private dialog: MatDialog,
		private toastService: ToastService,
		private weightService: WeightService,
		private settingsService: SettingsService,
	) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.initData();
		this.lineChartMethod();
	}
	initData() {
		this.settingsService.getSettings().then((settings: ISettings) => {
			const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(settings.birthday)));
			// tslint:disable-next-line:radix
			const userAge = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;
			this.normWeight = this.weightService.getNormWeight(userAge, settings.growth, settings.sex);
			this.lineChartMethod();
		});
		this.weightService.getSettings().then((settings: IWeightSettings) => {
			if (settings) {
				this.weightSettings = settings;
			}
		});
		this.weightService.getWeights().then((data: IWeight[]) => {
			if (data && data.length) {
				this.lastItem = data[data.length - 1];
				this.firstItem = data[0];
				this.weightData = data;
			}

			this.lineChartMethod();
		});
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(WeightItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {}
		});

		dialogRef.afterClosed().subscribe((result: IWeight) => {
			if (result.weight) {
				this.weightService.addWeight(result).then(async () => {
					this.initData();
					await this.toastService.showSuccess('Ваш вес сохранен');
				}).catch(async (error) => {
					await this.toastService.showError(error);
				});
			}
		});
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
