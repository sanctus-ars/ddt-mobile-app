import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { AnalysesModule } from 'src/app/modules/analyses/analyses.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const modules = [
	AnalysesModule,
	AuthModule,
	FontAwesomeModule,
];
@NgModule({
	declarations: [],
	imports: [
		...modules,
			CommonModule,
	],
	exports: [
		...modules
	]
})
export class ModulesModule { }
