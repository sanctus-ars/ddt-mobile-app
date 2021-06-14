import { Component, Inject, OnInit } from '@angular/core';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';

@Component({
	selector: 'app-well-being-item-dialog',
	templateUrl: './well-being-item-dialog.component.html',
	styleUrls: ['./well-being-item-dialog.component.scss'],
})
export class WellBeingItemDialogComponent implements OnInit {
	public idControl: FormControl = new FormControl();
	public diffControl: FormControl = new FormControl();
	public flowControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public wellBeingControl: FormControl = new FormControl();

	public wellBeingForm: FormGroup = new FormGroup({});

	constructor(
		public dialogRef: MatDialogRef<WellBeingItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IWellBeing, mode: PopupModeEnum }
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
		this.flowControl.setValue( WellBeingFlow.wellBeing);
		this.dateControl.setValue(!!this.data && !!this.data.item ? this.data.item.date : new Date());
		this.timeControl.setValue( !!this.data && !!this.data.item ? this.data.item.time : moment(new Date()).format('HH:mm'));
		this.commentControl.setValue( !!this.data && !!this.data.item ? this.data.item.comment : '');
		this.wellBeingControl.setValue( !!this.data && !!this.data.item ? this.data.item.wellBeing : 5);

		this.wellBeingForm = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			flow: this.flowControl,
			time: this.timeControl,
			comment: this.commentControl,
			wellBeing: this.wellBeingControl
		});
	}
}
