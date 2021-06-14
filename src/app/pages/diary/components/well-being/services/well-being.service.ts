import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { CrudService } from 'src/app/shared/abstract/crud.service';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';

@Injectable({
	providedIn: 'root'
})
export class WellBeingService extends CrudService<IWellBeing> {
	constructor(
		public storageService: StorageService,
		public dateAndTimeService: DateAndTimeService,
	) {
		super('wellBeing', 'well-being-list', storageService, dateAndTimeService);
	}
}
