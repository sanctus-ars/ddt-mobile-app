import { Component, Inject, OnInit } from '@angular/core';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';
import { IBloodPressure, IBloodPressureItem } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { HandEnum } from 'src/app/pages/diary/components/blood-pressure/enum/hand.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
	selector: 'app-blood-pressure-item',
	templateUrl: './blood-pressure-item.component.html',
	styleUrls: ['./blood-pressure-item.component.scss'],
})
export class BloodPressureItemComponent implements OnInit {
	public data: IBloodPressureItem;
	public idControl: FormControl = new FormControl();
	public diffControl: FormControl = new FormControl();
	public flowControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public handControl: FormControl = new FormControl();
	public pulseControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public wellBeingControl: FormControl = new FormControl();
	public bloodPressureSystolicControl: FormControl = new FormControl();
	public bloodPressureDiastolicControl: FormControl = new FormControl();

	public bloodPressureForm: FormGroup = new FormGroup({});

	constructor(
		private location: Location,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private bloodPressureService: BloodPressureService,
	) { }

	ngOnInit() {
		const params = this.activatedRoute.snapshot.paramMap;

		this.data = {
			id: params.get('id') || null,
			date: params.get('date') ? moment(params.get('date')).toDate() : moment().toDate(),
			hand: params.get('hand') || HandEnum.left,
			diff: +params.get('diff') || 0,
			mode: params.get('mode') || PopupModeEnum.create,
			pulse: +params.get('pulse') || 75,
			comment: params.get('comment') || '',
			wellBeing: +params.get('wellBeing') || 5,
			bloodPressureSystolic: +params.get('bloodPressureSystolic') || 120,
			bloodPressureDiastolic: +params.get('bloodPressureDiastolic') || 80,
		};
		this.initForm();
	}

	public cancelAction(): void {
		this.location.back();
	}

	public async saveAction() {
		const mode = this.data.mode;
		switch (mode) {
			case PopupModeEnum.create:
				await  this.saveBloodPressure();
				break;
			case PopupModeEnum.edit:
				await  this.editBloodPressure();
				break;
		}
	}

	public async removeAction() {
			await this.removeBloodPressure();
	}

	private initForm(): void {
		this.idControl.setValue(!!this.data  ? this.data.id : null);
		this.diffControl.setValue(!!this.data ? this.data.diff : null);
		this.flowControl.setValue( !!this.data ? this.data.flow : WellBeingFlow.bloodPressure);
		this.dateControl.setValue(!!this.data ? this.data.date : new Date());
		this.handControl.setValue(!!this.data ? this.data.hand : HandEnum.left);
		this.pulseControl.setValue(!!this.data ? this.data.pulse : 65);
		this.commentControl.setValue( !!this.data ? this.data.comment : '');
		this.wellBeingControl.setValue( !!this.data ? this.data.wellBeing : 5);
		this.bloodPressureSystolicControl.setValue(!!this.data  ? this.data.bloodPressureSystolic : 120);
		this.bloodPressureDiastolicControl.setValue(!!this.data  ? this.data.bloodPressureDiastolic : 80);


		this.bloodPressureForm = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			flow: this.flowControl,
			hand: this.handControl,
			pulse: this.pulseControl,
			comment: this.commentControl,
			wellBeing: this.wellBeingControl,
			bloodPressureSystolic: this.bloodPressureSystolicControl,
			bloodPressureDiastolic: this.bloodPressureDiastolicControl

		});
	}

	private async removeBloodPressure() {
		const item = this.bloodPressureForm.value;
		await this.bloodPressureService.remove(item.id).then(async () => {
			await this.toastService.showSuccess('Ваше давление и пульс успешно удалены');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		}).finally(() => {
			this.location.back();
		});
	}

	private async editBloodPressure() {
		const item = this.bloodPressureForm.value;
		await this.bloodPressureService.update(item).then(async () => {
			await this.toastService.showSuccess('Ваше давление и пульс успешно сохранены');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		}).finally(() => {
			this.location.back();
		});
	}

	private async saveBloodPressure() {
		const item = this.bloodPressureForm.value;
		await this.bloodPressureService.create(item).then(async () => {
			await this.toastService.showSuccess('Ваше давление и пульс успешно сохранены');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		}).finally(() => {
			this.location.back();
		});
	}
}
