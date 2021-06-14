import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { IUrine } from 'src/app/pages/diary/components/urine/interfaces/urine.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';
import { UrineStatusEnum } from 'src/app/pages/diary/components/urine/enums/urine-status.enum';
import * as moment from 'moment';

@Component({
	selector: 'app-urine-item-dialog',
	templateUrl: './urine-item-dialog.component.html',
	styleUrls: ['./urine-item-dialog.component.scss'],
})
export class UrineItemDialogComponent implements OnInit {
	public idControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public diffControl: FormControl = new FormControl();
	public painControl: FormControl = new FormControl();
	public flowControl: FormControl = new FormControl();
	public volumeControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public wellBeingControl: FormControl = new FormControl();
	public uriStatusControl: FormControl = new FormControl();
	public incontinenceControl: FormControl = new FormControl();
	public urgeIntensityControl: FormControl = new FormControl();

	public urineForm: FormGroup = new FormGroup({});

	constructor(
		public dialogRef: MatDialogRef<UrineItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IUrine, mode: PopupModeEnum }
	) { }

	ngOnInit() {
		this.initForm();
	}

	public cancelAction(): void {
		this.dialogRef.close();
	}

	public saveAction(): void {
		this.dialogRef.close({
			item: this.urineForm.value,
			mode: this.data.mode,
		});
	}

	public removeAction(): void {
		this.dialogRef.close({
			item: this.urineForm.value,
			mode: PopupModeEnum.remove,
		});
	}

	private initForm(): void {

		const ifItemExist: boolean = !!this.data && !!this.data.item;

		this.idControl.setValue(ifItemExist ? this.data.item.id : null);
		this.dateControl.setValue(ifItemExist ? this.data.item.date : new Date());
		this.timeControl.setValue(ifItemExist ? this.data.item.time : moment(new Date()).format('HH:mm'));
		this.diffControl.setValue(ifItemExist ? this.data.item.diff : null);
		this.painControl.setValue( ifItemExist ? this.data.item.pain : 0);
		this.flowControl.setValue(ifItemExist ? this.data.item.flow : WellBeingFlow.urine);
		this.volumeControl.setValue(ifItemExist ? this.data.item.volume : 100);
		this.commentControl.setValue(ifItemExist ? this.data.item.comment : '');
		this.wellBeingControl.setValue(ifItemExist ? this.data.item.wellBeing : 5);
		this.uriStatusControl.setValue(ifItemExist ? this.data.item.uriStatus : UrineStatusEnum.wake);
	  this.incontinenceControl.setValue(ifItemExist ? this.data.item.incontinence : 0);
		this.urgeIntensityControl.setValue(ifItemExist ? this.data.item.urgeIntensity : 0);

		this.urineForm = new FormGroup({
			id: this.idControl,
			date: this.dateControl,
			time: this.timeControl,
			diff: this.diffControl,
			pain: this.painControl,
			flow: this.flowControl,
			volume: this.volumeControl,
			comment: this.commentControl,
			wellBeing: this.wellBeingControl,
			uriStatus: this.uriStatusControl,
			incontinence: this.incontinenceControl,
			urgeIntensity: this.urgeIntensityControl,
		});
	}

}
