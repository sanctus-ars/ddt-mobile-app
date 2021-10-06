import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import { SexEnum } from 'src/app/shared/enum/sex.enum';
import { TransplantOrgansEnum } from 'src/app/shared/enum/transplant-organs.enum';
import * as _ from 'lodash';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit {
	public transplantOrgan = [
		{
			key: 'Почка',
			value: TransplantOrgansEnum.KIDNEY
		},
		{
			key: 'Легкие',
			value: TransplantOrgansEnum.LUNGS
		},
		{
			key: 'Печень',
			value: TransplantOrgansEnum.LIVER
		},
		{
			key: 'Сердце',
			value: TransplantOrgansEnum.HEART
		},
		{
			key: 'Поджелудочная железа',
			value: TransplantOrgansEnum.PANCREAS
		}
	];
	public sexList = [
		{
			key: 'Мужской',
			value: SexEnum.man
		},
		{
			key: 'Женский',
			value: SexEnum.woman
		}
	];
	public sexControl = new FormControl();
	public nameControl = new FormControl();
	public growthControl = new FormControl();
	public birthdayControl = new FormControl();
 	public plannedWeightControl = new FormControl();
	public transplantDateControl = new FormControl();
	public transplantOrganControl = new FormControl();
 	public isTransplantationControl = new FormControl(true);

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
				if (!_.isEmpty(settings)) {
					this.sexControl.setValue(settings.sex);
					this.nameControl.setValue(settings.name);
					this.growthControl.setValue(settings.growth);
					this.birthdayControl.setValue(settings.birthday ? moment(settings.birthday).toDate() : null);
					this.plannedWeightControl.setValue(settings.plannedWeight);
					this.transplantDateControl.setValue(settings.transplantDate ? moment(settings.transplantDate).toDate() : null);
					this.transplantOrganControl.setValue(settings.transplantOrgan);
					this.isTransplantationControl.setValue(settings.isTransplantation);
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
				isTransplantation: this.isTransplantationControl,
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
			isTransplantation: formValue.isTransplantation,
		};

		this.settingsService.setSettings(settingsModel)
			.then(async () => {
				await this.toastService.showSuccess('Ваши настройки сохранены');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}
}
