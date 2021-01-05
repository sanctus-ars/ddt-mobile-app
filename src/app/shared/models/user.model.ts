import { IUser } from '../interface/user.interface';

export class UserModel implements IUser {
	public id: string;
	public username: string;

	public lastname: string;
	public firstname: string;

	public static create(jsonObj: object): UserModel {
		const model = new UserModel();
		const entries = Object.entries(jsonObj);
		entries.forEach((item: string[]) => {
			const propName = item[0];
			const propValue = item[1];
			model[propName] = propValue;
		});
		return model;
	}

	constructor(
		id?: string,
		username?: string,
		firstname?: string,
		lastname?: string
	) {
		this.id = id;
		this.username = username,

		this.lastname = lastname;
		this.firstname = firstname;
	}

	get name(): string {
		return this.firstname || this.username;
	}
}
