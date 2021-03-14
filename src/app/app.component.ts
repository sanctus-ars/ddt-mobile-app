import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	public selectedIndex = 0;
	public appPages = [
		{
			title: 'Diary',
			url: 'diary',
			icon: 'book-medical',
			isOpen: false,
			subPages: [
				{
					title: 'Weight',
					url: 'pages/diary/weight',
					icon:	'weight'
				},
				{
					title: 'Blood Pressure',
					url: 'pages/diary/blood-pressure',
					icon: 'hand-holding-water',
				},
				{
					title: 'Analysis of urine',
					url: 'pages/diary/urine',
					icon: 'tint'
				},
				{
					title: 'Body temperature',
					url: 'pages/diary/body-temperature',
					icon: 'thermometer-half'
				},
				{
					title: 'Well being',
					url: 'pages/diary/well-being',
					icon: 'smile'
				},
			]
		},


		{
			title: 'Doctor',
			url: 'pages/doctor',
			icon: 'user-nurse'
		},
		{
			title: 'Pills',
			url: 'pages/pills',
			icon: 'pills'
		},
		{
			title: 'Login',
			url: 'pages/login',
			icon: 'sign-in-alt'
		},
		{
			title: 'Registration',
			url: 'pages/registration',
			icon: 'registered'
		},
		{
			title: 'Settings',
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
		this.initTranslate();
		const path = window.location.pathname.split('folder/')[1];
		if (path !== undefined) {
			this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
		}
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
