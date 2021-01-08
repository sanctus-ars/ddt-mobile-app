import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';

@Component({
	selector: 'app-blood-pressure-item-new',
	templateUrl: './blood-pressure-item-new.component.html',
	styleUrls: ['./blood-pressure-item-new.component.scss'],
})
export class BloodPressureItemNewComponent implements OnInit {
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
		this.bloodPressureDataControl.setValue(new Date());
		this.bloodPressureForm = new FormGroup({
			low: this.bloodPressureLowControl,
			data: this.bloodPressureDataControl,
			height: this.bloodPressureHeightControl,
		});
	}

	public saveBloodPressureAction() {
		const formValue = this.bloodPressureForm.value;
		const bloodPressureItem: BloodPressureModel = new BloodPressureModel();
		bloodPressureItem.low = formValue.low;
	 bloodPressureItem.data = formValue.data;
	 bloodPressureItem.height = formValue.height;
	 this.saveBloodPressureEmitter.emit(bloodPressureItem);
	}
}
