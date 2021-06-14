import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';

export interface IWellBeing extends IBase{
	id?: string;
	date?: Date;
	time?: Date;
	diff?: number;
	flow?: WellBeingFlow;
	comment?: string;
	wellBeing?: number;
}

