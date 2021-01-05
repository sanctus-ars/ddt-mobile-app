export class HistoryRouterModel {
	public url: string;
	public label: string;

	public path?: string;

	constructor(
		url: string,
		label: string,

		path?: string,
	) {
		this.url = url;
		this.path = path;
		this.label = label;
	}
}
