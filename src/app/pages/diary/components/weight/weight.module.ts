import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightComponent } from 'src/app/pages/diary/components/weight/weight.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { WeightHistoryComponent } from 'src/app/pages/diary/components/weight/components/weight-history/weight-history.component';
import { WeightResearchComponent } from 'src/app/pages/diary/components/weight/components/weight-research/weight-research.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeightItemDialogComponent } from 'src/app/pages/diary/components/weight/components/weight-item-dialog/weight-item-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeightSettingsComponent } from 'src/app/pages/diary/components/weight/components/weight-settings/weight-settings.component';
import { WeightStatisticComponent } from 'src/app/pages/diary/components/weight/components/weight-statistic/weight-statistic.component';


const declarations = [
	WeightComponent,
	WeightHistoryComponent,
	WeightSettingsComponent,
	WeightResearchComponent,
	WeightStatisticComponent,
	WeightItemDialogComponent,
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
		WeightComponent
	]
})
export class WeightModule { }
