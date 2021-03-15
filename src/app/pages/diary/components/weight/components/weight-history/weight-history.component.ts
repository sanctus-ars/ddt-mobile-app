import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface WeightTableElement {
	date: Date;
	diff: number;
	weight: number;
}

const ELEMENT_DATA: WeightTableElement[] = [
	{ date: new Date(), weight: 72, diff: -2 },
	{ date: new Date(), weight: 72, diff: -2 },
	{ date: new Date(), weight: 76, diff: 2 },
];

@Component({
	selector: 'app-weight-history',
	templateUrl: './weight-history.component.html',
	styleUrls: ['./weight-history.component.scss'],
})
export class WeightHistoryComponent implements OnInit, AfterViewInit {
	public displayedColumns: string[] = ['date', 'weight', 'diff', 'icon'];
	public dataSource: MatTableDataSource<WeightTableElement>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	constructor() {
		this.dataSource = new MatTableDataSource(ELEMENT_DATA);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	public clickByRowAction(row) {
	  alert(row);
	}

	ngOnInit() {}

}
