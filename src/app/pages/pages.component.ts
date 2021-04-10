import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { TitleService } from 'src/app/shared/services/title.service';

@Component({
		selector: 'app-pages',
		templateUrl: './pages.component.html',
		styleUrls: ['./pages.component.scss'],
})
export class PagesComponent extends BaseComponent implements OnInit {
		public pageName: string = 'sdf';
		constructor(
			private cd: ChangeDetectorRef,
			private titleService: TitleService,
			private router: Router
		) {
				super(cd);
		}

		ngOnInit() {
				this.subscriptions.add([
				    this.titleService.title.subscribe((title) => {
				    	this.pageName = title;
						})
				]);
		}
}
