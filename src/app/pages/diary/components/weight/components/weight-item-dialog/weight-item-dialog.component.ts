import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';

@Component({
	selector: 'app-weight-item-dialog',
	templateUrl: './weight-item-dialog.component.html',
	styleUrls: ['./weight-item-dialog.component.scss'],
})
export class WeightItemDialogComponent implements OnInit {
  public idControl: FormControl = new FormControl();
  public diffControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public weightControl: FormControl = new FormControl();

	public weightFormGroup: FormGroup = new FormGroup({});
	constructor(
		public dialogRef: MatDialogRef<WeightItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IWeight, mode: PopupModeEnum }
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
    this.weightControl.setValue( !!this.data && !!this.data.item ? this.data.item.weight : 0);

    this.weightFormGroup = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			weight: this.weightControl,
		});
	}
}
