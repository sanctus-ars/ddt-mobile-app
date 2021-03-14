import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';


const moduleDeclarations = [

];

@NgModule({
	declarations: [
		...moduleDeclarations,
	],
	exports: [
		...moduleDeclarations
	],
	imports: [
		IonicModule.forRoot(),
		SharedModule,
		CommonModule
	]
})
export class UiModule { }
