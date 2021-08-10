import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';

export class WeightHistoryModel implements IWeight {
	id: string;
	date: Date;
	diff: number;
	weight: number;
	comment: string;
	showSubMenu: boolean = false;

	static create(item: IWeight): WeightHistoryModel {
		const model = new WeightHistoryModel();
		model.id = item.id;
		model.date = item.date;
		model.diff = item.diff;
		model.weight = item.weight;
		model.comment = item.comment;
		model.showSubMenu = false;
		return  model;
	}
}


