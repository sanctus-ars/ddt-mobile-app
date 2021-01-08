import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/shared/models';
import { getIsLoading } from 'src/app/core/loading/store/loading.selectors';
import { IAuthState } from 'src/app/modules/auth/store/auth.reducer';
import { AuthLogin } from 'src/app/modules/auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	public loading$: Observable<boolean>;
	public data: LoginModel = new LoginModel();

	constructor(
			private store: Store<{ auth: IAuthState }>,
	) {	}

	public ngOnInit(): void {
		this.loading$ = this.store.select(getIsLoading);
	}

	public onSubmit(): void {
		this.store.dispatch(new AuthLogin(this.data));
	}
}
