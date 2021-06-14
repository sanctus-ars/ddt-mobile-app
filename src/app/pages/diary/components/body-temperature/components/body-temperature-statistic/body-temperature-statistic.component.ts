import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';

@Component({
	selector: 'app-body-temperature-statistic',
	templateUrl: './body-temperature-statistic.component.html',
	styleUrls: ['./body-temperature-statistic.component.scss'],
})
export class BodyTemperatureStatisticComponent extends BaseComponent implements OnInit {
	public dynamic7days = 0;
	public dynamic30days = 0;

	public recordMin = 0;
	public recordMax = 0;
	public middleWeight = 0;

	constructor(
		private cd: ChangeDetectorRef,
		private bodyTemperatureService: BodyTemperatureService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	private initData(): void {
		this.subscriptions.add([
			combineLatest(
				this.bodyTemperatureService.list,
			).subscribe(([wellBeingList]: [IBodyTemperature[]]) => {
				if (wellBeingList && wellBeingList.length) {
					this.setOther(wellBeingList);
					this.setDynamic(wellBeingList);
				}
			})
		]);
	}

	private setOther(weightList: IBodyTemperature[]): void {
		const weightArray = weightList.map((item) => item.temperature);
		const weightCount = weightList.length;
		const weightSum = weightList.reduce((acum: number, item: IBodyTemperature) => {
			acum += item.temperature;
			return acum;
		}, 0);

		this.recordMax = Math.max(...weightArray);
		this.recordMin = Math.min(...weightArray);
		this.middleWeight = Math.round(weightSum / weightCount);
	}

	private setDynamic(weightList: IBodyTemperature[]): void {
		const arrayOf7Days = this.sortWeightByDate(weightList.filter((item: IBodyTemperature) => {
			return moment(item.date) >= moment().subtract(7, 'd');
		}));
		const arrayOf30Days = this.sortWeightByDate(weightList.filter((item: IBodyTemperature) => {
			return moment(item.date) >= moment().subtract(30, 'd');
		}));
		const lastItem: IBodyTemperature = weightList[weightList.length - 1];
		const diffItem7days = arrayOf7Days[0];
		const diffItem30days = arrayOf30Days[0];
		this.dynamic7days = +(lastItem.temperature - diffItem7days.temperature).toFixed(2);
		this.dynamic30days = +(lastItem.temperature - diffItem30days.temperature).toFixed(2);
	}

	private sortWeightByDate(weightList: IBodyTemperature[]): IBodyTemperature[] {
		return weightList.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)) {
				return -1;
			} else if (moment(item.date) >= moment(pres.date)) {
				return 1;
			} else {
				return 0;
			}
		});
	}
}
