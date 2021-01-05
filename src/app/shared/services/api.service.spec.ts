import { TestBed } from '@angular/core/testing';

import { ApiClient } from './api.service';

describe('ApiService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ApiClient = TestBed.get(ApiClient);
		expect(service).toBeTruthy();
	});
});
