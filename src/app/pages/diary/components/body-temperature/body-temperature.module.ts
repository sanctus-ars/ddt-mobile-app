import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { BodyTemperatureComponent } from 'src/app/pages/diary/components/body-temperature/body-temperature.component';
import { IonicModule } from '@ionic/angular';
import { BodyTemperatureResearchComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-research/body-temperature-research.component';
import { BodyTemperatureRegisterComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-register/body-temperature-register.component';
import { BodyTemperatureItemDialogComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-item-dialog/body-temperature-item-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const declarations = [
	BodyTemperatureComponent,
	BodyTemperatureRegisterComponent,
	BodyTemperatureResearchComponent,
	BodyTemperatureItemDialogComponent
];
@NgModule({
	declarations: [
		...declarations
	],
	imports: [
		ReactiveFormsModule,
		FontAwesomeModule,
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
