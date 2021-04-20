import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IDoctorVisit } from 'src/app/pages/doctors/interface/doctor.interface';

@Component({
	selector: 'app-doctor-visit-item-dialog',
	templateUrl: './doctor-visit-item-dialog.component.html',
	styleUrls: ['./doctor-visit-item-dialog.component.scss'],
})
export class DoctorVisitItemDialogComponent  extends BaseComponent implements OnInit {

	public idControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public specialtyControl: FormControl = new FormControl();
	public notificationControl: FormControl = new FormControl();

	public doctorVisitFormGroup: FormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
		public dialogRef: MatDialogRef<DoctorVisitItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IDoctorVisit, mode: PopupModeEnum }
	) {
		super(cd);
	}

	ngOnInit() {
		this.initForm();
	}

	public cancelAction(): void {
		this.dialogRef.close();
	}

	public saveAction(): void {
		this.dialogRef.close({
			item: this.doctorVisitFormGroup.value,
			mode: this.data.mode,
		});
	}

	public removeAction(): void {
		this.dialogRef.close({
			item: this.doctorVisitFormGroup.value,
			mode: PopupModeEnum.remove,
		});
	}

	private initForm(): void {
		this.idControl.setValue(!!this.data && !!this.data.item ? this.data.item.id : null, );
		this.timeControl.setValue(!!this.data && !!this.data.item ? this.data.item.time : `09:00`);
		this.dateControl.setValue(!!this.data && !!this.data.item ? this.data.item.date : moment().add(30, 'days').toDate());
		this.commentControl.setValue(!!this.data && !!this.data.item ? this.data.item.comment : '');
		this.specialtyControl.setValue(!!this.data && !!this.data.item ? this.data.item.specialty : '');
		this.notificationControl.setValue(!!this.data && !!this.data.item ? this.data.item.notification : false);

		this.timeControl.setValidators(Validators.required);
		this.dateControl.setValidators(Validators.required);
		this.specialtyControl.setValidators(Validators.required);

		this.doctorVisitFormGroup = new FormGroup({
			id: this.idControl,
			date: this.dateControl,
			time: this.timeControl,
			comment: this.commentControl,
			specialty: this.specialtyControl,
			notification: this.notificationControl,
		});
	}
}
