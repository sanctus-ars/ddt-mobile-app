import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartDataSets, ChartType } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { TitleService } from 'src/app/shared/services/title.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { IIMT } from 'src/app/pages/diary/components/weight/interfaces/imt.interface';
import { IMTCategoryEnum } from 'src/app/pages/diary/components/weight/enum/imt.enum';

@Component({
	selector: 'app-weight-research',
	templateUrl: './weight-research.component.html',
	styleUrls: ['./weight-research.component.scss'],
})
export class WeightResearchComponent extends BaseComponent implements AfterViewInit {
	public imt: IIMT = {};
	public imtCategory = IMTCategoryEnum;
	public lastItem: IWeight;
	public firstItem: IWeight;
	public lineChart: any;
	public normWeight = 0;
	public weightData: IWeight[] = [];
	public appSettings: ISettings;

	public chartType: ChartType = 'bar';
	public chartLabels = [];
	public chartData: ChartDataSets[] = [];
	public chartColors = [
		{
			borderColor: 'rgba(2, 136, 209, 0.4)',
			backgroundColor: 'rgba(255,0,0,0)',
			pointBorderColor: 'rgba(2, 136, 209, 0.4)',
		}
	];

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private router: Router,
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
			combineLatest(
				this.weightService.weightList,
				this.settingsService.appSettings,
			).subscribe(([weightList, appSettings]: [IWeight[], ISettings]) => {
				if (appSettings) {
					const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(appSettings.birthday)));
					const userAge = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;
					this.normWeight = this.weightService.getNormWeight(userAge, appSettings.growth, appSettings.sex);
					this.appSettings = appSettings;
				} else {
					this.toastService.showError('Настройки приложения не заполнены. Некоторые функции могут работать не правильно.');
				}
				if (weightList && weightList.length) {
					const weights = this.sortWeightByDate(weightList);
					this.lastItem = weights[weights.length - 1];
					this.firstItem = weights[0];
					this.weightData = weights;
				} else {
					this.lastItem = null;
					this.firstItem = null;
					this.weightData = [];
				}

				this.lineChartMethod();

				if (appSettings && appSettings.growth && weightList && weightList[weightList.length - 1]) {
					this.imt = this.weightService.getIMT(appSettings.growth, weightList[weightList.length - 1].weight);
				}
			}),
		]);
	}
	createWeightItemAction() {
		this.router.navigate(['/pages/diary/weight/item', {
			id: null,
			diff: null,
			date: null,
			mode: PopupModeEnum.create,
			weight: null,
			comment: null,
		}]);
	}

	lineChartMethod() {
		const dateArray = this.weightData.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const weightArray = this.weightData.map((x) => x.weight);
		this.chartLabels = [...dateArray];
		this.chartData = [{
			label: 'Вес',
			data: [...weightArray ],
			type: 'line',
		}];
	}

	private sortWeightByDate(weightList: IWeight[]): IWeight[] {
		return weightList.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)) {
				return 1;
			} else if (moment(item.date) >= moment(pres.date)) {
				return -1;
			} else {
				return 0;
			}
		});
	}
}
