import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';

@Component({
	selector: 'app-settings-dialog',
	templateUrl: './settings-dialog.component.html',
	styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent extends BaseComponent implements OnInit {
	public sexControl = new FormControl();
	public nameControl = new FormControl();
	public growthControl = new FormControl();
	public birthdayControl = new FormControl();
	public transplantDateControl = new FormControl();
	public transplantOrganControl = new FormControl();

	public settingsFormGroup = new FormGroup({});

	constructor(
		  private cd: ChangeDetectorRef,
		  private toastService: ToastService,
		  private settingsService: SettingsService,
		  public dialogRef: MatDialogRef<SettingsDialogComponent>,
		  @Inject(MAT_DIALOG_DATA) public data: { item: ISettings, mode: PopupModeEnum }
	) {
		super(cd);
	}

	ngOnInit() {
		this.initForm();
		this.buildForm();
	}

	private initForm(): void {
		this.subscriptions.add([
			this.settingsService.appSettings.subscribe((settings: ISettings) => {
				if (settings) {
					this.sexControl.setValue(settings.sex);
					this.nameControl.setValue(settings.name);
					this.growthControl.setValue(settings.growth);
					this.birthdayControl.setValue(moment(settings.birthday).toDate());
					this.transplantDateControl.setValue(moment(settings.transplantDate).toDate());
					this.transplantOrganControl.setValue(settings.transplantOrgan);
				}
			})
		]);
	}

	private buildForm(): void {
		this.settingsFormGroup = new FormGroup({
			sex: this.sexControl,
			name: this.nameControl,
			growth: this.growthControl,
			birthday: this.birthdayControl,
			transplantDate: this.transplantDateControl,
			transplantOrgan: this.transplantOrganControl,
		});
	}

	public cancelAction(): void {
	  this.dialogRef.close();
  }

	public saveSettingsAction() {
		const formValue = this.settingsFormGroup.value;
		const settingsModel = {
			sex: formValue.sex,
			name: formValue.name,
			growth: formValue.growth,
			birthday: moment(formValue.birthday).format('YYYY-MM-DD'),
			transplantDate: moment(formValue.transplantDate).format('YYYY-MM-DD'),
			transplantOrgan: formValue.transplantOrgan,
		};

		this.settingsService.setSettings(settingsModel)
			.then(async () => {
				await this.toastService.showSuccess('Ваши настройки сохранены');
			}).catch(async (error) => {
        await this.toastService.showError(error);
      }).finally(() => {
        this.dialogRef.close();
    });
	}

}
