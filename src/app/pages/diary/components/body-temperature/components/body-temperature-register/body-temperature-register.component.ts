import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';

@Component({
	selector: 'app-body-temperature-register',
	templateUrl: './body-temperature-register.component.html',
	styleUrls: ['./body-temperature-register.component.scss'],
})
export class BodyTemperatureRegisterComponent extends  BaseComponent implements OnInit, AfterViewInit {

	public displayedColumns: string[] = ['date', 'temperature', 'diff', 'icon'];
	public dataSource: MatTableDataSource<IBodyTemperature>;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private cd: ChangeDetectorRef,
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
		alert(row);
	}

	private initData(): void {
		this.subscriptions.add([
			this.bodyTemperatureService.getBodyTemperatureList().then((list) => {
				this.dataSource = new MatTableDataSource<IBodyTemperature>(list);
			})
		]);
	}

}
