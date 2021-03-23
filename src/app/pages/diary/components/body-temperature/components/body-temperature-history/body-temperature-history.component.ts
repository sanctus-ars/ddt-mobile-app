import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface BodyTemperatureTableElement {
  date: Date;
  diff: number;
  temperature: number;
}

const ELEMENT_DATA: BodyTemperatureTableElement[] = [
  { date: new Date(), temperature: 72, diff: -2 },
  { date: new Date(), temperature: 72, diff: -2 },
  { date: new Date(), temperature: 76, diff: 2 },
];

@Component({
  selector: 'app-body-temperature-history',
  templateUrl: './body-temperature-history.component.html',
  styleUrls: ['./body-temperature-history.component.scss'],
})
export class BodyTemperatureHistoryComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['date', 'temperature', 'diff', 'icon'];
  public dataSource: MatTableDataSource<BodyTemperatureTableElement>;

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
