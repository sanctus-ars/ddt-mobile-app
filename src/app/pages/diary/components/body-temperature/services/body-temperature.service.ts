import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { CrudService } from 'src/app/shared/abstract/crud.service';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';

@Injectable({
	providedIn: 'root'
})
export class BodyTemperatureService extends CrudService<IBodyTemperature>{
	constructor(
		public storageService: StorageService,
		public dateAndTimeService: DateAndTimeService,
	) {
		super( 'temperature', 'body-temperatures-list', storageService, dateAndTimeService);
	}
}
