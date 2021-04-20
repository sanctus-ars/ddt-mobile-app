import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as moment from 'moment';
import { IWellBeing } from 'src/app/pages/diary/components/well-being/interfaces/well-being.interface';
import { v4 as uuidv4 } from 'uuid';
import { CrudService } from 'src/app/shared/abstract/crud.service';

@Injectable({
	providedIn: 'root'
})
export class WellBeingService extends CrudService<IWellBeing> {
	public wellBeingList: BehaviorSubject<IWellBeing[]> = new BehaviorSubject<IWellBeing[]>([]);
	constructor(
		public storageService: StorageService,
	) {
		super('wellBeing', 'well-being-list', storageService);
	}

	//	public storageListKey = 'body-temperatures-list';

	/*public addWellBeing(data: IWellBeing): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IWellBeing[] = []) => {
			let result;
			data.id = uuidv4();
			if (!!temperatures) {
				if (temperatures.length >= 1) {
					const lastItem: IWellBeing = temperatures[temperatures.length - 1];
					data.diff = data.wellBeing - lastItem.wellBeing;
				}
				result = [...temperatures, data];
			} else {
				result = [data];
			}
			const clearResult = this.fixItems(result);
			this.wellBeingList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public removeWellBeing(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IWellBeing[]) => {
			const result = temperatures.filter((x) => x.id !== id);
			const clearResult = this.fixItems(result);
			this.wellBeingList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public editWellBeing(item: IWellBeing): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IWellBeing[]) => {
			const result = temperatures.map((x, index, array) => {
				return x.id === item.id ? item : x;
			});
			const clearResult = this.fixItems(result);
			this.wellBeingList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public getWellBeingList(): Promise<IWellBeing[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public init() {
		const weightListPromise = this.storageService.getObject(this.storageListKey);
		Promise.all([ weightListPromise]).then((result: [ IWellBeing[]]) => {
			const [ weightList] = result;
			this.wellBeingList.next(weightList);
		});
	}

	private fixItems(data: IWellBeing[]): IWellBeing[] {
		data.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)){
				return  -1;
			} else if (moment(item.date) >= moment(pres.date)){
				return 1;
			} else {
				return 0;
			}
		});
		data.sort((item, pres) => {
			if (moment(item.time) <= moment(pres.time)){
				return  -1;
			} else if (moment(item.time) >= moment(pres.time)){
				return 1;
			} else {
				return 0;
			}
		});
		return  data.map((item, index, array) => {
			if (index >= 1) {
				item.diff = item.wellBeing - array[index - 1].wellBeing;
			}
			return item;
		});
	}*/
}
