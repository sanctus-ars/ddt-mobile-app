import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CrudService } from 'src/app/shared/abstract/crud.service';
import { IBloodPressure } from 'src/app/pages/diary/components/blood-pressure/interfaces/blood-pressure.interface';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';

@Injectable({
	providedIn: 'root'
})
export class BloodPressureService extends CrudService<IBloodPressure> {
	constructor(
		public storageService: StorageService,
		public dateAndTimeService: DateAndTimeService,
	) {
		super('bloodPressureSystolic', 'blood-pressure-list', storageService, dateAndTimeService);
	}
}
