import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	private storageKey = 'app-settings';

	public async setSettings(data: ISettings): Promise<void> {
		return this.storageService.setObject(this.storageKey, data);
	}
	public async getSettings(): Promise<ISettings> {
		return this.storageService.getObject<ISettings>(this.storageKey);
	}
	constructor(
		private storageService: StorageService
	) {
	}
}
