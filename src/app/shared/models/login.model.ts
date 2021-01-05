import { SecurityModel } from './security.model';

export class LoginModel extends SecurityModel {
	public username: string;
	public password: string;

	constructor(
		username?: string,
		password?: string,
		token?: string,
		provider?: string,
	) {
		super(token, provider);
		this.username = username;
		this.password = password;
	}
}
