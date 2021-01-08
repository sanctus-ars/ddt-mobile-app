import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import {
	JwtService,
	AuthService,
} from './services';

import {
	AuthSuccessGuardService,
	AuthFailGuardService,
	AuthCheckGuardService,
} from './guards';
import { SingletonModule } from 'src/app/shared/abstract/singleton.module';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [

	],
	exports: [

	]
})
export class AuthModule implements SingletonModule<AuthModule> {
	public static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService,
				JwtService,

				AuthFailGuardService,
				AuthCheckGuardService,
				AuthSuccessGuardService,
			],
		};
	}
}
