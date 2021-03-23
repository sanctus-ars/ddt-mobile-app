import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { MatDialog } from '@angular/material/dialog';
import { WeightItemDialogComponent } from 'src/app/pages/diary/components/weight/components/weight-item-dialog/weight-item-dialog.component';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';

@Component({
	selector: 'app-weight-history',
	templateUrl: './weight-history.component.html',
	styleUrls: ['./weight-history.component.scss'],
})
export class WeightHistoryComponent implements OnInit, AfterViewInit {
	public displayedColumns: string[] = ['date', 'weight', 'diff', 'icon'];
	public dataSource: MatTableDataSource<IWeight>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private dialog: MatDialog,
		private toastService: ToastService,
		private weightService: WeightService,
	) {
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

		dialogRef.afterClosed().subscribe((result: IWeight) => {
			if (result && result.weight) {
				this.weightService.editWeight(result).then(() => {
					this.initData();
				}).catch(async (error) => {
					await this.toastService.showError(error);
				});
			}
		});
	}

	ngOnInit() {
		this.initData();
	}

	private initData(): void {
		this.weightService.getWeights().then((list: IWeight[]) => {
			this.dataSource = new MatTableDataSource(list);
		});

	}
}
