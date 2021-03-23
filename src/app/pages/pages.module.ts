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
import { PagesComponent } from 'src/app/pages/pages.component';
import { RouteReuseStrategy } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiaryModule } from 'src/app/pages/diary/diary.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
	declarations: [
		LoginComponent,
		SettingsComponent,
		NoContentComponent,
		RegistrationComponent,
		PagesComponent,
	],
	imports: [
		DiaryModule,
		CoreModule,
		IonicModule.forRoot(),
		CommonModule,
		FormsModule,
		PagesRoutingModule,
		TranslateModule,
		ReactiveFormsModule,
		SharedModule,
		FontAwesomeModule,
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	]
})
export class PagesModule { }
