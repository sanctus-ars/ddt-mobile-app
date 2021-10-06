import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { HandEnum } from 'src/app/pages/diary/components/blood-pressure/enum/hand.enum';

export class BloodPressureModel implements IBloodPressure {
	id: string;
	date: Date;
	hand?: HandEnum | string;
	pulse?: number;
	comment: string;
	wellBeing?: number;
	showSubMenu: boolean = false;
	bloodPressureSystolic?: number;
	bloodPressureDiastolic?: number;

	static create(item: IBloodPressure): BloodPressureModel {
		const model = new BloodPressureModel();
		model.id = item.id;
		model.date = item.date;
		model.hand = item.hand;
		model.pulse = item.pulse;
		model.comment = item.comment;
		model.wellBeing = item.wellBeing;
		model.showSubMenu = false;
		model.bloodPressureSystolic = item.bloodPressureSystolic;
		model.bloodPressureDiastolic = item.bloodPressureDiastolic;
		return  model;
	}
}


