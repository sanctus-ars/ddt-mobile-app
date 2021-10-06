import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import * as moment from 'moment';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { MatDialog } from '@angular/material/dialog';
import { WeightService } from 'src/app/pages/diary/components/weight/services/weight.service';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import { DoctorVisitsService } from 'src/app/pages/doctors/services/doctor.service';
import { BodyTemperatureService } from 'src/app/pages/diary/components/body-temperature/services/body-temperature.service';
import { WellBeingService } from 'src/app/pages/diary/components/well-being/services/well-being.service';
import { BloodPressureService } from 'src/app/pages/diary/components/blood-pressure/services/blood-pressure-service';
import { UrineService } from 'src/app/pages/diary/components/urine/services/urine.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
	public settings: ISettings;
	public afterTransplantationText: string;

	public selectedIndex = 0;
	public appPages = [
		{
			title: 'Мои лекарства',
			url: 'pills',
			icon: 'pills',
		},
/*		{
			title: 'Визиты к врачу',
			url: 'doctors',
			icon: 'user-nurse',
		},*/
		{
			title: 'Дневник',
			url: 'diary',
			icon: 'book-medical',
			isOpen: false,
			subPages: [
				{
					title: 'Вес',
					url: 'pages/diary/weight',
					icon:	'weight'
				},
				{
					title: 'Давление',
					url: 'pages/diary/blood-pressure',
					icon: 'hand-holding-water',
				},
				{
					title: 'Диузер',
					url: 'pages/diary/urine',
					icon: 'tint'
				},
				{
					title: 'Температура',
					url: 'pages/diary/body-temperature',
					icon: 'thermometer-half'
				},
				{
					title: 'Самочувствие',
					url: 'pages/diary/well-being',
					icon: 'smile'
				},
			]
		},
	/*	{
			title: 'Результаты анализов',
			url: 'tests',
			icon: 'bacterium',
		},*/
		{
			title: 'Настройки',
			url: 'pages/settings',
			icon: 'tools'
		},
		{
			title: 'О приложении',
			url: 'pages/about',
			icon: 'question-circle',
		},
	];

	constructor(
		private cd: ChangeDetectorRef,
		private menu: MenuController,
		private dialog: MatDialog,
		private router: Router,
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private pillsService: PillsService,
		private urineService: UrineService,
		private weightService: WeightService,
		private settingsService: SettingsService,
		private wellBeingService: WellBeingService,
		private doctorVisitsService: DoctorVisitsService,
		private bloodPressureService: BloodPressureService,
		private bodyTemperatureService: BodyTemperatureService,
	) {
		super(cd);
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	async ngOnInit() {
		await this.initData();
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		}
	}

	private async initData() {
		await this.urineService.init();
		await this.pillsService.init();
		await this.weightService.init();
		await this.settingsService.init();
		await this.wellBeingService.init();
		await this.doctorVisitsService.init();
		await this.bloodPressureService.init();
		await this.bodyTemperatureService.init();
		this.subscriptions.add([
				this.settingsService.appSettings.subscribe((settings) => {
				  if (settings) {
						this.settings = settings;
						const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(settings.transplantDate)));
						const afterTransplantationYear = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;
						const afterTransplantationMonth = Number.parseInt(dateAfterTransplantation.format('MM'));
						this.afterTransplantationText = this.getAfterTransplantationText(afterTransplantationYear, afterTransplantationMonth);
					} else {
						this.router.navigateByUrl('pages/settings');
					}
			}),
		]);
	}

	public async menuSubItemClickAction(url: string) {
	 		await this.menu.toggle();
		  await this.router.navigateByUrl(url);
	}

	public menuItemClickAction(index: number): void {
			const hasSubItems: boolean = this.appPages[index].subPages?.length > 0;
			if (hasSubItems) {
				this.appPages[index].isOpen = !this.appPages[index].isOpen;
			} else {
				this.menu.toggle();
				this.router.navigateByUrl(this.appPages[index].url);
				this.selectedIndex = index;
			}
	}

	private getAfterTransplantationText(yearNumber: number, monthNumber: number): string {
		let yearText = 'лет';
		let monthText = 'месяцев';
		switch (yearNumber) {
			case 1:
			case 21:
			case 31:
				yearText = 'год';
				break;
			case 2:
			case 3:
			case 4:
			case 22:
			case 23:
			case 24:
			case 32:
			case 33:
			case 34:
				yearText = 'года';
		}

		switch (monthNumber) {
			case 1:
				monthText = 'месяц';
				break;
			case 2:
			case 3:
			case 4:
				monthText = 'месяца';
				break;
		}
		return `${yearNumber} ${yearText} ${monthNumber} ${monthText} после трансплантации`;
	}
}
