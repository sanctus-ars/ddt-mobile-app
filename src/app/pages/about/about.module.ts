import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { IonicModule, IonicRouteStrategy, IonTabs } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from 'src/app/pages/about/about.component';

const declarations = [
	AboutComponent,
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
export class AboutModule { }
