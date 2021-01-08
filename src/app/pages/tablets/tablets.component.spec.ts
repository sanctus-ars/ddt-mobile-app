import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabletsComponent } from './tablets.component';

describe('TabletsComponent', () => {
  let component: TabletsComponent;
  let fixture: ComponentFixture<TabletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
