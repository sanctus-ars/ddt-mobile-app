import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';

import { IAuthState } from '../store/auth.reducer';
import { getAuthStatus } from '../store/auth.selectors';
import { HistoryGoMain } from '../../routers/store/history.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthFailGuardService implements CanActivate, CanLoad {
	constructor(
		private store$: Store<{ auth: IAuthState}>,
	) { }

	public canActivate(): Observable<boolean> | boolean {
		return this.validateAuthStatus(this.getAuthStatus());
	}

	public canLoad(): Observable<boolean> {
		return this.validateAuthStatus(this.getAuthStatus());
	}

	private getAuthStatus(): Observable<boolean> {
		return this.store$.pipe(select(getAuthStatus), take(1));
	}

	private validateAuthStatus(authStatus: Observable<boolean>): Observable<boolean> {
		return authStatus.pipe(
			map((isAuth: boolean) => {
				if (!isAuth) { return true; }

				this.store$.dispatch(new HistoryGoMain());
				return false;
			}),
		);
	}
}
