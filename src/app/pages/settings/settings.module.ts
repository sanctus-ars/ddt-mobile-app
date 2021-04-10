import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { SettingsDialogComponent } from 'src/app/pages/settings/components/settings-dialog/settings-dialog.component';

const declarations = [
	SettingsComponent,
	SettingsDialogComponent,
];
@NgModule({
	declarations: [
		...declarations
	],
	imports: [
		ReactiveFormsModule,
		FontAwesomeModule,
		FormsModule,
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
export class SettingsModule { }
