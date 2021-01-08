import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistryModel } from 'src/app/shared/models';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/modules/auth/store/auth.reducer';
import { getIsLoading } from 'src/app/core/loading/store/loading.selectors';
import { AuthRegistry } from 'src/app/modules/auth/store/auth.actions';
import { TransplantOrgansEnum } from 'src/app/shared/enum/transplant-organs.enum';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

	public transplantOrgansList: TransplantOrgansEnum[] = [
		TransplantOrgansEnum.HEART,
		TransplantOrgansEnum.KIDNEY,
		TransplantOrgansEnum.LIVER,
		TransplantOrgansEnum.LUNGS,
		TransplantOrgansEnum.PANCREAS
	];
	public loading$: Observable<boolean>;
	public data: RegistryModel = new RegistryModel();

	constructor(
			private store: Store<{ auth: IAuthState }>,
	) {	}

	public ngOnInit(): void {
		this.loading$ = this.store.select(getIsLoading);
	}

	public onSubmit(): void {
		this.store.dispatch(new AuthRegistry(this.data));
	}
}
