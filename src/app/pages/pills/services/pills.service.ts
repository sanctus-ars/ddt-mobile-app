import { StorageService } from 'src/app/shared/services/storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
	providedIn: 'root'
})
export class PillsService {
	private storageListKey = 'pills_list';
	public pillsList: BehaviorSubject<IPills[]> = new BehaviorSubject<IPills[]>([]);

	constructor(
		private storageService: StorageService
	) { }

	public async getPills(): Promise<IPills[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public async setPills(list: IPills[]) {
		return this.storageService.setObject(this.storageListKey, list)
			.then(() => {
				this.pillsList.next(list);
			});
	}

	public async removePill(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IPills[]) => {
			const result = list.filter((x) => x.id !== id);
			this.pillsList.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async addPill(item: IPills): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IPills[] = []) => {
			let result;
			item.id = uuidv4();
			if (!!list) {
				result = [...list, item];
			} else {
				result = [item];
			}
			this.pillsList.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async editPills(item: IPills): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IPills[]) => {
			const result = list.map((x, index, array) => {
				return x.id === item.id ? item : x;
			});
			this.pillsList.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async init(): Promise<void> {
		return this.storageService.getObject(this.storageListKey)
			.then((list: IPills[]) => {
				this.pillsList.next(list);
			});
	}
}
