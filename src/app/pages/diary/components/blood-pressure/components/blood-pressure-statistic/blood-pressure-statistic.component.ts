import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-blood-pressure-statistic',
	templateUrl: './blood-pressure-statistic.component.html',
	styleUrls: ['./blood-pressure-statistic.component.scss'],
})
export class BloodPressureStatisticComponent extends BaseComponent implements OnInit {
	public recordMin = 0;
	public recordMax = 0;
	public middleItem: IBloodPressure;

	constructor(
		private cd: ChangeDetectorRef,
		private router: Router,
		private bloodPressureService: BloodPressureService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
	}

	public newItemAction() {
		this.router.navigate(['/pages/diary/blood-pressure/item', {
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
				this.bloodPressureService.list,
			).subscribe(([list]: [IBloodPressure[]]) => {
				if (list && list.length) {
					this.setOther(list);
				}
			})
		]);
	}

	private setOther(weightList: IBloodPressure[]): void {
		const bloodPressureSystolicArray = weightList.map((item) => item.bloodPressureSystolic);
		const bloodPressureDiastolicArray = weightList.map((item) => item.bloodPressureDiastolic);

		const bloodPressureSystolicMiddle = Math.round(bloodPressureSystolicArray.reduce((acum, item) => {
			acum += item;
			return acum;
		}, 0) / bloodPressureSystolicArray.length);

		const bloodPressureDiastolicMiddle = Math.round(bloodPressureDiastolicArray.reduce((acum, item) => {
			acum += item;
			return acum;
		}, 0) / bloodPressureDiastolicArray.length);

		this.recordMax = Math.max(...bloodPressureSystolicArray);
		this.recordMin = Math.min(...bloodPressureDiastolicArray);
		this.middleItem = {
			bloodPressureSystolic: bloodPressureSystolicMiddle,
			bloodPressureDiastolic: bloodPressureDiastolicMiddle
		};
	}
}
