import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import { IWeightSettings } from 'src/app/pages/diary/components/weight/interfaces/weight-settings.interface';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { combineLatest } from 'rxjs';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
@Component({
	selector: 'app-weight-statistic',
	templateUrl: './weight-statistic.component.html',
	styleUrls: ['./weight-statistic.component.scss'],
})
export class WeightStatisticComponent extends BaseComponent implements OnInit {

	public dynamic7days = 0;
	public dynamic30days = 0;

	public imtCategory = 'Норм. вес';

	public progress7days = 0;
	public progress30days = 0;

	public middleWeight = 0;
	public recordMin = 0;
	public recordMax = 0;

	constructor(
		private cd: ChangeDetectorRef,
		private settingsService: SettingsService,
		private weightService: WeightService
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	private initData(): void {
		this.subscriptions.add([
			combineLatest(
				this.weightService.weightList,
				this.weightService.weightSettings,
				this.settingsService.appSettings,
			).subscribe(([weightList, weightSettings, appSettings]: [IWeight[], IWeightSettings, ISettings]) => {
				if (weightList && weightList.length) {
					const lastWeight = weightList[weightList.length - 1];
					this.setIMT(appSettings.growth, lastWeight);
					this.setOther(weightList);
					this.setDynamic(weightList);
					this.setProgress(weightList, weightSettings);
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
	private setProgress(weightList: IWeight[], weightSettings: IWeightSettings): void {
		const arrayOf7Days = this.sortWeightByDate(weightList.filter((item: IWeight) => {
			return moment(item.date) >= moment().subtract(7, 'd');
		}));
		const arrayOf30Days = this.sortWeightByDate(weightList.filter((item: IWeight) => {
			return moment(item.date) >= moment().subtract(30, 'd');
		}));

		const diffItem7days = arrayOf7Days[0];
		const diffItem30days = arrayOf30Days[0];

		if (diffItem7days) {
			this.progress7days = weightSettings.plannedWeight - diffItem7days.weight;
		}
		if (diffItem30days) {
			this.progress30days = weightSettings.plannedWeight - diffItem30days.weight;
		}
	}
	private setDynamic(weightList: IWeight[]): void {
			const arrayOf7Days = this.sortWeightByDate(weightList.filter((item: IWeight) => {
				return moment(item.date) >= moment().subtract(7, 'd');
			}));
			const arrayOf30Days = this.sortWeightByDate(weightList.filter((item: IWeight) => {
				return moment(item.date) >= moment().subtract(30, 'd');
			}));
			const lastItem: IWeight = weightList[weightList.length - 1];
			const diffItem7days = arrayOf7Days[0];
			const diffItem30days = arrayOf30Days[0];
			this.dynamic7days = lastItem.weight - diffItem7days.weight;
			this.dynamic30days = lastItem.weight - diffItem30days.weight;
	}

	private setIMT(growth: number, currentWeight: IWeight) {
	  const imtValue = currentWeight.weight / ((growth / 100) * (growth / 100));
	  if (imtValue < 16.5) {
	    this.imtCategory = 'Крайний недостаток веса';
		} else if (imtValue >= 16.5 && imtValue <= 18.4) {
	    this.imtCategory = 'Недостаток в весе';
		} else if (imtValue >= 18.5 && imtValue <= 24.9) {
			this.imtCategory = 'Нормальный вес';
		} else if (imtValue >= 25 && imtValue <= 30) {
			this.imtCategory = 'Избыточная масса тела';
		} else if (imtValue => 30.1 && imtValue <= 34.9) {
	    this.imtCategory = 'Ожирение (Класс I)';
		} else if (imtValue => 35 && imtValue < 40) {
			this.imtCategory = 'Ожирение (Класс II - тяжелое)';
		} else if (imtValue => 40 ){
			this.imtCategory = 'Ожирение (Класс III - крайне тяжелое)';
		}
	}

	private sortWeightByDate(weightList: IWeight[]): IWeight[] {
		return weightList.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)){
				return  -1;
			} else if (moment(item.date) >= moment(pres.date)){
				return 1;
			} else {
				return 0;
			}
	});
	}
}
