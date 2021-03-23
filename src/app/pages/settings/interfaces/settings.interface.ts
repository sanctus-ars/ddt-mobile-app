import { SexEnum } from 'src/app/shared/enum/sex.enum';
import { TransplantOrgansEnum } from 'src/app/shared/enum/transplant-organs.enum';

export class ISettings {
	public sex: SexEnum;
	public name: string;
	public growth: number;
	public birthday: string;
	public transplantDate: string;
	public transplantOrgan: TransplantOrgansEnum;
}
