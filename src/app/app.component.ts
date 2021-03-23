import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/pages/settings/services/settings.service';
import * as moment from 'moment';
import { ISettings } from 'src/app/pages/settings/interfaces/settings.interface';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

	public settings: ISettings;
	public afterTransplantationYear: number;
	public afterTransplantationMonth: number;

	public selectedIndex = 0;
	public appPages = [
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
		{
			title: 'Настройки',
			url: 'pages/settings',
			icon: 'tools'
		},
	];

	constructor(
		private menu: MenuController,
		private router: Router,
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private settingsService: SettingsService,
		private translateService: TranslateService,
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		this.initData();
		this.initTranslate();
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		}
	}

	private initData(): void {
		this.settingsService.getSettings().then((settings) => {
			this.settings = settings;
			const dateAfterTransplantation: moment.Moment = moment(moment(new Date()).diff(moment(settings.transplantDate)));
			// tslint:disable-next-line:radix
			this.afterTransplantationYear = Number.parseInt(dateAfterTransplantation.format('YYYY')) - 1970;
			this.afterTransplantationMonth = Number.parseInt(dateAfterTransplantation.format('MM'));
		});
	}

	public menuSubItemClickAction(url: string): void {
		this.menu.toggle();
		this.router.navigateByUrl(url);
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

	private initTranslate()  {
		this.translateService.addLangs([ LanguagesShortEnum.en, LanguagesShortEnum.ru]);
		this.translateService.setDefaultLang(LanguagesShortEnum.ru);
		this.translateService.use(LanguagesShortEnum.ru);
	}
}
