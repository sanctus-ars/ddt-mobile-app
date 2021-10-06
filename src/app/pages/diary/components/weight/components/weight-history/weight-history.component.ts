import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import * as moment from 'moment';
import { WeightHistoryModel } from 'src/app/pages/diary/components/weight/models/weight-history.model';
import { Router } from '@angular/router';

interface IWeightHistorySortedMonths {
	month: number;
	items: WeightHistoryModel[];
}
interface IWeightHistorySorted {
	year: number;
	months: IWeightHistorySortedMonths[];
}
@Component({
	selector: 'app-weight-history',
	templateUrl: './weight-history.component.html',
	styleUrls: ['./weight-history.component.scss'],
})
export class WeightHistoryComponent extends BaseComponent implements OnInit {
	public dataList: IWeightHistorySorted[];

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private dialog: MatDialog,
		private toastService: ToastService,
		private weightService: WeightService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	public newWeightDialogAction() {
		this.router.navigate(['/pages/diary/weight/item', {
			id: null,
			diff: null,
			date: null,
			mode: PopupModeEnum.create,
			weight: null,
			comment: null,
		}]);
	}

	public toggleSubMenu(item: WeightHistoryModel): void {
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

	public removeWeightAction(item: IWeight): void {
		this.removeWeight(item.id);
	}

	public editWeightDialogAction(row: WeightHistoryModel) {
		this.router.navigate(['/pages/diary/weight/item', {
			id: row.id,
			diff: row.diff,
			date: row.date,
			mode: PopupModeEnum.edit,
			weight: row.weight,
			comment: row.comment,
		}]);
	}

	private removeWeight(id: string): void {
		this.weightService.removeWeight(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {
		this.subscriptions.add([
				this.weightService.weightList.subscribe((list: IWeight[]) => {
					const weightData = this.sortWeightByDate(list).map((x) => WeightHistoryModel.create(x));
					const resultData = [];
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
