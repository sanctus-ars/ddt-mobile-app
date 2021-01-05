export class InputResultModel {
	public name: string;
	public value: string | number;

	constructor(name: string, value: string | number) {
		this.name = name;
		this.value = value;
	}
}
