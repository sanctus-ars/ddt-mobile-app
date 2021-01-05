import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivate, CanLoad } from '@angular/router';

import { AuthCheck } from '../store/auth.actions';
import { IAuthState } from '../store/auth.reducer';

@Injectable({
	providedIn: 'root'
})
export class AuthCheckGuardService implements CanActivate, CanLoad {
	constructor(
		private store$: Store<{ auth: IAuthState}>,
	) { }

	public canLoad(): Observable<boolean> {
		this.store$.dispatch(new AuthCheck());
		return of(true);
	}

	public canActivate(): Observable<boolean> {
		this.store$.dispatch(new AuthCheck());
		return of(true);
	}
}
