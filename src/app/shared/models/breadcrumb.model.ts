export class BreadCrumbModel {
	public url: string;
	public label: string;

	constructor(
		url: string,
		label: string
	) {
		this.url = url;
		this.label = label;
	}
}
