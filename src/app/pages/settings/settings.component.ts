import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguagesShortEnum } from 'src/app/shared/enum/languages-short.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent implements OnInit {

	public pageName: string;
	public languagesList: LanguagesShortEnum[] = [ LanguagesShortEnum.ru, LanguagesShortEnum.en ];
	public currentLanguage: string;

	public settingsForm: FormGroup;
	public languageFormControl: FormControl = new FormControl();

	constructor(
		private cd: ChangeDetectorRef,
		private activatedRoute: ActivatedRoute,
		private translateService: TranslateService,
	) {
		super(cd);
	}

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
		this.subscriptions.add([
			this.settingsForm.valueChanges.subscribe((value) => {
				this.translateService.use(value.language.trim());
			}),
		]);
	}
}
