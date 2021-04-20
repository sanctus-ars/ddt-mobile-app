import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorsComponent } from 'src/app/pages/doctors/doctors.component';
import { DoctorResearchComponent } from 'src/app/pages/doctors/components/doctor-research/doctor-research.component';
import { DoctorVisitItemDialogComponent } from 'src/app/pages/doctors/components/doctor-visit-item-dialog/doctor-visit-item-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const declarations = [
		DoctorsComponent,
		DoctorResearchComponent,
		DoctorVisitItemDialogComponent,
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
		CommonModule,
		MatFormFieldModule,
	],
	exports: [
		...declarations
	],
})
export class DoctorsModule { }
