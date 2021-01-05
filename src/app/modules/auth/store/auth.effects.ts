import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, pluck, catchError } from 'rxjs/operators';

import { AuthService } from '../services';
import { HistoryGoToUrl } from '../../routers/store/history.actions';
import { LoginModel, UserModel, RegistryModel, AnswerModel } from 'src/app/shared/models';
import { AuthActionsEnum, AuthLoginSuccess, AuthRegistrySuccess, AuthError, AuthLogoutSucces } from './auth.actions';
import { UserService } from 'src/app/modules/user/services/user.service';


@Injectable()
export class AuthEffects {
	@Effect()
	public check$ = this.actions$
		.pipe(
			ofType(AuthActionsEnum.AuthCheck),
			switchMap(() => {
				return this.authService
					.checkAuth()
					.pipe(
						map((isAuth: boolean): AuthLoginSuccess | AuthLogoutSucces => {
							const userData = this.userService.userValue;
							return isAuth ? new AuthLoginSuccess(userData) : new AuthLogoutSucces();
						}),
						catchError((err: AnswerModel) => of(new AuthError(err))),
					);
			}),
		);

	@Effect()
	public logout$ = this.actions$
		.pipe(
			ofType(AuthActionsEnum.AuthLogout),
			switchMap(() => {
				return this.authService
					.logout()
					.pipe(
						map(() => new AuthLogoutSucces()),
						catchError((err: AnswerModel) => of(new AuthError(err)))
					);
			}),
		);

	@Effect()
	public registry$ = this.actions$
		.pipe(
			ofType(AuthActionsEnum.AuthRegistry),
			pluck('payload'),
			switchMap((data: RegistryModel): Observable<AuthRegistrySuccess | AuthError> => {
				return this.authService
					.registry(data)
					.pipe(
						map(() => new AuthRegistrySuccess()),
						catchError((err: AnswerModel) => of(new AuthError(err)))
					);
			})
		);

	@Effect()
	public login$ = this.actions$
		.pipe(
			ofType(AuthActionsEnum.AuthLogin),
			pluck('payload'),
			switchMap((data: LoginModel): Observable<AuthLoginSuccess | AuthError> => {
				return this.authService
					.login(data)
					.pipe(
						map((answer: UserModel) => new AuthLoginSuccess(answer)),
						catchError((err: AnswerModel) => of(new AuthError(err))),
					);
			}),
		);

	@Effect()
	public loginRedirect$ = this.actions$
		.pipe(
			ofType(
				AuthActionsEnum.AuthLogout,
				AuthActionsEnum.AuthLoginRedirect,
				AuthActionsEnum.AuthRegistrySuccess,
			),
			switchMap(() => [ new HistoryGoToUrl({ url: '/login' }) ])
		);

	@Effect()
	public registryRedirect$ = this.actions$
			.pipe(
				ofType(
					AuthActionsEnum.AuthRegistryRedirect
				),
				switchMap(() => [ new HistoryGoToUrl({ url: '/signup' }) ])
			);

	@Effect({ dispatch: false })
	public authError = this.actions$
		.pipe(
			ofType(AuthActionsEnum.AuthError),
			pluck('payload'),
			map((err: HttpErrorResponse) => {
				this.toatsService.error(err.statusText, 'Auth Error');
			})
		);
	constructor(
		private actions$: Actions,
		private authService: AuthService,
		private toatsService: ToastrService,
		private userService: UserService,
	) { }
}
