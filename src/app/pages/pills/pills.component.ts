import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
	selector: 'app-pills',
	templateUrl: './pills.component.html',
	styleUrls: ['./pills.component.scss'],
})
export class PillsComponent implements OnInit {

	constructor(
		private localNotifications: NotificationsService
	) { }

	ngOnInit() {

	}

}
