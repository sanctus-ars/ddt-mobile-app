export class AnswerModel {
	public status: number;

	public data?: any;
	public token?: string;
	public errors?: string[] = [];
	public message?: string;
	public hasErrors = false;

	constructor(
		status: number,
		data?: object,
		token?: string,
		errors?: string[],
		message?: string,
		hasErrors?: boolean,
	) {
		this.status = status;

		this.data = data;
		this.token = token;
		this.errors = errors;
		this.message = message;
		this.hasErrors = hasErrors;
	}
}
