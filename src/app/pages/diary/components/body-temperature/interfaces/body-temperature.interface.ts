import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';

export interface IBodyTemperature extends IBase, IWellBeing {
	id: string;
	date: Date;
	time: Date;
	diff: number;
	comment: string;
	wellBeing: number;
	temperature: number;
}
