import { SecurityModel } from 'src/app/shared/models/security.model';

export class RegistryModel extends SecurityModel {
	public email: string;
	public lastName: string;
	public firstName: string;
	public password: string;
	public passwordConfirmation: string;
	public country: string;
	public city: string;
	public birthdayData: string;
	public phone: string;
	public organTransplant: string;
	public organTransplantData: string;

	constructor(
		email?: string,
		password?: string,
		passwordConfirmation?: string,

		firstName?: string,
		lastName?: string,

		token?: string,
		provider?: string,
	) {
		super(token, provider);

		this.email = email;
		this.password = password;
		this.lastName = lastName;
		this.firstName = firstName;
		this.passwordConfirmation = passwordConfirmation;
	}
}
