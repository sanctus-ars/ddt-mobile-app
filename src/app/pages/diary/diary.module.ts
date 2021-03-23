import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightComponent } from 'src/app/pages/diary/components/weight/weight.component';
import { BloodPressureComponent } from 'src/app/pages/diary/components/blood-pressure/blood-pressure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BodyTemperatureComponent } from 'src/app/pages/diary/components/body-temperature/body-temperature.component';
import { DiaryComponent } from 'src/app/pages/diary/diary.component';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { WeightModule } from 'src/app/pages/diary/components/weight/weight.module';
import { BloodPressureModule } from 'src/app/pages/diary/components/blood-pressure/blood-pressure.module';
import { UrineModule } from 'src/app/pages/diary/components/urine/urine.module';
import { BodyTemperatureModule } from 'src/app/pages/diary/components/body-temperature/body-temperature.module';


const declarations = [
	DiaryComponent,
];
@NgModule({
	declarations: [
		...declarations
	],
	imports: [
		UrineModule,
		BodyTemperatureModule,
		BloodPressureModule,
		WeightModule,
		IonicModule.forRoot(),
	  CoreModule,
	  SharedModule,
		CommonModule
	],
	exports: [
		...declarations
	],
})
export class DiaryModule { }
