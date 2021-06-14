import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { WellBeingService } from 'src/app/pages/diary/components/well-being/services/well-being.service';
import { WellBeingItemDialogComponent } from 'src/app/pages/diary/components/well-being/components/well-being-item-dialog/well-being-item-dialog.component';
import { combineAll } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import * as moment from 'moment';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';

@Component({
	selector: 'app-well-being-registry',
	templateUrl: './well-being-registry.component.html',
	styleUrls: ['./well-being-registry.component.scss'],
})
export class WellBeingRegistryComponent extends BaseComponent implements AfterViewInit, OnInit {

	public dataSource: MatTableDataSource<IWellBeing>;
	public displayedColumns: string[] = ['date', 'wellBeing', 'flow', 'icon'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private wellBeingService: WellBeingService,
		private dateAndTimeService: DateAndTimeService,
		private bloodPressureService: BloodPressureService,
		private bodyTemperatureService: BodyTemperatureService,
	) {
		super(cd);

		this.dataSource = new MatTableDataSource([]);
	}

	ngOnInit() {
		this.initData();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}


	public clickByRowAction(row) {
		const dialogRef = this.dialog.open(WellBeingItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				mode: PopupModeEnum.edit,
				item: row,
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe((result: any) => {
				if (result && result.mode === PopupModeEnum.edit) {
					this.editWeight(result.item);
				} else if (result && result.mode === PopupModeEnum.remove) {
					this.removeWeight(result.item.id);
				}
			})
		]);
	}

	private editWeight(item: IWellBeing): void {
		this.wellBeingService.update(item).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private removeWeight(id: string): void {
		this.wellBeingService.remove(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {

		this.subscriptions.add([
			combineLatest([
				this.wellBeingService.list,
				this.bodyTemperatureService.list,
				this.bloodPressureService.list,
			]).subscribe(([wellBeing, bodyTemperature, bloodPressureList]: [IWellBeing[], IBodyTemperature[], IBloodPressure[]]) => {
				const resultArray: IWellBeing[] = [...wellBeing, ...bodyTemperature, ...bloodPressureList];
				const clearArray: IWellBeing[] = this.dateAndTimeService.sortArray(resultArray);
				this.dataSource = new MatTableDataSource(clearArray);
			})
		]);
	}
}
