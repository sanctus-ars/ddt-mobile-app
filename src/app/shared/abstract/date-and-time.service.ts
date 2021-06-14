import { Injectable } from '@angular/core';
import { IBase } from 'src/app/shared/interface/base-crud.interface';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DateAndTimeService {
	sortArray(array: IBase[]): IBase[] {
		array.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)){
				return  -1;
			} else if (moment(item.date) >= moment(pres.date)){
				return 1;
			} else {
				return 0;
			}
		});
		array.sort((item, pres) => {
			if (moment(item.time) <= moment(pres.time)){
				return  -1;
			} else if (moment(item.time) >= moment(pres.time)){
				return 1;
			} else {
				return 0;
			}
		});
		return  array;
	}
}
