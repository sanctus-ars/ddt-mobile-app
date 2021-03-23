import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	public async setObject(key: string, data: object): Promise<void> {
		return await Storage.set({
			key,
			value: JSON.stringify(data)
		});
	}

	public async getObject<T>(key: string): Promise<T> {
		const result = await Storage.get({ key });
		return JSON.parse(result.value);
	}

	public async removeItem(key: string): Promise<void> {
		return await Storage.remove({ key });
	}

	public async keys(): Promise<string[]>{
		const { keys } = await Storage.keys();
		return keys;
	}

	public async clear(): Promise<void> {
		return await Storage.clear();
	}

	constructor() {
	}
}
