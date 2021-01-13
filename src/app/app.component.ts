import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
	public selectedIndex = 0;
	public appPages = [
		{
			title: 'Blood Pressure',
			url: 'pages/blood-pressure',
			icon: 'heart-half'
		},
		{
			title: 'Settings',
			url: 'pages/settings',
			icon: 'settings'
		},
		{
			title: 'Login',
			url: 'pages/login',
			icon: 'mail'
		},
		{
			title: 'Registration',
			url: 'pages/registration',
			icon: 'cloud'
		}
	];

	constructor(
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

	private initTranslate()  {
		this.translateService.addLangs([ LanguagesShortEnum.en, LanguagesShortEnum.ru]);
		this.translateService.setDefaultLang(LanguagesShortEnum.ru);
		this.translateService.use(LanguagesShortEnum.ru);
	}
}
