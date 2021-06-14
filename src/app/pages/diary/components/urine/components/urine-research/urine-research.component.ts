import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { UrineItemDialogComponent } from 'src/app/pages/diary/components/urine/components/urine-item-dialog/urine-item-dialog.component';
import { IUrine } from 'src/app/pages/diary/components/urine/interfaces/urine.interface';
import { UrineService } from 'src/app/pages/diary/components/urine/services/urine.service';

@Component({
	selector: 'app-urine-research',
	templateUrl: './urine-research.component.html',
	styleUrls: ['./urine-research.component.scss'],
})
export class UrineResearchComponent extends BaseComponent implements OnInit, AfterViewInit {
	public lastItem: IUrine;
	public firstItem: IUrine;
	public lineChart: any;

	public urineList: IUrine[] = [];
	public bloodPressureMiddleValue: IUrine;

	@ViewChild('lineCanvas') private lineCanvas: ElementRef;


	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private urineService: UrineService,
	) {
		super(cd);
	}

	ngOnInit() {}
	ngAfterViewInit() {
		this.initData();
		this.lineChartMethod();
	}

	public initData() {
		this.subscriptions.add([
			this.urineService.list.subscribe((data: IUrine[]) => {
				if (data && data.length) {
					this.lastItem = data[data.length - 1];
					this.firstItem = data[0];
					this.urineList = data;
				}

				this.lineChartMethod();
			})
		]);
	}

	public openDialog() {
		const dialogRef = this.dialog.open(UrineItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.create
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IUrine, mode: PopupModeEnum }) => {
				if (result && result.item && result.mode === PopupModeEnum.create) {
					await this.urineService.create(result.item).then(async () => {
						await this.toastService.showSuccess('Ваш диурез успешно сохранено');
					}).catch(async (error) => {
						await this.toastService.showError(error);
					});
				}
			})
		]);
	}

	lineChartMethod() {
		const dateArray = this.urineList.map((x) => moment(x.date).format('YYYY-MM-DD'));
		const urineVolumeList = this.urineList.map((x) => x.volume);
		this.lineChart = new Chart(this.lineCanvas.nativeElement, {
			type: 'line',
			data: {
				labels: [...dateArray],
				datasets: [
					{
						label: 'Объем',
						data: [...urineVolumeList ],
						type: 'line',
					},
				]
			}
		});
	}

}
