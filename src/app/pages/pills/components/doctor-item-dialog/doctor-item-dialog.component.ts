import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';

@Component({
	selector: 'app-doctor-item-dialog',
	templateUrl: './doctor-item-dialog.component.html',
	styleUrls: ['./doctor-item-dialog.component.scss'],
})
export class DoctorItemDialogComponent extends BaseComponent implements OnInit {
		constructor(
			private cd: ChangeDetectorRef,
			public dialogRef: MatDialogRef<DoctorItemDialogComponent>,
			@Inject(MAT_DIALOG_DATA) public data: { item: any, mode: PopupModeEnum }
		) {
			super(cd);
		}

		public ngOnInit() {
			this.initForm();
		}

		private initForm(): void {}
}
