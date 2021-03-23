import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodPressureComponent } from 'src/app/pages/diary/components/blood-pressure/blood-pressure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { BloodPressureResearchComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-research/blood-pressure-research.component';
import { BloodPressureHistoryComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-history/blood-pressure-history.component';

const declarations = [
	BloodPressureComponent,
	BloodPressureHistoryComponent,
	BloodPressureResearchComponent,
];
@NgModule({
	declarations: [
		...declarations
	],
	imports: [
		IonicModule.forRoot(),
		CoreModule,
		SharedModule,
		CommonModule
	],
	exports: [
		...declarations
	],
	entryComponents: [
	]
})
export class BloodPressureModule { }
