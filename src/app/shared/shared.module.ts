import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

const modules = [
	CommonModule,
	Ng2GoogleChartsModule,
];
@NgModule({
	declarations: [],
	imports: [
		...modules
	],
	exports: [
		...modules
	]
})
export class SharedModule { }
