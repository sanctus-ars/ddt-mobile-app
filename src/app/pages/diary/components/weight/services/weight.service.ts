import { Injectable } from '@angular/core';
import { SexEnum } from 'src/app/shared/enum/sex.enum';
import { StorageService } from 'src/app/shared/services/storage.service';
import { IWeight } from 'src/app/pages/diary/components/weight/interfaces/weight.interface';
import { v4 as uuidv4 } from 'uuid';
import { IWeightSettings } from 'src/app/pages/diary/components/weight/interfaces/weight-settings.interface';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WeightService {
	public weightList: BehaviorSubject<IWeight[]> = new BehaviorSubject<IWeight[]>([]);
	public weightSettings: BehaviorSubject<IWeightSettings> = new BehaviorSubject<IWeightSettings>({});
	constructor(
		private storageService: StorageService,
	) {
	}

	public storageListKey = 'weight-list';
	public storageSettingsKey = 'weight-settings';

	public getSettings(): Promise<IWeightSettings> {
		return this.storageService.getObject(this.storageSettingsKey);
	}

	public setSettings(settings: IWeightSettings): Promise<void> {
		this.weightSettings.next(settings);
		return this.storageService.setObject(this.storageSettingsKey, settings);
	}

	public addWeight(data: IWeight): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((weights: IWeight[] = []) => {
			let result;
			data.id = uuidv4();
			if (!!weights) {
				if (weights.length >= 1) {
					const lastItem: IWeight = weights[weights.length - 1];
					data.diff = data.weight - lastItem.weight;
				}
				result = [...weights, data];
			} else {
				result = [data];
			}
			const clearResult = this.fixDiffs(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public removeWeight(id: string): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((weights: IWeight[]) => {
			const result = weights.filter((x) => x.id !== id);
			const clearResult = this.fixDiffs(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public editWeight(weight: IWeight): Promise<void> {
		return this.storageService.getObject(this.storageListKey).then((weights: IWeight[]) => {
			const result = weights.map((x, index, array) => {
				return x.id === weight.id ? weight : x;
			});
			const clearResult = this.fixDiffs(result);
			this.weightList.next(clearResult);
			return this.storageService.setObject(this.storageListKey, clearResult);
		});
	}

	public getWeights(): Promise<IWeight[]> {
		return this.storageService.getObject(this.storageListKey);
	}

	public init() {
		const weightListPromise = this.storageService.getObject(this.storageListKey);
		const weightSettingsPromise = this.storageService.getObject(this.storageSettingsKey);
		Promise.all([ weightListPromise, weightSettingsPromise]).then((result: [ IWeight[], IWeightSettings]) => {
			const [ weightList, weightSettings] = result;
			this.weightList.next(weightList);
			this.weightSettings.next(weightSettings);
		});
	}
	private fixDiffs(data: IWeight[]): IWeight[] {
		data.sort((item, pres) => {
			if (moment(item.date) <= moment(pres.date)){
				return  -1;
			} else if (moment(item.date) >= moment(pres.date)){
				return 1;
			} else {
				return 0;
			}
		});
		return  data.map((item, index, array) => {
			if (index >= 1) {
				item.diff = item.weight - array[index - 1].weight;
			}
			return item;
		});
	}
	public getNormWeight(age: number, growth: number, sex: SexEnum): number {
	    if (growth < 150 && growth >= 148 ) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 50.8;
						} else if ( age >= 30 && age <= 30) {
							return 55;
						} else if ( age >= 40 && age <= 49) {
							return 56.6;
						} else if ( age >= 50 && age <= 59) {
							return 56;
						} else if ( age >= 60 && age <= 69) {
							return 53.9;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 48.4;
						} else if ( age >= 30 && age <= 30) {
							return 52.3;
						} else if ( age >= 40 && age <= 49) {
							return 54.7;
						} else if ( age >= 50 && age <= 59 ) {
							return 53.2;
						} else if ( age >= 60 && age <= 69) {
							return 52.2;
						}
						break;
				}
			} else if (growth < 152 && growth >= 150) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 51.3;
						} else if ( age >= 30 && age <= 30) {
							return 56.7;
						} else if ( age >= 40 && age <= 49) {
							return 58.1;
						} else if ( age >= 50 && age <= 59) {
							return 58;
						} else if ( age >= 60 && age <= 69) {
							return 57.3;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && 29 <= age) {
							return 48.9;
						} else if ( age >= 30 && age <= 30) {
							return 53.9;
						} else if ( age >= 40 && age <= 49) {
							return 56.5;
						} else if ( age >= 50 && age <= 59) {
							return 55.7;
						} else if ( age >= 60 && age <= 69) {
							return 54.8;
						}
						break;
				}
			} else if (growth < 154 && growth >= 152) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && 29 <= age) {
							return 51.3;
						} else if ( age >= 30 && age <= 30) {
							return 58.7;
						} else if ( age >= 40 && age <= 49) {
							return 61.5;
						} else if ( age >= 50 && age <= 59) {
							return 61.1;
						} else if ( age >= 60 && age <= 69) {
							return 60.3;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && 29 <= age) {
							return 51;
						} else if ( age >= 30 && age <= 30) {
							return 55;
						} else if ( age >= 40 && age <= 49) {
							return 59.5;
						} else if ( age >= 50 && age <= 59) {
							return 57.6;
						} else if ( age >= 60 && age <= 69) {
							return 55.9;
						}
						break;
				}
			} else if (growth < 156 && growth >= 154) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && 29 <= age) {
							return 55.3;
						} else if ( age >= 30 && age <= 30) {
							return 61.6;
						} else if ( age >= 40 && age <= 49) {
							return 64.5;
						} else if ( age >= 50 && age <= 59) {
							return 63.8;
						} else if ( age >= 60 && age <= 69) {
							return 61.9;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && 29 <= age) {
							return 53;
						} else if ( age >= 30 && age <= 30) {
							return 59.1;
						} else if ( age >= 40 && age <= 49) {
							return 62.4;
						} else if ( age >= 50 && age <= 59) {
							return 60.2;
						} else if ( age >= 60 && age <= 69) {
							return 59;
						}
						break;
				}
			} else if (growth < 158 && growth >= 156) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 58.5;
						} else if ( age >= 30 && age <= 30) {
							return 64.4;
						} else if ( age >= 40 && age <= 49) {
							return 67.3;
						} else if ( age >= 50 && age <= 59) {
							return 65.8;
						} else if ( age >= 60 && age <= 69) {
							return 63.7;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 55.8;
						} else if ( age >= 30 && age <= 30) {
							return 61.6;
						} else if ( age >= 40 && age <= 49) {
							return 66;
						} else if ( age >= 50 && age <= 59) {
							return 62.4;
						} else if ( age >= 60 && age <= 69) {
							return 60.9;
						}
						break;
				}
			} else if (growth < 160 && growth >= 158) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 61.2;
						} else if ( age >= 30 && age <= 30) {
							return 67.3;
						} else if ( age >= 40 && age <= 49) {
							return 70.4;
						} else if ( age >= 50 && age <= 59) {
							return 68;
						} else if ( age >= 60 && age <= 69) {
							return 67;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 58.1;
						} else if ( age >= 30 && age <= 30) {
							return 64.1;
						} else if ( age >= 40 && age <= 49) {
							return 67.9;
						} else if ( age >= 50 && age <= 59) {
							return 64.5;
						} else if ( age >= 60 && age <= 69) {
							return 62.4;
						}
						break;
				}
			} else if (growth < 162 && growth >= 160) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 62.9;
						} else if ( age >= 30 && age <= 30) {
							return 69.2;
						} else if ( age >= 40 && age <= 49) {
							return 72.3;
						} else if ( age >= 50 && age <= 59) {
							return 69.7;
						} else if ( age >= 60 && age <= 69) {
							return 68.2;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 59.8;
						} else if ( age >= 30 && age <= 30) {
							return 65.8;
						} else if ( age >= 40 && age <= 49) {
							return 69.9;
						} else if ( age >= 50 && age <= 59) {
							return 65.8;
						} else if ( age >= 60 && age <= 69) {
							return 64.6;
						}
						break;
				}
			} else if (growth < 164 && growth >= 162) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 64.6;
						} else if ( age >= 30 && age <= 30) {
							return 71;
						} else if ( age >= 40 && age <= 49) {
							return 74.4;
						} else if ( age >= 50 && age <= 59) {
							return 72.7;
						} else if ( age >= 60 && age <= 69) {
							return 69.1;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 61.6;
						} else if ( age >= 30 && age <= 30) {
							return 68.5;
						} else if ( age >= 40 && age <= 49) {
							return 72.7;
						} else if ( age >= 50 && age <= 59) {
							return 68.7;
						} else if ( age >= 60 && age <= 69) {
							return 66.5;
						}
						break;
				}
			} else if (growth < 166 && growth >= 164) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 67.3;
						} else if ( age >= 30 && age <= 30) {
							return 73.9;
						} else if ( age >= 40 && age <= 49) {
							return 77.2;
						} else if ( age >= 50 && age <= 59) {
							return 75.6;
						} else if ( age >= 60 && age <= 69) {
							return 72.2;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 63.6;
						} else if ( age >= 30 && age <= 30) {
							return 70.8;
						} else if ( age >= 40 && age <= 49) {
							return 74;
						} else if ( age >= 50 && age <= 59) {
							return 72;
						} else if ( age >= 60 && age <= 69) {
							return 70;
						}
						break;
				}
			} else if (growth < 168 && growth >= 166) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 68.8;
						} else if ( age >= 30 && age <= 30) {
							return 74.5;
						} else if ( age >= 40 && age <= 49) {
							return 78;
						} else if ( age >= 50 && age <= 59) {
							return 76.3;
						} else if ( age >= 60 && age <= 69 ) {
							return 74.4;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 65.2;
						} else if ( age >= 30 && age <= 30 ) {
							return 71.8;
						} else if ( age >= 40 && age <= 49) {
							return 76.5;
						} else if ( age >= 50 && age <= 59) {
							return 73.8;
						} else if ( age >= 60 && age <= 69) {
							return 71.3;
						}
						break;
				}
			} else if (growth < 170 && growth >= 168) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 70.8;
						} else if ( age >= 30 && age <= 30) {
							return 76.3;
						} else if ( age >= 40 && age <= 49) {
							return 79.6;
						} else if ( age >= 50 && age <= 59) {
							return 77.9;
						} else if ( age >= 60 && age <= 69) {
							return 76;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 68.5;
						} else if ( age >= 30 && age <= 30) {
							return 73.7;
						} else if ( age >= 40 && age <= 49) {
							return 78.2;
						} else if ( age >= 50 && age <= 59) {
							return 74.8;
						} else if ( age >= 60 && age <= 69) {
							return 73.3;
						}
						break;
				}
			} else if (growth < 172 && growth >= 170) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 72.7;
						} else if ( age >= 30 && age <= 30) {
							return 77.7;
						} else if ( age >= 40 && age <= 49) {
							return 81;
						} else if ( age >= 50 && age <= 59) {
							return 79.6;
						} else if ( age >= 60 && age <= 69) {
							return 76.9;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 69.2;
						} else if ( age >= 30 && age <= 30) {
							return 75.8;
						} else if ( age >= 40 && age <= 49) {
							return 79.8;
						} else if ( age >= 50 && age <= 59) {
							return 76.8;
						} else if ( age >= 60 && age <= 69) {
							return 75;
						}
						break;
				}
			} else if (growth < 174 && growth >= 172) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 74.1;
						} else if ( age >= 30 && age <= 30) {
							return 79.3;
						} else if ( age >= 40 && age <= 49) {
							return 82.8;
						} else if ( age >= 50 && age <= 59) {
							return 81.1;
						} else if ( age >= 60 && age <= 69) {
							return 78.3;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 72.8;
						} else if ( age >= 30 && age <= 30) {
							return 77;
						} else if ( age >= 40 && age <= 49) {
							return 81.7;
						} else if ( age >= 50 && age <= 59) {
							return 77.7;
						} else if ( age >= 60 && age <= 69) {
							return 76.3;
						}
						break;
				}
			} else if (growth < 176 && growth >= 174) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 77.5;
						} else if ( age >= 30 && age <= 30) {
							return 80.8;
						} else if ( age >= 40 && age <= 49) {
							return 84.4;
						} else if ( age >= 50 && age <= 59) {
							return 83;
						} else if ( age >= 60 && age <= 69) {
							return 79.3;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 74.3;
						} else if ( age >= 30 && age <= 30) {
							return 79;
						} else if ( age >= 40 && age <= 49) {
							return 83.7;
						} else if ( age >= 50 && age <= 59) {
							return 79.4;
						} else if ( age >= 60 && age <= 69) {
							return 78;
						}
						break;
				}
			} else if (growth < 178 && growth >= 176) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 80.8;
						} else if ( age >= 30 && age <= 30) {
							return 83.3;
						} else if ( age >= 40 && age <= 49) {
							return 86;
						} else if ( age >= 50 && age <= 59) {
							return 84.1;
						} else if ( age >= 60 && age <= 69) {
							return 81.9;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 76.8;
						} else if ( age >= 30 && age <= 30) {
							return 79.9;
						} else if ( age >= 40 && age <= 49) {
							return 84.6;
						} else if ( age >= 50 && age <= 59) {
							return 80.5;
						} else if ( age >= 60 && age <= 69) {
							return 79.1;
						}
						break;
				}
			} else if (growth < 180 && growth >= 178) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 83;
						} else if ( age >= 30 && age <= 30) {
							return 85.6;
						} else if ( age >= 40 && age <= 49 ) {
							return 88;
						} else if ( age >= 50 && age <= 59) {
							return 86.5;
						} else if ( age >= 60 && age <= 69) {
							return 82.8;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 78.2;
						} else if ( age >= 30 && age <= 30) {
							return 82.4;
						} else if ( age >= 40 && age <= 49) {
							return 86.1;
						} else if ( age >= 50 && age <= 59) {
							return 82.4;
						} else if ( age >= 60 && age <= 69) {
							return 80.9;
						}
						break;
				}
			} else if (growth < 182 && growth >= 180) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 85.1;
						} else if ( age >= 30 && age <= 30) {
							return 88;
						} else if ( age >= 40 && age <= 49) {
							return 89.9;
						} else if ( age >= 50 && age <= 59) {
							return 87.5;
						} else if ( age >= 60 && age <= 69 ) {
							return 84.4;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 80.9;
						} else if ( age >= 30 && age <= 30) {
							return 83.9;
						} else if ( age >= 40 && age <= 49) {
							return 88.1;
						} else if ( age >= 50 && age <= 59) {
							return 84.1;
						} else if ( age >= 60 && age <= 69) {
							return 81.6;
						}
						break;
				}
			} else if (growth < 184 && growth >= 182) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 87.2;
						} else if ( age >= 30 && age <= 30) {
							return 90.6;
						} else if ( age >= 40 && age <= 49) {
							return 91.4;
						} else if ( age >= 50 && age <= 59) {
							return 89.5;
						} else if ( age >= 60 && age <= 69) {
							return 85.4;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 83.3;
						} else if ( age >= 30 && age <= 30) {
							return 87.7;
						} else if ( age >= 40 && age <= 49) {
							return 89.3;
						} else if ( age >= 50 && age <= 59) {
							return 86.5;
						} else if ( age >= 60 && age <= 69) {
							return 82.9;
						}
						break;
				}
			} else if (growth < 186 && growth >= 184) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 89.1;
						} else if ( age >= 30 && age <= 30) {
							return 92;
						} else if ( age >= 40 && age <= 49) {
							return 92.9;
						} else if ( age >= 50 && age <= 59) {
							return 91.6;
						} else if ( age >= 60 && age <= 69) {
							return 88;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 85.5;
						} else if ( age >= 30 && age <= 30) {
							return 89.4;
						} else if ( age >= 40 && age <= 49) {
							return 90.9;
						} else if ( age >= 50 && age <= 59) {
							return 87.4;
						} else if ( age >= 60 && age <= 69) {
							return 85.9;
						}
						break;
				}
			} else if (growth < 188 && growth >= 186) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 93.1;
						} else if ( age >= 30 && age <= 30) {
							return 95;
						} else if ( age >= 40 && age <= 49) {
							return 96.6;
						} else if ( age >= 50 && age <= 59) {
							return 92.8;
						} else if ( age >= 60 && age <= 69) {
							return 89;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 89.2;
						} else if ( age >= 30 && age <= 30) {
							return 91;
						} else if ( age >= 40 && age <= 49) {
							return 92.9;
						} else if ( age >= 50 && age <= 59) {
							return 89.6;
						} else if ( age >= 60 && age <= 69) {
							return 87.3;
						}
						break;
				}
			} else if (growth <= 190 && growth >= 188) {
				switch (sex) {
					case SexEnum.man:
						if (age >= 20 && age <= 29) {
							return 95.8;
						} else if ( age >= 30 && age <= 30) {
							return 97;
						} else if ( age >= 40 && age <= 49) {
							return 98;
						} else if ( age >= 50 && age <= 59) {
							return 95;
						} else if ( age >= 60 && age <= 69) {
							return 91.5;
						}
						break;
					case SexEnum.woman:
						if (age >= 20 && age <= 29) {
							return 91.8;
						} else if ( age >= 30 && age <= 30) {
							return 94.4;
						} else if ( age >= 40 && age <= 49) {
							return 95.8;
						} else if ( age >= 50 && age <= 59) {
							return 91.5;
						} else if ( age >= 60 && age <= 69) {
							return 88.8;
						}
						break;
				}
			} else  {
	    	return 0;
			}
	}
}
