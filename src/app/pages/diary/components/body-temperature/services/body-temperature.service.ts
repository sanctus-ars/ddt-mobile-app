import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as moment from 'moment';
import { IBodyTemperature } from 'src/app/pages/diary/components/body-temperature/interfaces/body-temperature.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class BodyTemperatureService {
	public weightList: BehaviorSubject<IBodyTemperature[]> = new BehaviorSubject<IBodyTemperature[]>([]);
	constructor(
		private storageService: StorageService,
	) {
	}

	public storageListKey = 'body-temperatures-list';

	public addBodyTemperature(data: IBodyTemperature): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IBodyTemperature[] = []) => {
			let result;
			data.id = uuidv4();
			if (!!temperatures) {
				if (temperatures.length >= 1) {
					const lastItem: IBodyTemperature = temperatures[temperatures.length - 1];
					data.diff = data.temperature - lastItem.temperature;
				}
				result = [...temperatures, data];
			} else {
				result = [data];
			}
			const clearResult = this.fixItems(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public removeBodyTemperature(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IBodyTemperature[]) => {
			const result = temperatures.filter((x) => x.id !== id);
			const clearResult = this.fixItems(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public editBodyTemperature(item: IBodyTemperature): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: IBodyTemperature[]) => {
			const result = temperatures.map((x, index, array) => {
				return x.id === item.id ? item : x;
			});
			const clearResult = this.fixItems(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public getBodyTemperatureList(): Promise<IBodyTemperature[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public init() {
		const weightListPromise = this.storageService.getObject(this.storageListKey);
		Promise.all([ weightListPromise]).then((result: [ IBodyTemperature[]]) => {
			const [ weightList] = result;
			this.weightList.next(weightList);
		});
	}

	private fixItems(data: IBodyTemperature[]): IBodyTemperature[] {
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
				item.diff = item.temperature - array[index - 1].temperature;
			}
			return item;
		});
	}
}
