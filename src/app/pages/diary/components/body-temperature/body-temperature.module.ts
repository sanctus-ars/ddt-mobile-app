import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BodyTemperatureComponent } from 'src/app/pages/diary/components/body-temperature/body-temperature.component';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { BodyTemperatureResearchComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-research/body-temperature-research.component';
import { BodyTemperatureHistoryComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-history/body-temperature-history.component';

const declarations = [
	BodyTemperatureComponent,
	BodyTemperatureHistoryComponent,
	BodyTemperatureResearchComponent,
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
		BodyTemperatureComponent
	]
})
export class BodyTemperatureModule { }
