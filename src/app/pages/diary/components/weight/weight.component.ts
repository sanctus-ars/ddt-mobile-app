import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  public tabClick() {
    console.log('s');
  }

}
