import { Injectable } from '@angular/core';
import { LocalNotificationScheduleResult, Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Injectable({
	providedIn: 'root'
})
export class NotificationsService {
	public async show(): Promise<LocalNotificationScheduleResult> {
		const notifs = await LocalNotifications.schedule({
			notifications: [
				{
					title: "Title",
					body: "Body",
					id: 1,
					schedule: { at: new Date(Date.now() + 1000 * 5) },
					sound: null,
					attachments: null,
					actionTypeId: "",
					extra: null
				}
			]
		});
		console.log('scheduled notifications', notifs);
		return notifs;
	}
	constructor() {
	}
}
