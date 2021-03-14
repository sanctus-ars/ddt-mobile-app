import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
		selector: 'app-pages',
		templateUrl: './pages.component.html',
		styleUrls: ['./pages.component.scss'],
})
export class PagesComponent extends BaseComponent implements OnInit {
		public pageName: string;
		constructor(
			private cd: ChangeDetectorRef,
			private cf: ChangeDetectorRef,
			private router: Router
		) {
				super(cd);
		}

		ngOnInit() {
				this.subscriptions.add([
				    this.router.events.subscribe((v) => {
								if (v instanceof ActivationEnd) {
										const isValidRouter: boolean = this.pageName !== v.snapshot.data.title && v.snapshot.data.title !== undefined;
										this.pageName =  isValidRouter ? v.snapshot.data.title : this.pageName;
										this.cf.markForCheck();
								}
				    }),
				]);
		}
}
