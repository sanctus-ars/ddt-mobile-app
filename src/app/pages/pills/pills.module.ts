
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { PillsComponent } from 'src/app/pages/pills/pills.component';
import { PillsResearchComponent } from 'src/app/pages/pills/components/pills-research/pills-research.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PillsItemDialogComponent } from 'src/app/pages/pills/components/pills-item-dialog/pills-item-dialog.component';
import { PillsDrugsComponent } from 'src/app/pages/pills/components/pills-drugs/pills-drugs.component';
import { PillsHistoryComponent } from 'src/app/pages/pills/components/pills-history/pills-history.component';
import { DoctorItemDialogComponent } from 'src/app/pages/pills/components/doctor-item-dialog/doctor-item-dialog.component';

const declarations = [
	PillsComponent,
	PillsDrugsComponent,
	PillsHistoryComponent,
	PillsResearchComponent,
	PillsItemDialogComponent,
	DoctorItemDialogComponent,
];
@NgModule({
	declarations: [
		...declarations
	],
	imports: [
		IonicModule.forRoot(),
		ReactiveFormsModule,
		FormsModule,
		CoreModule,
		SharedModule,
		CommonModule
	],
	exports: [
		...declarations
	],
})
export class PillsModule { }
