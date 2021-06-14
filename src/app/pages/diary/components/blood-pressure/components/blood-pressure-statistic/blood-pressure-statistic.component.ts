import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';

@Component({
	selector: 'app-blood-pressure-statistic',
	templateUrl: './blood-pressure-statistic.component.html',
	styleUrls: ['./blood-pressure-statistic.component.scss'],
})
export class BloodPressureStatisticComponent extends BaseComponent implements OnInit {
	public dynamic7days = 0;
	public dynamic30days = 0;

	public recordMin = 0;
	public recordMax = 0;
	public middleWeight = 0;

	constructor(
		private cd: ChangeDetectorRef,
		private bloodPressureService: BloodPressureService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	private initData(): void {
		this.subscriptions.add([
			combineLatest(
				this.bloodPressureService.list,
			).subscribe(([list]: [IBloodPressure[]]) => {
				if (list && list.length) {
					this.setOther(list);
					this.setDynamic(list);
				}
			})
		]);
	}

	private setOther(weightList: IBloodPressure[]): void {
		const weightArray = weightList.map((item) => item.wellBeing);
		const weightCount = weightList.length;
		const weightSum = weightList.reduce((acum: number, item: IBloodPressure) => {
			acum += item.wellBeing;
			return acum;
		}, 0);

		this.recordMax = Math.max(...weightArray);
		this.recordMin = Math.min(...weightArray);
		this.middleWeight = Math.round(weightSum / weightCount);
	}

	private setDynamic(weightList: IBloodPressure[]): void {
		const arrayOf7Days = this.sortWeightByDate(weightList.filter((item: IBloodPressure) => {
			return moment(item.date) >= moment().subtract(7, 'd');
		}));
		const arrayOf30Days = this.sortWeightByDate(weightList.filter((item: IBloodPressure) => {
			return moment(item.date) >= moment().subtract(30, 'd');
		}));
		const lastItem: IBloodPressure = weightList[weightList.length - 1];
		const diffItem7days = arrayOf7Days[0];
		const diffItem30days = arrayOf30Days[0];
		this.dynamic7days = lastItem.wellBeing - diffItem7days.wellBeing;
		this.dynamic30days = lastItem.wellBeing - diffItem30days.wellBeing;
	}

	private sortWeightByDate(weightList: IBloodPressure[]): IBloodPressure[] {
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
