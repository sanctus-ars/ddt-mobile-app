import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IUrine } from 'src/app/pages/diary/components/urine/interfaces/urine.interface';
import { UrineService } from 'src/app/pages/diary/components/urine/services/urine.service';
import { UrineItemDialogComponent } from 'src/app/pages/diary/components/urine/components/urine-item-dialog/urine-item-dialog.component';

@Component({
	selector: 'app-urine-registry',
	templateUrl: './urine-registry.component.html',
	styleUrls: ['./urine-registry.component.scss'],
})
export class UrineRegistryComponent extends BaseComponent implements OnInit, AfterViewInit {
	public dataSource: MatTableDataSource<IUrine>;
	public displayedColumns: string[] = ['date', 'volume', 'pain', 'urgeIntensity', 'icon'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private urineService: UrineService,
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
		const dialogRef = this.dialog.open(UrineItemDialogComponent, {
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
					this.editItem(result.item);
				} else if (result && result.mode === PopupModeEnum.remove) {
					this.removeItem(result.item.id);
				}
			})
		]);
	}

	private editItem(item: IUrine): void {
		this.urineService.update(item).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private removeItem(id: string): void {
		this.urineService.remove(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {

		this.subscriptions.add([
			this.urineService.list.subscribe((list: IUrine[]) => {
				this.dataSource = new MatTableDataSource(list);
			}),
		]);
	}

}
