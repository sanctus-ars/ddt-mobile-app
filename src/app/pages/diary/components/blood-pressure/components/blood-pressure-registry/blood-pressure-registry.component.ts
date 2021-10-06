import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { BloodPressureModel } from 'src/app/pages/diary/components/blood-pressure/model/blood-pressure.model';

interface IBloodPressureHistorySortedMonths {
	month: string;
	items: BloodPressureModel[];
}
interface IBloodPressureHistorySorted {
	year: number;
	months: IBloodPressureHistorySortedMonths[];
}

@Component({
	selector: 'app-blood-pressure-registry',
	templateUrl: './blood-pressure-registry.component.html',
	styleUrls: ['./blood-pressure-registry.component.scss'],
})
export class BloodPressureRegistryComponent extends BaseComponent implements OnInit {
	public dataList: IBloodPressureHistorySorted[] = [];
	private newItemUrl = '/pages/diary/blood-pressure/item';

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private dialog: MatDialog,
		private toastService: ToastService,
		private bloodPressureService: BloodPressureService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	public newBloodPressureAction() {
		this.router.navigate([this.newItemUrl, {
			id: null,
			date: null,
			mode: PopupModeEnum.create,
			hand: null,
			pulse: null,
			comment: null,
			wellBeing: null,
			bloodPressureSystolic: null,
			bloodPressureDiastolic: null,
		}]);
	}

	public toggleSubMenu(item: BloodPressureModel): void {
		item.showSubMenu = !item.showSubMenu;
		this.dataList = this.dataList.map((year) => {
			year.months = year.months.map((month) => {
				month.items = month.items.map((x) => {
					if (x.id !== item.id) {
						x.showSubMenu = false;
					}
					return x;
				});
				return month;
			});
			return year;
		});
	}

	public removeBloodPressureAction(item: IBloodPressure): void {
		this.removeBloodPressure(item.id);
	}

	public editBloodPressureAction(row: BloodPressureModel) {
		this.router.navigate([this.newItemUrl, {
			id: row.id,
			date: row.date,
			mode: PopupModeEnum.edit,
			comment: row.comment,
			hand: row.hand,
			pulse: row.pulse,
			wellBeing: row.wellBeing,
			bloodPressureSystolic: row.bloodPressureSystolic,
			bloodPressureDiastolic: row.bloodPressureDiastolic,
		}]);
	}

	private removeBloodPressure(id: string): void {
		this.bloodPressureService.remove(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {
		this.subscriptions.add([
			this.bloodPressureService.list.subscribe((list: IBloodPressure[]) => {
				const weightData = this.sortListByDate(list).map((x) => BloodPressureModel.create(x));
				const resultData: IBloodPressureHistorySorted[] = [];
				if (weightData.length) {
					weightData.forEach((x) => {
						const dateYear = moment(x.date).year();
						const dateMonth = moment(x.date).lang('ru').format('MMMM');
						const ifYearExist = resultData.find((item) => item.year === dateYear);
						if (ifYearExist) {
							const ifMonthExist = ifYearExist.months.find((item) => item.month === dateMonth);
							if (ifMonthExist) {
								ifMonthExist.items.push(x);
							} else {
								ifYearExist.months.push({
									month: dateMonth,
									items: [x],
								});
							}
						} else {
							resultData.push({
								year: dateYear,
								months: [{
									month: dateMonth,
									items: [x],
								}]
							});
						}
						this.dataList = resultData;
					});
				} else {
					this.dataList = [];
				}
			}),
		]);
	}

	private sortListByDate(list: IBloodPressure[]): IBloodPressure[] {
		return list.sort((item, pres) => {
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
