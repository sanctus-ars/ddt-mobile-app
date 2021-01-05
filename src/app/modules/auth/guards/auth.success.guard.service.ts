import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { IAuthState } from '../store/auth.reducer';
import { getAuthStatus } from '../store/auth.selectors';
import { AuthLoginRedirect, AuthCheck } from '../store/auth.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthSuccessGuardService implements CanActivate, CanLoad {
	constructor(
		private store$: Store<{ auth: IAuthState }>,
	) { }

	public canActivate(): Observable<boolean>  {
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
				if (isAuth) { return true; }

				this.store$.dispatch(new AuthLoginRedirect());
				return false;
			}),
		);
	}
}
