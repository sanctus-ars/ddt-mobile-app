import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { MatDialog } from '@angular/material/dialog';
import { IDoctorVisit } from 'src/app/pages/doctors/interface/doctor.interface';
import { TitleService } from 'src/app/shared/services/title.service';
import { DoctorVisitsService } from 'src/app/pages/doctors/services/doctor.service';
import { DoctorVisitItemDialogComponent } from 'src/app/pages/doctors/components/doctor-visit-item-dialog/doctor-visit-item-dialog.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
	selector: 'app-doctor-research',
	templateUrl: './doctor-research.component.html',
	styleUrls: ['./doctor-research.component.scss'],
})
export class DoctorResearchComponent extends BaseComponent implements OnInit {
	public doctorVisitsList: { date: string, list: IDoctorVisit[] }[] = [];

	constructor(
		private cd: ChangeDetectorRef,
	  private dialog: MatDialog,
		private toastService: ToastService,
		private titleService: TitleService,
		private doctorVisitsService: DoctorVisitsService,
	) {
		super(cd);
	}

	public ngOnInit() {
		this.initData();
	}

	public editDoctorVisitAction(item: IDoctorVisit): void {
		this.openDoctorVisitDialog(PopupModeEnum.edit, item);
	}

	public clickByAddButtonAction() {
		this.openDoctorVisitDialog(PopupModeEnum.create);
	}

	private addDoctorVisit(item: IDoctorVisit): Promise<void> {
		return this.doctorVisitsService.addDoctorVisit(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием к врачу успешно добавлен');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private removeDoctorVisit(id: string): Promise<void> {
		return this.doctorVisitsService.removeDoctorVisit(id)
			.then(async () => {
				await this.toastService.showSuccess('Прием к врачу успешно удалено');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private editDoctorVisit(item: IDoctorVisit): Promise<void> {
		return this.doctorVisitsService.editDoctorVisit(item)
			.then(async () => {
				await this.toastService.showSuccess('Прием к врачу успешно отредактирован');
			}).catch(async (error) => {
				await this.toastService.showError(error);
			});
	}

	private initData(): void {
		this.titleService.setTitle('Мои посещения врачу');
		this.subscriptions.add([
			this.doctorVisitsService.doctorVisits.subscribe((doctorVisitsList: IDoctorVisit[]) => {
				const featureVisits: IDoctorVisit[] = doctorVisitsList.filter((item: IDoctorVisit) => {
					return moment(item.date) >= moment(new Date());
				});
				const sortedVisitsByTime: IDoctorVisit[] = featureVisits.sort((a: IDoctorVisit, b: IDoctorVisit) => {
					if (moment().add(a.time, 'hours') < moment().add(b.time, 'hours')) {
						return -1;
					} else  if (moment().add(a.time, 'hours') > moment().add(b.time, 'hours')) {
						return 1;
					} else {
						return  0;
					}
				});
				const sortedVisitsByDate: IDoctorVisit[] = sortedVisitsByTime.sort((a: IDoctorVisit, b: IDoctorVisit) => {
					if (moment(a.date) < moment(b.date)) {
						return -1;
					} else  if (moment(a.date) > moment(b.date)) {
						return 1;
					} else {
						return  0;
					}
				});
				const result = _.groupBy(sortedVisitsByDate, 'date');
				const timesList = Object.keys(result);
				const clearResult = timesList.reduce((accum: { date: string, list: IDoctorVisit[]}[], date: string) => {
					accum.push({
						date,
						list: result[date],
					});
					return accum;
				}, []);
				this.doctorVisitsList = clearResult;
			}),
		]);
	}

	private openDoctorVisitDialog(mode: PopupModeEnum, data?: IDoctorVisit): void {
		const dialogRef = this.dialog.open(DoctorVisitItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				data,
				mode,
			}
		});
		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IDoctorVisit, mode: PopupModeEnum}) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.addDoctorVisit(result.item);
				} else if (result && result.item && result.mode === PopupModeEnum.remove) {
					await this.removeDoctorVisit(result.item.id);
				} else if (result && result.item && result.mode === PopupModeEnum.edit){
					await this.editDoctorVisit(result.item);
				}
			})
		]);
	}

}
