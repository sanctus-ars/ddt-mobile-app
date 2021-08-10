import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';

interface IWeightItem {
	id?: string;
	diff?: number;
	date?: Date | string;
	mode?: PopupModeEnum | string;
	weight?: number;
	comment?: string;
}
@Component({
	selector: 'app-weight-item',
	templateUrl: './weight-item.component.html',
	styleUrls: ['./weight-item.component.scss'],
})
export class WeightItemComponent implements OnInit {
	private data: IWeightItem;
  public idControl: FormControl = new FormControl();
  public diffControl: FormControl = new FormControl();
	public dateControl: FormControl = new FormControl();
	public weightControl: FormControl = new FormControl();
	public commentControl: FormControl = new FormControl();

	public weightFormGroup: FormGroup = new FormGroup({});
	constructor(
		private location: Location,
		private toastService: ToastService,
		private weightService: WeightService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		const params = this.activatedRoute.snapshot.paramMap;
		this.data = {
			id: params.get('id'),
			diff: +params.get('diff'),
			date: params.get('date'),
			mode: params.get('mode'),
			weight: +params.get('weight'),
			comment: params.get('comment'),
		};
		this.initForm();
	}

	public cancelAction(): void {
		this.location.back();
	}

	public async saveAction() {
		const item = this.weightFormGroup.value;
		const mode = this.data.mode;
		switch (mode) {
			case PopupModeEnum.create:
				await this.addWeight(item);
				break;
			case PopupModeEnum.edit:
				await this.editWeight(item);
				break;
			case PopupModeEnum.remove:
				await this.removeWeight(item.id);
				break;
		}
	}

	private async addWeight(item: IWeight) {
		return await this.weightService.addWeight(item)
			.then(async () => {
				await this.toastService.showSuccess('Ваш вес сохранен');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			}).finally(() => {
				this.location.back();
			});
	}
	private async editWeight(item: IWeight) {
		return await this.weightService.editWeight(item)
			.then(async () => {
				await this.toastService.showSuccess('Ваш вес сохранен');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			}).finally(() => {
				this.location.back();
			});
	}

	private async removeWeight(id: string) {
		return await this.weightService.removeWeight(id)
			.then(async () => {
				await this.toastService.showSuccess('Ваш вес удален');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	public removeAction(): void {
		this.location.back();
	}

	private initForm(): void {
		const itemDate = this.data.mode === PopupModeEnum.create ? new Date() : this.data.date;
		const itemComment = this.data.comment === 'undefined' || this.data.comment === undefined || this.data.comment === null || this.data.comment === 'null' ? '' : this.data.comment;
    this.idControl.setValue(this.data.id);
    this.diffControl.setValue(this.data.diff);
    this.dateControl.setValue(itemDate);
    this.weightControl.setValue(this.data.weight);
    this.commentControl.setValue(itemComment);

    this.weightFormGroup = new FormGroup({
			id: this.idControl,
			diff: this.diffControl,
			date: this.dateControl,
			weight: this.weightControl,
			comment: this.commentControl,
		});
	}
}
