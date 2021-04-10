import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { MatDialog } from '@angular/material/dialog';
import { WeightItemDialogComponent } from 'src/app/pages/diary/components/weight/components/weight-item-dialog/weight-item-dialog.component';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
	selector: 'app-weight-history',
	templateUrl: './weight-history.component.html',
	styleUrls: ['./weight-history.component.scss'],
})
export class WeightHistoryComponent extends BaseComponent implements OnInit, AfterViewInit {
	public dataSource: MatTableDataSource<IWeight>;
	public displayedColumns: string[] = ['date', 'weight', 'diff', 'icon'];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private weightService: WeightService,
	) {
		super(cd);

		this.dataSource = new MatTableDataSource([]);
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	public clickByRowAction(row) {
		const dialogRef = this.dialog.open(WeightItemDialogComponent, {
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
		])
	}

	ngOnInit() {
		this.initData();
	}

	private editWeight(item: IWeight): void {
		this.weightService.editWeight(item).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private removeWeight(id: string): void {
		this.weightService.removeWeight(id).then(() => {
			this.initData();
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {
		this.subscriptions.add([
				this.weightService.weightList.subscribe((list: IWeight[]) => {
					this.dataSource = new MatTableDataSource(list);
				}),
		]);
	}
}
