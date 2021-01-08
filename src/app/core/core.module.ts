import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading/loading.directive';
import { LoadingComponent } from 'src/app/core/loading/loading.component';



@NgModule({
	declarations: [
			LoadingComponent,
			LoadingDirective,
	],
	imports: [
			CommonModule
	],
		exports: [
				LoadingDirective
		]
})
export class CoreModule { }
