import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { UrineComponent } from 'src/app/pages/diary/components/urine/urine.component';
import { UrineResearchComponent } from 'src/app/pages/diary/components/urine/components/urine-research/urine-research.component';
import { UrineHistoryComponent } from 'src/app/pages/diary/components/urine/components/urine-history/urine-history.component';

const declarations = [
	UrineComponent,
	UrineHistoryComponent,
	UrineResearchComponent,
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
		UrineComponent
	]
})
export class UrineModule { }
