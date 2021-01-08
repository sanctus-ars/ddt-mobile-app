import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { $e } from 'codelyzer/angular/styles/chars';

@Component({
	selector: 'app-blood-pressure-table',
	templateUrl: './blood-pressure-table.component.html',
	styleUrls: ['./blood-pressure-table.component.scss'],
})
export class BloodPressureTableComponent implements OnInit {
	@Input() public bloodPressureList: BloodPressureModel[] = [];
	@Output() public editBloodPressureEmitter: EventEmitter<BloodPressureModel> = new EventEmitter<BloodPressureModel>();

	constructor() { }

	ngOnInit() {
		this.initData();
	}

	public initData() {
		this.bloodPressureList = [
			{
				id: 0,
				data: new Date(-2),
				userId: 1,
				low: 80,
				height: 120
			},
			{
				id: 1,
				data: new Date(-1),
				userId: 1,
				low: 70,
				height: 110
			},
			{
				id: 2,
				data: new Date(),
				userId: 1,
				low: 90,
				height: 130
			}
		];
	}

	public editBloodPressureAction($event) {
		this.editBloodPressureEmitter.emit($event);
	}

}
