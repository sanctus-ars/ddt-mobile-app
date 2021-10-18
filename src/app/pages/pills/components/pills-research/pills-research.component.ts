import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import * as moment from 'moment';
import * as _ from 'lodash';
import { TitleService } from 'src/app/shared/services/title.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pills-research',
	templateUrl: './pills-research.component.html',
	styleUrls: ['./pills-research.component.scss'],
})
export class PillsResearchComponent extends BaseComponent implements AfterViewInit {
	public currentDate: Date = new Date();
	public pillsList: { time: string, list: IPills[] }[] = [];

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private router: Router,
		private titleService: TitleService,
		private pillsService: PillsService,
	) {
		super(cd);
	}

	public ngAfterViewInit() {
		this.initData();
	}

	public clickByAddButtonAction(): void {
		this.router.navigate(['/pages/pills/item', {
			mode: PopupModeEnum.create,
		}]);
	}

	private initData(): void {
		this.subscriptions.add([
			this.pillsService.pillsList.subscribe((list: IPills[]) => {
				if (list && list.length) {
					const currentDatePills: IPills[] = list.filter((item: IPills) => {
						return moment(item.startDate) <= moment(new Date()) || moment(new Date()) <= moment(item.endDate);
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
				}
			}),
		]);
	}
}
