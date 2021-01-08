import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { BloodPressureComponent } from 'src/app/pages/blood-pressure/blood-pressure.component';
import { TabletsComponent } from 'src/app/pages/tablets/tablets.component';
import { PagesComponent } from 'src/app/pages/pages.component';
import { AppComponent } from 'src/app/app.component';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { BloodPressureModule } from 'src/app/modules/blood-pressure/blood-pressure.module';



@NgModule({
	declarations: [
		LoginComponent,
		SettingsComponent,
		NoContentComponent,
		RegistrationComponent,
		TabletsComponent,
		BloodPressureComponent,
		PagesComponent
	],
	imports: [
		CoreModule,
		IonicModule.forRoot(),
		CommonModule,
		FormsModule,
		PagesRoutingModule,
		TranslateModule,
		ReactiveFormsModule,
		SharedModule,
		BloodPressureModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	]
})
export class PagesModule { }
