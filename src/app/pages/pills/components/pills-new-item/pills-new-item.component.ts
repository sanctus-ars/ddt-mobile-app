import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
	selector: 'app-pills-new-item',
	templateUrl: './pills-new-item.component.html',
	styleUrls: ['./pills-new-item.component.scss'],
})
export class PillsNewItemComponent extends BaseComponent implements OnInit {

	public idControl: FormControl = new FormControl();
	public nameControl: FormControl = new FormControl();

	public pillsFormGroup: FormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initForm();
	}

	public cancelAction(): void {
		// this.dialogRef.close();
	}

	public saveAction(): void {
	/*	this.dialogRef.close({
			item: this.pillsFormGroup.value,
			mode: this.data.mode,
		});*/
	}

	public removeAction(): void {
/*		this.dialogRef.close({
			item: this.pillsFormGroup.value,
			mode: PopupModeEnum.remove,
		});*/
	}

	private initForm(): void {
		this.idControl.setValue(null);
		this.nameControl.setValue('');


		this.nameControl.setValidators(Validators.required);

		this.pillsFormGroup = new FormGroup({
			id: this.idControl,
			name: this.nameControl,
		});
	}

}
