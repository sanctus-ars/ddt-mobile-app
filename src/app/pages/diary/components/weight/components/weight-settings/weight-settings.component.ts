import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeightSettings } from 'src/app/pages/diary/components/weight/interfaces/weight-settings.interface';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
	selector: 'app-weight-settings',
	templateUrl: './weight-settings.component.html',
	styleUrls: ['./weight-settings.component.scss'],
})
export class WeightSettingsComponent implements OnInit {
	public plannedWeightControl: FormControl = new FormControl();
	public weightSettingsFormGroup: FormGroup = new FormGroup({});
	constructor(
		private toastService: ToastService,
		private weightService: WeightService,
	) { }

	ngOnInit() {
		this.initData();
		this.buildForm();
	}

	private initData(): void {
		this.weightService.getSettings().then((settings: IWeightSettings) => {
		  if (settings) {
        this.plannedWeightControl.setValue(settings.plannedWeight);
        this.buildForm();
      }

		});
	}

	private buildForm(): void {
		this.weightSettingsFormGroup = new FormGroup({
			plannedWeight: this.plannedWeightControl
		});
	}

	public saveSettingsAction(): void {
		const formData = this.weightSettingsFormGroup.value;
		this.weightService.setSettings(formData).then(async () => {
			this.initData();
			await this.toastService.showSuccess('Настройки успешно сохранены');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

}
