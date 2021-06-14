import { Component, Inject, OnInit } from '@angular/core';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { HandEnum } from 'src/app/pages/diary/components/blood-pressure/enum/hand.enum';

@Component({
	selector: 'app-blood-pressure-item-dialog',
	templateUrl: './blood-pressure-item-dialog.component.html',
	styleUrls: ['./blood-pressure-item-dialog.component.scss'],
})
export class BloodPressureItemDialogComponent implements OnInit {
	public idControl: FormControl = new FormControl();
	public diffControl: FormControl = new FormControl();
	public flowControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public handControl: FormControl = new FormControl();
	public pulseControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public wellBeingControl: FormControl = new FormControl();
	public arrhythmiaControl: FormControl = new FormControl();
	public bloodPressureSystolicControl: FormControl = new FormControl();
	public bloodPressureDiastolicControl: FormControl = new FormControl();

	public wellBeingForm: FormGroup = new FormGroup({});

	constructor(
		public dialogRef: MatDialogRef<BloodPressureItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IBloodPressure, mode: PopupModeEnum }
	) { }

	ngOnInit() {
		this.initForm();
	}

	public cancelAction(): void {
		this.dialogRef.close();
	}

	public saveAction(): void {
		this.dialogRef.close({
			item: this.wellBeingForm.value,
			mode: this.data.mode,
		});
	}

	public removeAction(): void {
		this.dialogRef.close({
			item: this.wellBeingForm.value,
			mode: PopupModeEnum.remove,
		});
	}

	private initForm(): void {
		this.idControl.setValue(!!this.data && !!this.data.item ? this.data.item.id : null);
		this.diffControl.setValue(!!this.data && !!this.data.item ? this.data.item.diff : null);
		this.flowControl.setValue( !!this.data && !!this.data.item ? this.data.item.flow : WellBeingFlow.bloodPressure);
		this.dateControl.setValue(!!this.data && !!this.data.item ? this.data.item.date : new Date());
		this.timeControl.setValue( !!this.data && !!this.data.item ? this.data.item.time : moment(new Date()).format('HH:mm'));
		this.handControl.setValue(!!this.data && !!this.data.item ? this.data.item.hand : HandEnum.left);
		this.pulseControl.setValue(!!this.data && !!this.data.item ? this.data.item.pulse : 65);
		this.commentControl.setValue( !!this.data && !!this.data.item ? this.data.item.comment : '');
		this.wellBeingControl.setValue( !!this.data && !!this.data.item ? this.data.item.wellBeing : 5);
		this.arrhythmiaControl.setValue(!!this.data && !!this.data.item ? this.data.item.arrhythmia : false);
		this.bloodPressureSystolicControl.setValue(!!this.data && !!this.data.item ? this.data.item.bloodPressureSystolic : 120);
		this.bloodPressureDiastolicControl.setValue(!!this.data && !!this.data.item ? this.data.item.bloodPressureDiastolic : 80);


		this.wellBeingForm = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			flow: this.flowControl,
			time: this.timeControl,
			hand: this.handControl,
			pulse: this.pulseControl,
			comment: this.commentControl,
			wellBeing: this.wellBeingControl,
			arrhythmia: this.arrhythmiaControl,
			bloodPressureSystolic: this.bloodPressureSystolicControl,
			bloodPressureDiastolic: this.bloodPressureDiastolicControl

		});
	}
}
