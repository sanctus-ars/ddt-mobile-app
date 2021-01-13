import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel } from 'src/app/shared/models';
import { BloodPressureModel } from 'src/app/modules/blood-pressure/models/blood-pressure.model';
import { ApiClient } from 'src/app/shared/services/api.service';
import { pluck } from 'rxjs/operators';

const BASE_URL = 'blood-pressure';

@Injectable({
	providedIn: 'root'
})
export class BloodPressureService  {
	constructor(
		private apiClient: ApiClient,
	) {	}

	public create(data: BloodPressureModel): Observable<BloodPressureModel> {
		return this.apiClient
			.post<AnswerModel>(BASE_URL, data)
			.pipe(pluck('data'));
	}

	public update(id: string, data: BloodPressureModel): Observable<BloodPressureModel> {
		const resultUri = `${BASE_URL}/${id}`;
		return this.apiClient
			.put<AnswerModel>(resultUri, data)
			.pipe(pluck('data'));
	}

	public remove(id: number): Observable<BloodPressureModel> {
		const resultUri = `${BASE_URL}/${id}`;
		return this.apiClient
			.delete<AnswerModel>(resultUri)
			.pipe(
				pluck('data'),
			);
	}

	public getAll(): Observable<BloodPressureModel[]> {
		return this.apiClient
			.get<AnswerModel>(BASE_URL)
			.pipe(
				pluck('data'),
			);
	}

	public getById(id: string): Observable<BloodPressureModel> {
		const resultUri = `${BASE_URL}/${id}`;
		return this.apiClient
			.get<AnswerModel>(resultUri)
			.pipe(
				pluck('data'),
			);
	}
}
