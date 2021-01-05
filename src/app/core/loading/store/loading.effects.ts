import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthActionsEnum } from 'src/app/modules/auth/store/auth.actions';
import { LoadingShow, LoadingHide } from './loading.actions';

const showActions = [

	AuthActionsEnum.AuthLogin,
	AuthActionsEnum.AuthRegistry,
];

const hideActions = [

	AuthActionsEnum.AuthError,
	AuthActionsEnum.AuthLoginSuccess,
	AuthActionsEnum.AuthRegistrySuccess,
];

@Injectable()
export class LoadingEffects {

	@Effect()
	public isShow$ = this.actions$
		.pipe(
			ofType(...showActions),
			map(() => new LoadingShow())
		);

	@Effect()
	public isHide$ = this.actions$
		.pipe(
			ofType(...hideActions),
			map(() => new LoadingHide())
		);
	constructor(
		private actions$: Actions,
	) {}
}
