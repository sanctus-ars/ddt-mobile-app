import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { UserModel } from 'src/app/shared/models';
import { UserService } from '../services/user.service';
import { UserActionsEnum, ReadSuccess, UserError, DeleteSuccess, UpdateSuccess } from './user.actions';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

	@Effect()
	public read$ = this.actions$
		.pipe(
			ofType(UserActionsEnum.Read),
			switchMap(() =>
				this.userService
					.getData()
					.pipe(
						map((user: UserModel) => new ReadSuccess(user)),
						catchError(() => of(new UserError()))
					)
			)
		);

	@Effect()
	public delete$ = this.actions$
		.pipe(
			ofType(UserActionsEnum.Delete),
			map(() =>
				this.userService
					.removeData()
					.pipe(
						map(() => new DeleteSuccess()),
						catchError(() => of(new UserError()))
					)
			)
		);

	@Effect()
	public create$ = this.actions$
		.pipe(
			ofType(UserActionsEnum.Create),
			map((data: UserModel) => this.userService
				.setData(data)
				.pipe(
					map(() => new DeleteSuccess()),
					catchError(() => of(new UserError()))
				)
			)
		);

	@Effect()
	public update$ = this.actions$
		.pipe(
			ofType(UserActionsEnum.Update),
			map((data: UserModel) =>
				this.userService
				.updateData(data)
				.pipe(
					map((user: UserModel) => new UpdateSuccess(user)),
					catchError(() => of(new UserError()))
				)
			)
		);

	constructor(
		private actions$: Actions,
		private userService: UserService,
	) {}

}
