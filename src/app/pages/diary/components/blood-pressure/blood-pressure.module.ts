import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodPressureComponent } from 'src/app/pages/diary/components/blood-pressure/blood-pressure.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { BloodPressureResearchComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-research/blood-pressure-research.component';
import { BloodPressureStatisticComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-statistic/blood-pressure-statistic.component';
import { BloodPressureItemDialogComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-item-dialog/blood-pressure-item-dialog.component';
import { BloodPressureRegistryComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-registry/blood-pressure-registry.component';

const declarations = [
	BloodPressureComponent,
	BloodPressureResearchComponent,
	BloodPressureRegistryComponent,
	BloodPressureStatisticComponent,
	BloodPressureItemDialogComponent,
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
