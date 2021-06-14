import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
		selector: 'app-pages',
		templateUrl: './pages.component.html',
		styleUrls: ['./pages.component.scss'],
})
export class PagesComponent extends BaseComponent {
		constructor(
			private cd: ChangeDetectorRef,
		) {
				super(cd);
		}
}
