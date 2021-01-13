import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { BloodPressureService } from 'src/app/modules/blood-pressure/services/blood-pressure.service';

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
			date: this.bloodPressureDataControl,
			lowPressure: this.bloodPressureLowControl,
			heightPressure: this.bloodPressureHeightControl,
		});
	}

	public saveBloodPressureAction() {
		const formValue = this.bloodPressureForm.value;
		const bloodPressureItem: BloodPressureModel = new BloodPressureModel();
		bloodPressureItem.date = formValue.date;
		bloodPressureItem.lowPressure = formValue.lowPressure;
	 	bloodPressureItem.heightPressure = formValue.heightPressure;
		this.bloodPressureForm.reset();
	 	this.saveBloodPressureEmitter.emit(bloodPressureItem);
	}


}
