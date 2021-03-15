import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { PagesComponent } from 'src/app/pages/pages.component';
import { DiaryComponent } from 'src/app/pages/diary/diary.component';
import { WeightComponent } from 'src/app/pages/diary/components/weight/weight.component';
import { BloodPressureComponent } from 'src/app/pages/diary/components/blood-pressure/blood-pressure.component';
import { BodyTemperatureComponent } from 'src/app/pages/diary/components/body-temperature/body-temperature.component';
import { UrineComponent } from 'src/app/pages/diary/components/urine/urine.component';
import { WellBeingComponent } from 'src/app/pages/diary/components/well-being/well-being.component';
import { WeightHistoryComponent } from 'src/app/pages/diary/components/weight/components/weight-history/weight-history.component';
import { WeightResearchComponent } from 'src/app/pages/diary/components/weight/components/weight-research/weight-research.component';

const routes: Routes = [
		{
				path: '',
				component: PagesComponent,
				children: [
				{
						path: 'diary',
						component: DiaryComponent,
						data: {
							title: 'Diary'
						},
						children: [
							{
								path: 'weight',
								component: WeightComponent,
								children: [
									{
										path: 'research',
										component: WeightResearchComponent,
									},
									{
										path: 'history',
										component: WeightHistoryComponent
									},
									{
										path: '**',
										redirectTo: 'research',
										pathMatch: 'full',
									}
								]
							},
							{
								path: 'blood-pressure',
								component: BloodPressureComponent,
								data: {
									title: 'Blood Pressure'
								}
							},
							{
								path: 'body-temperature',
								component: BodyTemperatureComponent,
								data: {
									title: 'Body Temperature'
								}
							},
							{
								path: 'urine',
								component: UrineComponent,
								data: {
									title: 'Urine'
								}
							},
							{
								path: 'well-being',
								component: WellBeingComponent,
								data: {
									title: 'Well Being'
								}
							}
						]
					},
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
