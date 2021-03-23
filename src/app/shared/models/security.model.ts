import { v4 as uuidv4 } from 'uuid';

export class SecurityModel {
	public token: string;
	public provider: string;

	public static create(data: object, provider?: string, token?: string): object {
		const securityModel = new SecurityModel(token, provider);
		return Object.assign(data, securityModel);
	}

	constructor(
		token?: string,
		provider?: string
	) {
		this.token = token || uuidv4();
		this.provider = provider || 'local';
	}
}
