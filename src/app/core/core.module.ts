import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './loading/loading.directive';
import { LoadingComponent } from 'src/app/core/loading/loading.component';
import { UiModule } from 'src/app/core/ui/ui.module';



@NgModule({
	declarations: [
			LoadingComponent,
			LoadingDirective,
	],
	imports: [
			UiModule,
			CommonModule
	],
		exports: [
				LoadingDirective
		]
})
export class CoreModule { }
