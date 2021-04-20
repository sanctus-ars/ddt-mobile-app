import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { IBase } from 'src/app/shared/interface/base-crud.interface';


export class CrudService<T extends IBase> {
	public list: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
	public storageListKey: string;

	constructor(
		public mainProp: string,
		public storageKey: string,
		public storageService: StorageService,
	) {
		this.storageListKey = storageKey;
	}

	public create(data: T): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: T[] = []) => {
			let result;
			data.id = uuidv4();
			if (!!list) {
				if (list.length >= 1) {
					const lastItem: T = list[list.length - 1];
					data.diff = data[this.mainProp] - lastItem[this.mainProp] ;
				}
				result = [...list, data];
			} else {
				result = [data];
			}
			const clearResult = this.fixItems(result);
			this.list.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}
	public update(item: T): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: T[]) => {
			const result = list.map((x, index, array) => {
				return x.id === item.id ? item : x;
			});
			const clearResult = this.fixItems(result);
			this.list.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}
	public remove(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((temperatures: T[]) => {
			const result = temperatures.filter((x) => x.id !== id);
			const clearResult = this.fixItems(result);
			this.list.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public get(): Promise<T[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public init() {
		const weightListPromise = this.storageService.getObject(this.storageListKey);
		Promise.all([ weightListPromise]).then((result: [ T[]]) => {
			const [ weightList] = result;
			this.list.next(weightList);
		});
	}

	private fixItems(data: T[]): T[] {
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
				item.diff = item[this.mainProp] - array[index - 1][this.mainProp];
			}
			return item;
		});
	}

}
