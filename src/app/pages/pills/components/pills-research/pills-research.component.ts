import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PillsItemDialogComponent } from 'src/app/pages/pills/components/pills-item-dialog/pills-item-dialog.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
	selector: 'app-pills-research',
	templateUrl: './pills-research.component.html',
	styleUrls: ['./pills-research.component.scss'],
})
export class PillsResearchComponent extends BaseComponent implements OnInit, OnDestroy {
	public currentDate: Date = new Date();
	public pillsList: { time: string, list: IPills[] }[] = [];

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private titleService: TitleService,
		private pillsService: PillsService,
		private toastService: ToastService,
	) {
		super(cd);
	}

	public ngOnInit() {
		this.initData();
	}

	public ngOnDestroy() {
		this.titleService.resetTitle();
		super.ngOnDestroy();
	}

	public clickByAddButtonAction(): void {
		this.openDialog(PopupModeEnum.create);
	}

	public pillEditAction(item: IPills): void {
	  this.openDialog(PopupModeEnum.edit, item);
	}

	private async editPill(item: IPills): Promise<void> {
		return this.pillsService.editPills(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием лекарства успешно отредактирован');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private async addPill(item: IPills): Promise<void> {
		return this.pillsService.addPill(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием лекарства успешно добавлен');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private removePill(id: string): Promise<void> {
		return this.pillsService.removePill(id)
			.then(async () => {
				await this.toastService.showSuccess('Лекарство успешно удалено');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private initData(): void {
		this.titleService.setTitle(`Сегодня ${moment(this.currentDate).format('DD.MM.yyyy')}`);
		this.subscriptions.add([
			this.pillsService.pillsList.subscribe((list: IPills[]) => {
				const currentDatePills: IPills[] = list.filter((item: IPills) => {
					 return moment(item.startDate) <= moment(new Date()) && item.indefinite || moment(new Date()) <= moment(item.endDate);
				});
				const sortedPills: IPills[] = currentDatePills.sort((a: IPills, b: IPills) => {
					if (moment().add(a.time, 'hours') < moment().add(b.time, 'hours')) {
						return -1;
					} else  if (moment().add(a.time, 'hours') > moment().add(b.time, 'hours')) {
						return 1;
					} else {
						return  0;
					}
				});
				const result = _.groupBy(sortedPills, 'time');
				const timesList = Object.keys(result);
				const clearResult = timesList.reduce((accum: { time: string, list: IPills[]}[], time: string) => {
					accum.push({
							time,
							list: result[time],
					});
					return accum;
				}, []);
		  	this.pillsList = clearResult;
			}),
		]);
	}

	private openDialog(mode: PopupModeEnum, item?: IPills): void {
		const dialogRef = this.dialog.open(PillsItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				item,
				mode
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IPills, mode: PopupModeEnum }) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.addPill(result.item);
				} else if (result && result.item && result.mode === PopupModeEnum.remove) {
					await this.removePill(result.item.id);
				} else if (result && result.item && result.mode === PopupModeEnum.edit){
					await this.editPill(result.item);
				}
			})
		]);
	}
}
