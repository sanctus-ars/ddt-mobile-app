import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { BloodPressureComponent } from 'src/app/pages/blood-pressure/blood-pressure.component';
import { PagesComponent } from 'src/app/pages/pages.component';

const routes: Routes = [
		{
				path: '',
				component: PagesComponent,
				children: [
					{
						path: 'login',
						component: LoginComponent,
						data: {
							title: 'Login'
						}
					},
					{
						path: 'registration',
						component: RegistrationComponent,
						data: {
							title: 'Registration'
						}
					},
					{
						path: 'settings',
						component: SettingsComponent,
						data: {
							title: 'Settings'
						}
					},
					{
						path: 'blood-pressure',
						component: BloodPressureComponent,
						data: {
							title: 'Blood Pressure'
						}
					},
					{
						path: '**',
						component: NoContentComponent,
						data: {
							title: 'Page Not Found'
						}
					}
				]
		},

];

@NgModule({
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule],
})
export class PagesRoutingModule {}
