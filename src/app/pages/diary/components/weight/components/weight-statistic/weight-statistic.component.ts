import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { combineLatest } from 'rxjs';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { Router } from '@angular/router';
@Component({
	selector: 'app-weight-statistic',
	templateUrl: './weight-statistic.component.html',
	styleUrls: ['./weight-statistic.component.scss'],
})
export class WeightStatisticComponent extends BaseComponent implements OnInit {
	public lastWeight: IWeight;
	public firstWeight: IWeight;
	public normWeight = 0;
	public appSettings: ISettings;

	public dynamic7days = 0;
	public dynamic30days = 0;
	public dynamic90days = 0;

	public imtCategory = 'Норм. вес';

	public progress7days = 0;
	public progress30days = 0;
	public progress90days = 0;

	public middleWeight = 0;
	public recordMin = 0;
	public recordMax = 0;

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private settingsService: SettingsService,
		private weightService: WeightService
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	public newWeightAction() {
		this.router.navigate(['/pages/diary/weight/item', {
			id: null,
			diff: null,
			date: null,
			mode: PopupModeEnum.create,
			weight: null,
			comment: null,
		}]);
	}

	private initData(): void {
		this.subscriptions.add([
			combineLatest(
				this.weightService.weightList,
				this.settingsService.appSettings,
			).subscribe(([weightList, appSettings]: [IWeight[], ISettings]) => {
				if (weightList && weightList.length) {
					const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(appSettings.birthday)));
					const userAge = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;

					const weights = this.sortWeightByDate(weightList);
					this.lastWeight = weights[weights.length - 1];
					this.normWeight = this.weightService.getNormWeight(userAge, appSettings.growth, appSettings.sex);
					this.firstWeight = weights[0];
					this.appSettings = appSettings;

					this.setIMT(appSettings.growth, this.lastWeight);
					this.setOther(weights);
					this.setDynamic(weights);
					this.setProgress(weights, appSettings);
				}
			})
		]);
	}

	private setOther(weightList: IWeight[]): void {
			const weightArray = weightList.map((item) => item.weight);
			const weightCount = weightList.length;
			const weightSum = weightList.reduce((acum: number, item: IWeight) => {
				acum += item.weight;
				return acum;
			}, 0);

			this.recordMax = Math.max(...weightArray);
			this.recordMin = Math.min(...weightArray);
			this.middleWeight = Math.round(weightSum / weightCount);
	}
	private setProgress(weightList: IWeight[], appSettings: ISettings): void {
		const arrayOf7Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
			return moment(item.date) >= moment().subtract(7, 'd');
		});
		const arrayOf30Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
			return moment(item.date) >= moment().subtract(30, 'd');
		});
		const arrayOf90Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
			return moment(item.date) >= moment().subtract(90, 'd');
		});

		const diffItem7days = arrayOf7Days[arrayOf7Days.length - 1];
		const diffItem30days = arrayOf30Days[arrayOf30Days.length - 1];
		const diffItem90days = arrayOf90Days[arrayOf90Days.length - 1];

		if (diffItem7days) {
			this.progress7days = appSettings.plannedWeight - diffItem7days.weight;
		}
		if (diffItem30days) {
			this.progress30days = appSettings.plannedWeight - diffItem30days.weight;
		}
		if (diffItem90days) {
			this.progress90days = appSettings.plannedWeight - diffItem90days.weight;
		}
	}
	private setDynamic(weightList: IWeight[]): void {
			const arrayOf7Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
				return moment(item.date) >= moment().subtract(7, 'd');
			});
			const arrayOf30Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
				return moment(item.date) >= moment().subtract(30, 'd');
			});
			const arrayOf90Days = this.sortWeightByDate(weightList).filter((item: IWeight) => {
				return moment(item.date) >= moment().subtract(90, 'd');
			});
			const lastItem: IWeight = weightList[weightList.length - 1];
			const diffItem7days = arrayOf7Days[arrayOf7Days.length - 1];
			const diffItem30days = arrayOf30Days[arrayOf30Days.length - 1];
			const diffItem90days = arrayOf90Days[arrayOf90Days.length - 1];

			this.dynamic7days = diffItem7days ? lastItem.weight - diffItem7days.weight : 0;
			this.dynamic30days = diffItem30days ? lastItem.weight - diffItem30days.weight : 0;
			this.dynamic90days = diffItem90days ? lastItem.weight - diffItem90days.weight : 0;
	}

	private setIMT(growth: number, currentWeight: IWeight) {
	  const imt = this.weightService.getIMT(growth, currentWeight.weight);
	  this.imtCategory = imt.description;
	}

	private sortWeightByDate(weightList: IWeight[]): IWeight[] {
		return weightList.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)){
				return  1;
			} else if (moment(item.date) >= moment(pres.date)){
				return -1;
			} else {
				return 0;
			}
	});
	}
}
