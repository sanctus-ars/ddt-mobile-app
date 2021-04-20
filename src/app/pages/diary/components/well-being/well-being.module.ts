import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { WellBeingComponent } from 'src/app/pages/diary/components/well-being/well-being.component';
import { WellBeingItemDialogComponent } from 'src/app/pages/diary/components/well-being/components/well-being-item-dialog/well-being-item-dialog.component';
import { WellBeingRegistryComponent } from 'src/app/pages/diary/components/well-being/components/well-being-registry/well-being-registry.component';
import { WellBeingResearchComponent } from 'src/app/pages/diary/components/well-being/components/well-being-research/well-being-research.component';
import { WellBeingStatisticComponent } from 'src/app/pages/diary/components/well-being/components/well-being-statistic/well-being-statistic.component';


const declarations = [
	WellBeingComponent,
	WellBeingRegistryComponent,
	WellBeingResearchComponent,
	WellBeingStatisticComponent,
	WellBeingItemDialogComponent,
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
		WellBeingComponent
	]
})
export class WellBeingModule { }
