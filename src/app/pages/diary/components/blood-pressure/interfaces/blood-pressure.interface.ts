import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { HandEnum } from 'src/app/pages/diary/components/blood-pressure/enum/hand.enum';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';

export interface IBloodPressureItem extends IBloodPressure {
	mode: string;
}

export interface IBloodPressure extends IBase, IWellBeing {
	id?: string;
	date?: Date;
	hand?: HandEnum | string;
	pulse?: number;
	comment?: string;
	wellBeing?: number;
	bloodPressureSystolic?: number;
	bloodPressureDiastolic?: number;
}
