import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit {
	public sexControl = new FormControl();
	public nameControl = new FormControl();
	public growthControl = new FormControl();
	public birthdayControl = new FormControl();
 	public plannedWeightControl = new FormControl();
	public transplantDateControl = new FormControl();
	public transplantOrganControl = new FormControl();

	public settingsFormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
		private toastService: ToastService,
		private settingsService: SettingsService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
		this.buildForm();
	}

	private initData() {
		this.subscriptions.add([
			this.settingsService.appSettings.subscribe((settings: ISettings) => {
				if (settings) {
					this.sexControl.setValue(settings.sex);
					this.nameControl.setValue(settings.name);
					this.growthControl.setValue(settings.growth);
					this.birthdayControl.setValue(moment(settings.birthday).toDate());
					this.plannedWeightControl.setValue(settings.plannedWeight);
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
				plannedWeight: this.plannedWeightControl,
				transplantDate: this.transplantDateControl,
				transplantOrgan: this.transplantOrganControl,
			});
	}

	public saveSettingsAction() {
		const formValue = this.settingsFormGroup.value;
		const settingsModel = {
			sex: formValue.sex,
			name: formValue.name,
			growth: formValue.growth,
			birthday: moment(formValue.birthday).format('YYYY-MM-DD'),
			plannedWeight: formValue.plannedWeight,
			transplantDate: moment(formValue.transplantDate).format('YYYY-MM-DD'),
			transplantOrgan: formValue.transplantOrgan,
		};

		this.settingsService.setSettings(settingsModel)
			.then(async () => {
				await this.toastService.showSuccess('Ваши настройки сохранены');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}
}
