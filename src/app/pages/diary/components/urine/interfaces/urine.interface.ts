import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { WellBeingFlow } from 'src/app/pages/diary/components/well-being/enum/well-being-flow.enum';
import { UrineStatusEnum } from 'src/app/pages/diary/components/urine/enums/urine-status.enum';

export interface IUrine extends IBase, IWellBeing {
	id?: string;
	date?: Date;
	time?: Date;
	diff?: number;
	pain?: number;
	flow?: WellBeingFlow;
	volume?: number;
	comment?: string;
	wellBeing?: number;
	uriStatus?: UrineStatusEnum;
	incontinence?: boolean;
	urgeIntensity?: number;
}
