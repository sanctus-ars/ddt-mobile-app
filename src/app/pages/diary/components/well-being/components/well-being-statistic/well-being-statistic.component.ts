import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import * as moment from 'moment';
import { WellBeingService } from 'src/app/pages/diary/components/well-being/services/well-being.service';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';

@Component({
	selector: 'app-well-being-statistic',
	templateUrl: './well-being-statistic.component.html',
	styleUrls: ['./well-being-statistic.component.scss'],
})
export class WellBeingStatisticComponent extends BaseComponent implements OnInit {
	public dynamic7days = 0;
	public dynamic30days = 0;

	public recordMin = 0;
	public recordMax = 0;
	public middleWeight = 0;

	constructor(
		private cd: ChangeDetectorRef,
		private wellBeingService: WellBeingService
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	private initData(): void {
		this.subscriptions.add([
			combineLatest(
				this.wellBeingService.list,
			).subscribe(([wellBeingList]: [IWellBeing[]]) => {
				if (wellBeingList && wellBeingList.length) {
					this.setOther(wellBeingList);
					this.setDynamic(wellBeingList);
				}
			})
		]);
	}

	private setOther(weightList: IWellBeing[]): void {
		const weightArray = weightList.map((item) => item.wellBeing);
	  const weightCount = weightList.length;
	  const weightSum = weightList.reduce((acum: number, item: IWellBeing) => {
			acum += item.wellBeing;
			return acum;
		}, 0);

		this.recordMax = Math.max(...weightArray);
		this.recordMin = Math.min(...weightArray);
		this.middleWeight = Math.round(weightSum / weightCount);
	}

	private setDynamic(weightList: IWellBeing[]): void {
		const arrayOf7Days = this.sortWeightByDate(weightList.filter((item: IWellBeing) => {
			return moment(item.date) >= moment().subtract(7, 'd');
		}));
		const arrayOf30Days = this.sortWeightByDate(weightList.filter((item: IWellBeing) => {
			return moment(item.date) >= moment().subtract(30, 'd');
		}));
		const lastItem: IWellBeing = weightList[weightList.length - 1];
		const diffItem7days = arrayOf7Days[0];
		const diffItem30days = arrayOf30Days[0];
		this.dynamic7days = lastItem.wellBeing - diffItem7days.wellBeing;
		this.dynamic30days = lastItem.wellBeing - diffItem30days.wellBeing;
	}

	private sortWeightByDate(weightList: IWellBeing[]): IWellBeing[] {
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
