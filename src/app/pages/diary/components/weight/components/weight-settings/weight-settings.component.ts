import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeightSettings } from 'src/app/pages/diary/components/weight/interfaces/weight-settings.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
	selector: 'app-weight-settings',
	templateUrl: './weight-settings.component.html',
	styleUrls: ['./weight-settings.component.scss'],
})
export class WeightSettingsComponent extends BaseComponent implements OnInit {
	public plannedWeightControl: FormControl = new FormControl();
	public weightSettingsFormGroup: FormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
		private toastService: ToastService,
		private weightService: WeightService,
	) {
		super(cd);
	}

	ngOnInit() {
		this.initData();
		this.buildForm();
	}

	private initData(): void {
		this.subscriptions.add([
			this.weightService.weightSettings.subscribe((settings: IWeightSettings) => {
				if (settings) {
					this.plannedWeightControl.setValue(settings.plannedWeight);
					this.buildForm();
				}
			})
		]);
	}

	private buildForm(): void {
		this.weightSettingsFormGroup = new FormGroup({
			plannedWeight: this.plannedWeightControl
		});
	}

	public saveSettingsAction(): void {
		const formData = this.weightSettingsFormGroup.value;
		this.weightService.setSettings(formData).then(async () => {
			await this.toastService.showSuccess('Настройки успешно сохранены');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}
}
