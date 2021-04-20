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

@Component({
	selector: 'app-well-being-registry',
	templateUrl: './well-being-registry.component.html',
	styleUrls: ['./well-being-registry.component.scss'],
})
export class WellBeingRegistryComponent extends BaseComponent implements AfterViewInit, OnInit {

	public dataSource: MatTableDataSource<IWellBeing>;
	public displayedColumns: string[] = ['date', 'wellBeing', 'diff', 'icon'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private wellBeingService: WellBeingService,
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
			window.location.reload();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private removeWeight(id: string): void {
		this.wellBeingService.remove(id).then(() => {
			window.location.reload();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {

		this.subscriptions.add([
			this.wellBeingService.list.subscribe((list: IWellBeing[]) => {
				this.dataSource = new MatTableDataSource(list);
			}),
		]);
	}
}
