import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IDoctorVisit } from 'src/app/pages/doctors/interface/doctor.interface';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DoctorVisitsService {
	private storageListKey = 'doctor_visits_list';
	public doctorVisits: BehaviorSubject<IDoctorVisit[]> = new BehaviorSubject<IDoctorVisit[]>([]);

	constructor(
		private storageService: StorageService
	) { }

	public async getDoctorVisits(): Promise<IDoctorVisit[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public async setDoctorVisits(list: IDoctorVisit[]) {
		return this.storageService.setObject(this.storageListKey, list)
			.then(() => {
				this.doctorVisits.next(list);
			});
	}

	public async removeDoctorVisit(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IDoctorVisit[]) => {
			const result = list.filter((x) => x.id !== id);
			this.doctorVisits.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async addDoctorVisit(item: IDoctorVisit): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IDoctorVisit[] = []) => {
			let result;
			item.id = uuidv4();
			if (!!list) {
				result = [...list, item];
			} else {
				result = [item];
			}
			this.doctorVisits.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async editDoctorVisit(item: IDoctorVisit): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((list: IDoctorVisit[]) => {
			const result = list.map((x, index, array) => {
				return x.id === item.id ? item : x;
			});
			this.doctorVisits.next(result);
			return this.storageService.setObject(this.storageListKey, result);
		});
	}

	public async init(): Promise<void> {
		return this.storageService.getObject(this.storageListKey)
			.then((list: IDoctorVisit[]) => {
				this.doctorVisits.next(list || []);
			});
	}
}
