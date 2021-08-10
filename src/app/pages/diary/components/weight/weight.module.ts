import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeightComponent } from 'src/app/pages/diary/components/weight/weight.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { WeightHistoryComponent } from 'src/app/pages/diary/components/weight/components/weight-history/weight-history.component';
import { WeightResearchComponent } from 'src/app/pages/diary/components/weight/components/weight-research/weight-research.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { WeightStatisticComponent } from 'src/app/pages/diary/components/weight/components/weight-statistic/weight-statistic.component';
import { WeightItemComponent } from 'src/app/pages/diary/components/weight/components/weight-item/weight-item.component';


const declarations = [
	WeightComponent,
	WeightItemComponent,
	WeightHistoryComponent,
	WeightResearchComponent,
	WeightStatisticComponent,
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
