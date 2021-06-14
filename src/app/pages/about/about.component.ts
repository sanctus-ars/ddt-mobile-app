import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends BaseComponent implements OnInit {

	constructor(
		private cd: ChangeDetectorRef,
	) {
		super(cd);
	}

	ngOnInit() {
	}
}
