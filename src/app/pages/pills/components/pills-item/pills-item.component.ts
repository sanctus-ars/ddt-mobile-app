import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import * as moment from 'moment';
import { ToastService } from 'src/app/shared/services/toast.service';

export interface IPillsItem extends IPills {
	mode?: PopupModeEnum | string;
}

@Component({
	selector: 'app-pills-item',
	templateUrl: './pills-item.component.html',
	styleUrls: ['./pills-item.component.scss'],
})
export class PillsItemComponent extends BaseComponent implements OnInit {

	public data: IPillsItem;
	public idControl: FormControl = new FormControl();
	public nameControl: FormControl = new FormControl();
	public timeControl: FormControl = new FormControl();
	public countControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();
	public endDateControl: FormControl = new FormControl();
	public startDateControl: FormControl = new FormControl();

	public pillsFormGroup: FormGroup = new FormGroup({});

	constructor(
		private cd: ChangeDetectorRef,
		private location: Location,
		private toastService: ToastService,
		private pillsService: PillsService,
		private activatedRoute: ActivatedRoute,
	) {
		super(cd);
	}

	ngOnInit() {
		const params = this.activatedRoute.snapshot.paramMap;
		this.data = {
			id: params.get('id'),
			name: params.get('name'),
			time: +params.get('time'),
			mode: params.get('mode'),
			count: +params.get('count'),
			comment: params.get('comment'),
			endDate: params.get('endDate') ? moment(params.get('endDate')).toDate() : moment().add(30, 'days').toDate(),
			startDate: params.get('startDate') ? moment(params.get('startDate')).toDate() : moment().toDate(),
		};
		this.initForm();
	}

	public cancelAction(): void {
		this.location.back();
	}

	public async saveAction(): Promise<void> {
		switch (this.data.mode) {
			case PopupModeEnum.edit:
				await this.editPill(this.pillsFormGroup.getRawValue());
				break;
			case PopupModeEnum.create:
				await this.addPill(this.pillsFormGroup.getRawValue());
				break;
		}
	}

	public async removeAction(): Promise<void> {
		await this.removePill(this.pillsFormGroup.getRawValue());
	}

	private async editPill(item: IPills): Promise<void> {
		return this.pillsService.editPills(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием лекарства успешно отредактирован');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			}).finally(() => {
				this.cancelAction();
			});
	}

	private async addPill(item: IPills): Promise<void> {
		return this.pillsService.addPill(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием лекарства успешно добавлен');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			}).finally(() => {
				this.cancelAction();
			});;
	}

	private removePill(id: string): Promise<void> {
		return this.pillsService.removePill(id)
			.then(async () => {
				await this.toastService.showSuccess('Лекарство успешно удалено');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			}).finally(() => {
				this.cancelAction();
			});;
	}

	private initForm(): void {
		this.idControl.setValue(this.data.id || null);
		this.timeControl.setValue(this.data.time || null);
		this.nameControl.setValue(this.data.name || null);
		this.countControl.setValue(this.data.count || 1);
		this.commentControl.setValue(this.data.comment || null);
		this.endDateControl.setValue(this.data.endDate || null);
		this.startDateControl.setValue(this.data.startDate || null);

		this.timeControl.setValidators(Validators.required);
		this.nameControl.setValidators(Validators.required);
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
		});
	}

}
