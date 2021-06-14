import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { BloodPressureItemDialogComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-item-dialog/blood-pressure-item-dialog.component';

@Component({
	selector: 'app-blood-pressure-registry',
	templateUrl: './blood-pressure-registry.component.html',
	styleUrls: ['./blood-pressure-registry.component.scss'],
})
export class BloodPressureRegistryComponent extends BaseComponent implements AfterViewInit, OnInit {

	public dataSource: MatTableDataSource<IBloodPressure>;
	public displayedColumns: string[] = ['date', 'bloodPressureSystolic', 'bloodPressureDiastolic', 'pulse', 'icon'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private bloodPressureService: BloodPressureService,
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
		const dialogRef = this.dialog.open(BloodPressureItemDialogComponent, {
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

	private editWeight(item: IBloodPressure): void {
		this.bloodPressureService.update(item).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private removeWeight(id: string): void {
		this.bloodPressureService.remove(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {

		this.subscriptions.add([
			this.bloodPressureService.list.subscribe((list: IBloodPressure[]) => {
				this.dataSource = new MatTableDataSource(list);
			}),
		]);
	}
}
