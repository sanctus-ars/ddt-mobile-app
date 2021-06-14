import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/abstract/crud.service';
import { IUrine } from 'src/app/pages/diary/components/urine/interfaces/urine.interface';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';

@Injectable({
	providedIn: 'root'
})
export class UrineService extends CrudService<IUrine> {
		constructor(
			public storageService: StorageService,
			public dateAndTimeService: DateAndTimeService,
		) {
			super('volume', 'urine-list', storageService, dateAndTimeService);
		}
}
