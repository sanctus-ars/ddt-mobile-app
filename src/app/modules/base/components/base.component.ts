import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscriptions } from 'src/app/shared/abstract/subscriptions';
import { TitleService } from 'src/app/shared/services/title.service';

class BaseComponent  implements OnDestroy {
	public isLoading = false;
	public subscriptions: Subscriptions = new Subscriptions();

	private changeDetectorRef: ChangeDetectorRef;

	constructor(
		cdRef: ChangeDetectorRef,
	) {
		this.changeDetectorRef = cdRef;
		const func = this.ngOnDestroy;

		this.ngOnDestroy = () => {
			func.call(this);
			this.subscriptions.unsubscribe();
		};
	}

	protected toggleLoader(isLoading: boolean): void {
		this.isLoading = isLoading;
		this.changeDetectorRef.markForCheck();
	}

	public ngOnDestroy(): void {
		// no-op
	}
}
export { BaseComponent };
