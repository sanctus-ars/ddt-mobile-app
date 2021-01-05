import * as uuid from 'uuid/v4';

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
		this.token = token || uuid();
		this.provider = provider || 'local';
	}
}
