import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodPressureComponent } from './blood-pressure.component';

describe('BloodPressureComponent', () => {
	let component: BloodPressureComponent;
	let fixture: ComponentFixture<BloodPressureComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BloodPressureComponent ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(BloodPressureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
