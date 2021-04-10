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
import { BloodPressureResearchComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-research/blood-pressure-research.component';
import { BloodPressureHistoryComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-history/blood-pressure-history.component';
import { UrineHistoryComponent } from 'src/app/pages/diary/components/urine/components/urine-history/urine-history.component';
import { UrineResearchComponent } from 'src/app/pages/diary/components/urine/components/urine-research/urine-research.component';
import { BodyTemperatureResearchComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-research/body-temperature-research.component';
import { BodyTemperatureHistoryComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-history/body-temperature-history.component';
import { WeightSettingsComponent } from 'src/app/pages/diary/components/weight/components/weight-settings/weight-settings.component';
import { WeightStatisticComponent } from 'src/app/pages/diary/components/weight/components/weight-statistic/weight-statistic.component';
import { PillsComponent } from 'src/app/pages/pills/pills.component';
import { PillsResearchComponent } from 'src/app/pages/pills/components/pills-research/pills-research.component';
import { PillsDrugsComponent } from 'src/app/pages/pills/components/pills-drugs/pills-drugs.component';
import { PillsHistoryComponent } from 'src/app/pages/pills/components/pills-history/pills-history.component';

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
										path: 'settings',
										component: WeightSettingsComponent,
									},
									{
										path: 'statistic',
										component: WeightStatisticComponent,
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
								},
								children: [
									{
										path: 'research',
										component: BloodPressureResearchComponent,
									},
									{
										path: 'history',
										component: BloodPressureHistoryComponent
									},
									{
										path: '**',
										redirectTo: 'research',
										pathMatch: 'full',
									}
								]
							},
							{
								path: 'body-temperature',
								component: BodyTemperatureComponent,
								data: {
									title: 'Body Temperature'
								},
								children: [
									{
										path: 'research',
										component: BodyTemperatureResearchComponent,
									},
									{
										path: 'history',
										component: BodyTemperatureHistoryComponent,
									},
									{
										path: '**',
										redirectTo: 'research',
										pathMatch: 'full',
									}
								]
							},
							{
								path: 'urine',
								component: UrineComponent,
								data: {
									title: 'Urine'
								},
								children: [
									{
										path: 'research',
										component: UrineResearchComponent,
									},
									{
										path: 'history',
										component: UrineHistoryComponent,
									},
									{
										path: '**',
										redirectTo: 'research',
										pathMatch: 'full',
									}
								]
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
						path: 'pills',
						component: PillsComponent,
						children: [
							{
								path: 'research',
								component: PillsResearchComponent,
							},
							{
								path: 'drugs',
								component: PillsDrugsComponent,
							},
							{
								path: 'history',
								component: PillsHistoryComponent,
							},
							{
								path: '**',
								redirectTo: 'research',
								pathMatch: 'full',
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
