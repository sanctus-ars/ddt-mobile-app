import { Component, OnInit } from '@angular/core';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit {

  public chartData: GoogleChartInterface;
  public bloodPressureList: BloodPressureModel[];
  public bloodPressureForm: FormGroup;
  public bloodPressureLowControl: FormControl = new FormControl();
  public bloodPressureDataControl: FormControl = new FormControl();
  public bloodPressureHeightControl: FormControl = new FormControl();


  constructor(
      private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initData();
    this.buildForm();
  }

  private initData(): void {


  }

  private buildForm(): void {
    this.bloodPressureDataControl.setValue(new Date());
    this.bloodPressureForm = new FormGroup({
      low: this.bloodPressureLowControl,
      data: this.bloodPressureDataControl,
      height: this.bloodPressureHeightControl,
    });
  }

  public saveBloodPressure() {
    console.log(this.bloodPressureForm.value);
  }
}
