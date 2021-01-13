import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { BloodPressureService } from 'src/app/modules/blood-pressure/services/blood-pressure.service';

@Component({
	selector: 'app-blood-pressure',
	templateUrl: './blood-pressure.component.html',
	styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit {
	public bloodPressureList: BloodPressureModel[] = [];
	constructor(
		private bloodPressureService: BloodPressureService,
		private cd: ChangeDetectorRef,
	) { }

	public ngOnInit() {
		this.initData();
	}

	private initData() {
		this.bloodPressureService.getAll().subscribe((result) => {
			this.bloodPressureList = result;
			this.cd.markForCheck();
		});
	}

	public removeBloodPressureAction($event: BloodPressureModel) {
		this.bloodPressureList = this.bloodPressureList.filter(x => x.bloodPressure_id !== $event.bloodPressure_id);
		this.bloodPressureService.remove($event.bloodPressure_id).subscribe();
		this.cd.markForCheck();
	}

	public saveBloodPressureAction($event: BloodPressureModel) {
		this.bloodPressureList = this.bloodPressureList.reduce((acum, item) => {
			acum.push(item);
			return acum;
		}, [$event]);
		this.bloodPressureService.create($event).subscribe();
		this.cd.markForCheck();
	}
}
