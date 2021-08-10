import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
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
import { UrineResearchComponent } from 'src/app/pages/diary/components/urine/components/urine-research/urine-research.component';
import { BodyTemperatureResearchComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-research/body-temperature-research.component';
import { WeightStatisticComponent } from 'src/app/pages/diary/components/weight/components/weight-statistic/weight-statistic.component';
import { PillsComponent } from 'src/app/pages/pills/pills.component';
import { PillsResearchComponent } from 'src/app/pages/pills/components/pills-research/pills-research.component';
import { PillsDrugsComponent } from 'src/app/pages/pills/components/pills-drugs/pills-drugs.component';
import { PillsHistoryComponent } from 'src/app/pages/pills/components/pills-history/pills-history.component';
import { DoctorsComponent } from 'src/app/pages/doctors/doctors.component';
import { DoctorResearchComponent } from 'src/app/pages/doctors/components/doctor-research/doctor-research.component';
import { BodyTemperatureRegisterComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-register/body-temperature-register.component';
import { WellBeingResearchComponent } from 'src/app/pages/diary/components/well-being/components/well-being-research/well-being-research.component';
import { WellBeingRegistryComponent } from 'src/app/pages/diary/components/well-being/components/well-being-registry/well-being-registry.component';
import { WellBeingStatisticComponent } from 'src/app/pages/diary/components/well-being/components/well-being-statistic/well-being-statistic.component';
import { BodyTemperatureStatisticComponent } from 'src/app/pages/diary/components/body-temperature/components/body-temperature-statistic/body-temperature-statistic.component';
import { BloodPressureRegistryComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-registry/blood-pressure-registry.component';
import { BloodPressureStatisticComponent } from 'src/app/pages/diary/components/blood-pressure/components/blood-pressure-statistic/blood-pressure-statistic.component';
import { UrineRegistryComponent } from 'src/app/pages/diary/components/urine/components/urine-registry/urine-registry.component';
import { UrineStatisticComponent } from 'src/app/pages/diary/components/urine/components/urine-statistic/urine-statistic.component';
import { PillsNewItemComponent } from 'src/app/pages/pills/components/pills-new-item/pills-new-item.component';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { WeightItemComponent } from 'src/app/pages/diary/components/weight/components/weight-item/weight-item.component';

const routes: Routes = [
		{
				path: '',
				component: PagesComponent,
				children: [
				{
						path: 'diary',
						component: DiaryComponent,
						children: [
							{
								path: 'weight',
								component: WeightComponent,
								children: [
									{
										path: 'item',
										component: WeightItemComponent,
									},
									{
										path: 'research',
										component: WeightResearchComponent,
									},
									{
										path: 'history',
										component: WeightHistoryComponent
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
								children: [
									{
										path: 'research',
										component: BloodPressureResearchComponent,
									},
									{
										path: 'registry',
										component: BloodPressureRegistryComponent,
									},
									{
										path: 'statistic',
										component: BloodPressureStatisticComponent,
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
								children: [
									{
										path: 'research',
										component: BodyTemperatureResearchComponent,
									},
									{
										path: 'register',
										component: BodyTemperatureRegisterComponent,
									},
									{
										path: 'statistic',
										component: BodyTemperatureStatisticComponent
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
								children: [
									{
										path: 'research',
										component: UrineResearchComponent,
									},
									{
										path: 'registry',
										component: UrineRegistryComponent,
									},
									{
										path: 'statistic',
										component: UrineStatisticComponent
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
								children: [
									{
										path: 'research',
										component: WellBeingResearchComponent,
									},
									{
										path: 'registry',
										component: WellBeingRegistryComponent
									},
									{
										path: 'statistic',
										component: WellBeingStatisticComponent
									},
									{
										path: '**',
										redirectTo: 'research',
										pathMatch: 'full',
									}
								]
							}
						]
					},
					{
						path: 'about',
						component: AboutComponent,
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
								path: 'item-new',
								component: PillsNewItemComponent
							},
							{
								path: '**',
								redirectTo: 'research',
								pathMatch: 'full',
							}
						]
					},
					{
						path: 'settings',
						component: SettingsComponent,
						data: {
							title: 'Settings'
						},
					},
					{
						path: 'doctors',
						component: DoctorsComponent,
						children: [
							{
								path: 'research',
								component: DoctorResearchComponent,
							},
							{
								path: '**',
								redirectTo: 'research',
								pathMatch: 'full',
							}
						]
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
