import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { IBase } from 'src/app/shared/interface/base-crud.interface';
import { DateAndTimeService } from 'src/app/shared/abstract/date-and-time.service';


export class CrudService<T extends IBase> {
	public list: BehaviorSubject<IBase[]> = new BehaviorSubject<IBase[]>([]);
	public storageListKey: string;

	constructor(
		public mainProp: string,
		public storageKey: string,
		public storageService: StorageService,
		public dateAndTimeService: DateAndTimeService,
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
					data.diff = +(data[this.mainProp] - lastItem[this.mainProp]).toFixed(2) ;
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

	private fixItems(data: IBase[]): IBase[] {
		const clearArray: IBase[] = this.dateAndTimeService.sortArray(data);
		return clearArray.map((item, index, array) => {
			if (index >= 1) {
				item.diff = +(item[this.mainProp] - array[index - 1][this.mainProp]).toFixed(2);
			}
			return item;
		});
	}

}
