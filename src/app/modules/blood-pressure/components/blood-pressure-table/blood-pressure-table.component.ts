import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { $e } from 'codelyzer/angular/styles/chars';

@Component({
	selector: 'app-blood-pressure-table',
	templateUrl: './blood-pressure-table.component.html',
	styleUrls: ['./blood-pressure-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloodPressureTableComponent implements OnInit {
	@Input() public bloodPressureList: BloodPressureModel[] = [];
	@Output() public removeBloodPressureEmitter: EventEmitter<BloodPressureModel> = new EventEmitter<BloodPressureModel>();

	constructor() { }

	ngOnInit() {
	}

	public removeBloodPressureAction($event) {
		this.removeBloodPressureEmitter.emit($event);
	}
}
