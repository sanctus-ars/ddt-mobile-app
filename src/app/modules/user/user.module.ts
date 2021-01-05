import { SingletonModule } from 'src/app/shared/abstract/singleton.module';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { UserService } from './services/user.service';

@NgModule({
	imports: [

	],
	providers: [

	],
	exports: [

	]
})
export class UserModules implements SingletonModule<UserModules> {
	public static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: UserModules,
			providers: [
				UserService,
			],
		};
	}
}
