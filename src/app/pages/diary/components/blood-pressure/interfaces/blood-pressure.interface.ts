import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { HandEnum } from 'src/app/pages/diary/components/blood-pressure/enum/hand.enum';

export interface IBloodPressure extends IBase, IWellBeing {
	id?: string;
	date?: Date;
	time?: Date;
	diff?: number;
	hand?: HandEnum;
	pulse?: number;
	comment?: string;
	wellBeing?: number;
	arrhythmia?: boolean;
	bloodPressureSystolic?: number;
	bloodPressureDiastolic?: number;
}
