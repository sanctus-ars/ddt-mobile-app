import { IBase } from 'src/app/shared/interface/base-crud.interface';

export interface IWellBeing extends IBase{
	id?: string;
	date: Date;
	time?: Date;
	diff?: number;
	comment?: string;
	wellBeing?: number;
}

