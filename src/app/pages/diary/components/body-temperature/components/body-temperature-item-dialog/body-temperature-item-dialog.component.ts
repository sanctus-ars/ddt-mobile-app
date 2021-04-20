import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';

@Component({
	selector: 'app-body-temperature-item-dialog',
	templateUrl: './body-temperature-item-dialog.component.html',
	styleUrls: ['./body-temperature-item-dialog.component.scss'],
})
export class BodyTemperatureItemDialogComponent implements OnInit {
	public idControl: FormControl = new FormControl();
	public diffControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public temperatureControl: FormControl = new FormControl();

	public weightFormGroup: FormGroup = new FormGroup({});
	constructor(
		public dialogRef: MatDialogRef<BodyTemperatureItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IBodyTemperature, mode: PopupModeEnum }
	) {}

	ngOnInit() {
		this.initForm();
	}

	public cancelAction(): void {
		this.dialogRef.close();
	}

	public saveAction(): void {
		this.dialogRef.close({
			item: this.weightFormGroup.value,
			mode: this.data.mode,
		});
	}

	public removeAction(): void {
		this.dialogRef.close({
			item: this.weightFormGroup.value,
			mode: PopupModeEnum.remove,
		});
	}

	private initForm(): void {
		this.idControl.setValue(!!this.data && !!this.data.item ? this.data.item.id : null);
		this.diffControl.setValue(!!this.data && !!this.data.item ? this.data.item.diff : null);
		this.dateControl.setValue(!!this.data && !!this.data.item ? this.data.item.date : new Date());
		this.temperatureControl.setValue( !!this.data && !!this.data.item ? this.data.item.temperature : 36.6);

		this.weightFormGroup = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			temperature: this.temperatureControl,
		});
	}
}
