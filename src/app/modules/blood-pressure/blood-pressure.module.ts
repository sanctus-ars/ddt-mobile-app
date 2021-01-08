import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { CoreModule } from 'src/app/core/core.module';
import { BloodPressureService } from 'src/app/modules/blood-pressure/services/blood-pressure.service';
import { BloodPressureChartComponent } from 'src/app/modules/blood-pressure/components/blood-pressure-chart/blood-pressure-chart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BloodPressureTableComponent } from 'src/app/modules/blood-pressure/components/blood-pressure-table/blood-pressure-table.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BloodPressureItemNewComponent } from 'src/app/modules/blood-pressure/components/blood-pressure-item-new/blood-pressure-item-new.component';
import { BloodPressureItemEditComponent } from 'src/app/modules/blood-pressure/components/blood-pressure-item-edit/blood-pressure-item-edit.component';
import { BloodPressureDataComponent } from 'src/app/modules/blood-pressure/components/blood-pressure-data/blood-pressure-data.component';

const angularDeclaration = [
	BloodPressureDataComponent,
	BloodPressureChartComponent,
	BloodPressureTableComponent,
	BloodPressureItemNewComponent,
	BloodPressureItemEditComponent,
];

@NgModule({
	imports: [
		IonicModule.forRoot(),
		CommonModule,
		CoreModule,
		FormsModule,
		SharedModule,
		TranslateModule,
		ReactiveFormsModule,
	],
	declarations: angularDeclaration,
	exports: angularDeclaration,
})
export class BloodPressureModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: BloodPressureModule,
			providers: [
				BloodPressureService,
			],
		};
	}
}
