import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	private storageKey = 'app-settings';

	public appSettings: BehaviorSubject<ISettings> = new BehaviorSubject<ISettings>({});

	public async setSettings(data: ISettings): Promise<void> {
		this.appSettings.next(data);
		return this.storageService.setObject(this.storageKey, data);
	}
	public async getSettings(): Promise<ISettings> {
		return this.storageService.getObject<ISettings>(this.storageKey);
	}

	public async init(): Promise<void> {
		return this.storageService.getObject<ISettings>(this.storageKey).then((settings: ISettings) => {
			this.appSettings.next(settings);
		});
	}
	constructor(
		private storageService: StorageService
	) {
	}
}
