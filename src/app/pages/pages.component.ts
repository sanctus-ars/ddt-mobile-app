import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
		selector: 'app-pages',
		templateUrl: './pages.component.html',
		styleUrls: ['./pages.component.scss'],
		changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesComponent extends BaseComponent implements OnInit {
		public pageName;

		constructor(
			private cd: ChangeDetectorRef,
			private titleService: TitleService,
		) {
				super(cd);
		}

		ngOnInit() {
			this.subscriptions.add([
				    this.titleService.title.subscribe((title) => {
				    	this.pageName = title;
				    	this.cd.markForCheck();
						})
				]);
		}
}
