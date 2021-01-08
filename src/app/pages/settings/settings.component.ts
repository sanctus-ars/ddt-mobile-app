import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

	public pageName: string;
	public languagesList: LanguagesShortEnum[] = [ LanguagesShortEnum.ru, LanguagesShortEnum.en ];
	public currentLanguage: string;

	public settingsForm: FormGroup;
	public languageFormControl: FormControl = new FormControl();

	constructor(
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
	) { }

	ngOnInit() {
		this.initData();
		this.buildForm();
	}

	private initData(): void {
		this.pageName = this.activatedRoute.snapshot.routeConfig.path;
		this.currentLanguage = this.translateService.currentLang;
	}

	private buildForm(): void {
		this.languageFormControl.setValue(this.translateService.currentLang);
		this.settingsForm = new FormGroup({
			language: this.languageFormControl
		});
		this.settingsForm.valueChanges.subscribe((value) => {
			this.translateService.use(value.language.trim());
		});
	}
}
