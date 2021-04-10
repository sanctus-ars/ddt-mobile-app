import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TitleService {
	public title: BehaviorSubject<string> = new BehaviorSubject<string>('');
	public setTitle(title: string): void {
		this.title.next(title);
	}

	public resetTitle(): void {
		this.title.next('');
	}
}
