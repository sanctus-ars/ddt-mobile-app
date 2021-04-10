import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import * as moment from 'moment';

@Component({
	selector: 'app-pills-item-dialog',
	templateUrl: './pills-item-dialog.component.html',
	styleUrls: ['./pills-item-dialog.component.scss'],
})
export class PillsItemDialogComponent extends BaseComponent implements OnInit {

	public idControl: FormControl = new FormControl();
	public nameControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public countControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public endDateControl: FormControl = new FormControl();
	public startDateControl: FormControl = new FormControl();
	public indefiniteControl: FormControl = new FormControl();

	public pillsFormGroup: FormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
		public dialogRef: MatDialogRef<PillsItemDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { item: IPills, mode: PopupModeEnum }
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
			item: this.pillsFormGroup.value,
			mode: this.data.mode,
		});
	}

	public removeAction(): void {
		this.dialogRef.close({
			item: this.pillsFormGroup.value,
			mode: PopupModeEnum.remove,
		});
	}

	private initForm(): void {
    this.idControl.setValue(!!this.data && !!this.data.item ? this.data.item.id : null, );
    this.nameControl.setValue( !!this.data && !!this.data.item ? this.data.item.name : '');
    this.timeControl.setValue(!!this.data && !!this.data.item ? this.data.item.time : `09:00`);
    this.countControl.setValue( !!this.data && !!this.data.item ? this.data.item.count : 1);
    this.commentControl.setValue( !!this.data && !!this.data.item ? this.data.item.comment : '');
    this.endDateControl.setValue( !!this.data && !!this.data.item ? this.data.item.endDate : moment().add(30, 'days').toDate());
    this.startDateControl.setValue( !!this.data && !!this.data.item ? this.data.item.startDate : moment().toDate());
    this.indefiniteControl.setValue( !!this.data && !!this.data.item ? this.data.item.indefinite : false);

    if (this.data?.item?.indefinite) {
    	this.endDateControl.disable();
		}

    this.nameControl.setValidators(Validators.required);
		this.timeControl.setValidators(Validators.required);
		this.countControl.setValidators(Validators.required);
		this.startDateControl.setValidators(Validators.required);

		this.pillsFormGroup = new FormGroup({
			id: this.idControl,
			name: this.nameControl,
			time: this.timeControl,
			count: this.countControl,
			comment: this.commentControl,
			endDate: this.endDateControl,
			startDate: this.startDateControl,
			indefinite: this.indefiniteControl,
		});

		this.subscriptions.add([
			this.indefiniteControl.valueChanges.subscribe((indefinite: boolean) => {
					if (indefinite) {
						this.endDateControl.disable();
						this.endDateControl.setValue(null);
					} else {
						this.endDateControl.enable();
					}
				})
		])
	}

}
