import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { UserModel } from 'src/app/shared/models';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private userDataObj: BehaviorSubject<UserModel> = new BehaviorSubject(null);

	constructor() { }

	get userValue(): UserModel {
		return this.userDataObj.value;
	}
	public getData(): BehaviorSubject<UserModel> {
		return this.userDataObj;
	}

	public setData(model: UserModel): BehaviorSubject<UserModel> {
		this.userDataObj.next(model);
		return this.userDataObj;
	}

	public updateData(model: UserModel): BehaviorSubject<UserModel> {
		this.userDataObj.next(model);
		return this.userDataObj;
	}

	public removeData(): BehaviorSubject<UserModel> {
		this.userDataObj.next(null);
		return this.userDataObj;
	}
}
