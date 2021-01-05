import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { map, switchMap, pluck, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { HistoryService } from '../history.service';
import { AuthActionsEnum } from '../../auth/store/auth.actions';
import { HistroyActionsEnum, HistorySuccess } from './history.actions';

@Injectable()
export class HistoryEffects {
	@Effect({ dispatch: false })
	public isLoading = this.actions$
		.pipe(
			ofType(HistroyActionsEnum.Loading),
			tap(() => {
				this.historyService.loadHistory();
			})
		);

	@Effect()
	public toMain$ = this.actions$
		.pipe(
			ofType(
				AuthActionsEnum.AuthLoginSuccess,
				HistroyActionsEnum.GoMain,
			),
			map(() => this.historyService.goTo('/')),
			switchMap(() => of(
				new HistorySuccess(this.historyService.getHistoryValue)
			))
		);

	@Effect()
	public toBack$ = this.actions$
		.pipe(
			ofType(HistroyActionsEnum.GoBack),
			pluck('payload'),
			map(() => this.historyService.goBack()),
			switchMap(() => of(
				new HistorySuccess(this.historyService.getHistoryValue)
			))
		);

	@Effect()
	public toError$ = this.actions$
		.pipe(
			ofType(HistroyActionsEnum.GoToError),
			pluck('payload'),
			map(() => this.historyService.goToError()),
			switchMap(() => of(
				new HistorySuccess(this.historyService.getHistoryValue)
			))
		);

	@Effect()
	public toUrl$ = this.actions$
		.pipe(
			ofType(HistroyActionsEnum.GoToUrl),
			pluck('payload'),
			map((data: {url: string, extras?: NavigationExtras }) => {
				return this.historyService.goTo(data.url, data.extras);
			}),
			switchMap(() => of(
				new HistorySuccess(this.historyService.getHistoryValue)
			))
		);

	constructor(
		private actions$: Actions,
		private historyService: HistoryService,
	) {}
}
