import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface UrineTableElement {
  date: Date;
  diff: number;
  urine: number;
}

const ELEMENT_DATA: UrineTableElement[] = [
  { date: new Date(), urine: 1700, diff: -200 },
  { date: new Date(), urine: 1600, diff: -200 },
  { date: new Date(), urine: 1500, diff: 200 },
];

@Component({
  selector: 'app-urine-history',
  templateUrl: './urine-history.component.html',
  styleUrls: ['./urine-history.component.scss'],
})
export class UrineHistoryComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['date', 'urine', 'diff', 'icon'];
  public dataSource: MatTableDataSource<UrineTableElement>;

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
