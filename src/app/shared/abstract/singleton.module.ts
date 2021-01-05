import { Optional, SkipSelf } from '@angular/core';

export abstract class SingletonModule<T> {
	constructor(@Optional() @SkipSelf() parentModule: T) {
		if (parentModule) {
			throw new Error(`${this.constructor.name} is already loaded. Import it in the AppModule only`);
		}
	}
}
