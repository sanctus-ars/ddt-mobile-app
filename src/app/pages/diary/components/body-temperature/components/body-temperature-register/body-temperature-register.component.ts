import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { BodyTemperatureItemDialogComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-item-dialog/body-temperature-item-dialog.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { IBase } from 'src/app/shared/interface/base-crud.interface';

@Component({
	selector: 'app-body-temperature-register',
	templateUrl: './body-temperature-register.component.html',
	styleUrls: ['./body-temperature-register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyTemperatureRegisterComponent extends  BaseComponent implements OnInit, AfterViewInit {

	public displayedColumns: string[] = ['date', 'temperature', 'diff', 'icon'];
	public dataSource: MatTableDataSource<IBase>;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
		private dialog: MatDialog,
		private toastService: ToastService,
		private bodyTemperatureService: BodyTemperatureService,
	) {
		super(cd);
		this.dataSource = new MatTableDataSource([]);
	}

  public ngOnInit() {
    this.initData();
  }

	public ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}



	public clickByRowAction(row) {
		const dialogRef = this.dialog.open(BodyTemperatureItemDialogComponent, {
			width: '100%',
			height: '100%',
			data: {
				item: row,
				mode: PopupModeEnum.edit
			}
		});

		this.subscriptions.add([
			dialogRef.afterClosed().subscribe(async (result: { item: IBodyTemperature, mode: PopupModeEnum }) => {
				if (result && result.item) {
					if (result.mode === PopupModeEnum.create) {
						await this.createBodyTemperature(result.item);
					}

					if (result.mode === PopupModeEnum.edit) {
						await this.updateBodyTemperature(result.item);
					}

					if (result.mode === PopupModeEnum.remove) {
						await this.removeBodyTemperature(result.item.id);
					}
				} else {
					await this.toastService.showError('Что-то пошло не так. Обратитесь к разработчику');
				}
			})
		]);
	}

	private removeBodyTemperature(id: string): Promise<void> {
		return this.bodyTemperatureService.remove(id).then(async () => {
			await this.toastService.showSuccess('Ваше самочувствие успешно обновлено');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private createBodyTemperature(item: IBodyTemperature): Promise<void> {
		return this.bodyTemperatureService.create(item).then(async () => {
			await this.toastService.showSuccess('Ваша температура тела успешно сохранено');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private updateBodyTemperature(item: IBodyTemperature): Promise<void> {
		return this.bodyTemperatureService.update(item).then(async () => {
			await this.toastService.showSuccess('Ваша температура тела успешно обновлена');
		}).catch(async (error) => {
			await this.toastService.showError(error);
		});
	}

	private initData(): void {
		this.subscriptions.add([
			this.bodyTemperatureService.list.subscribe((list) => {
				this.dataSource = new MatTableDataSource<IBase>(list);
				this.cd.markForCheck();
			})
		]);
	}
}
