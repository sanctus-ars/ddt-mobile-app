import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserModel } from 'src/app/shared/models';
import { ApiClient } from 'src/app/shared/services/api.service';
import { JwtService } from './jwt.service';
import { LoginModel } from 'src/app/shared/models/login.model';
import { AnswerModel } from 'src/app/shared/models/answer.model';
import { UserService } from '../../user/services/user.service';
import { RegistryModel } from 'src/app/shared/models/registry.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private isAuthObj: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		private apiClient: ApiClient,
		private jwtService: JwtService,
		private userService: UserService,
	) {	}

	get isAuth(): boolean {
		return this.isAuthObj.value;
	}

	public checkAuth(): Observable<boolean> {
		const token = this.jwtService.getToken();
		if (token) {
			if (!this.isAuthObj.value) {
				const jwtData = JwtService.decodeToken<object>(token);
				const userData = UserModel.create(jwtData);

				this.isAuthObj.next(true);
				this.userService.setData(userData);
			}
		} else {
			if (this.isAuthObj.value) {
				this.isAuthObj.next(false);
				this.userService.removeData();
			}
		}
		return this.isAuthObj;
	}

	public registry(data: RegistryModel): Observable<AnswerModel> {
		return this.apiClient.post<AnswerModel>('signup/local/', data);
	}

	public login(data: LoginModel): Observable<AnswerModel | UserModel> {
		if (this.isAuthObj.value) {
			this.isAuthObj.error(new Error('You are already logged. Please, log out first!'));
		}

		return this.apiClient.post<AnswerModel>('signin/local/', data)
			.pipe(
				map((answer: AnswerModel): AnswerModel | UserModel  => {
					const token = answer.token;
					if (!token) { return answer; }
					const jwtData = JwtService.decodeToken<object>(token);
					const userData = UserModel.create(jwtData);

					this.isAuthObj.next(true);
					this.jwtService.setToken(token);
					this.userService.setData(userData);
					return userData;
				})
			);
	}

	public logout(): Observable<boolean> {
		if (!this.isAuthObj.value) {
			throw new Error('You are not auth. Please, login first!');
		}

		this.isAuthObj.next(false);
		this.jwtService.removeToken();
		this.userService.removeData();
		return this.isAuthObj;
	}
}
