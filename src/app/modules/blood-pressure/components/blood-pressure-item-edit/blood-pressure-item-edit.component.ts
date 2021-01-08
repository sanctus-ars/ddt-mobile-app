import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-blood-pressure-item-edit',
	templateUrl: './blood-pressure-item-edit.component.html',
	styleUrls: ['./blood-pressure-item-edit.component.scss'],
})
export class BloodPressureItemEditComponent implements OnInit {
	@Input() public bloodPressureItem: BloodPressureModel;
	@Output() public saveBloodPressureEmitter: EventEmitter<BloodPressureModel> = new EventEmitter<BloodPressureModel>();

	public bloodPressureForm: FormGroup;
	public bloodPressureLowControl: FormControl = new FormControl();
	public bloodPressureDataControl: FormControl = new FormControl();
	public bloodPressureHeightControl: FormControl = new FormControl();

	constructor() { }

	ngOnInit() {
		this.buildForm();
	}

	private buildForm(): void {
		this.bloodPressureLowControl.setValue(this.bloodPressureItem.low);
		this.bloodPressureDataControl.setValue(this.bloodPressureItem.data);
		this.bloodPressureHeightControl.setValue(this.bloodPressureItem.height);
		this.bloodPressureForm = new FormGroup({
			low: this.bloodPressureLowControl,
			data: this.bloodPressureDataControl,
			height: this.bloodPressureHeightControl,
		});
	}

	public saveBloodPressureAction() {
		const formValue = this.bloodPressureForm.value;
		const bloodPressureItem: BloodPressureModel = new BloodPressureModel();
		bloodPressureItem.id = this.bloodPressureItem.id;
		bloodPressureItem.low = formValue.low;
		bloodPressureItem.data = formValue.data;
		bloodPressureItem.height = formValue.height;
		bloodPressureItem.userId = this.bloodPressureItem.userId;
		this.saveBloodPressureEmitter.emit(bloodPressureItem);
	}

}
