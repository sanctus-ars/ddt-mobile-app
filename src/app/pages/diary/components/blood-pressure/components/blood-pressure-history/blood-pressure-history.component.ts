import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface BloodPressureTableElement {
  low: number;
  date: Date;
  diff: number;
  height: number;
  middle: number;
}

const ELEMENT_DATA: BloodPressureTableElement[] = [
  { date: new Date(), low: 72, height: 90, middle: 85, diff: -2 },
  { date: new Date(), low: 72, height: 90, middle: 85, diff: 2 },
  { date: new Date(), low: 72, height: 90, middle: 85, diff: -2 },
];

@Component({
  selector: 'app-blood-pressure-history',
  templateUrl: './blood-pressure-history.component.html',
  styleUrls: ['./blood-pressure-history.component.scss'],
})
export class BloodPressureHistoryComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['date', 'low', 'height', 'middle', 'diff', 'icon'];
  public dataSource: MatTableDataSource<BloodPressureTableElement>;

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
