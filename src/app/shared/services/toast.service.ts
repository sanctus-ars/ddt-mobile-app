import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(
		private toastController: ToastController,
	) {	}

	public async showSuccess(message: string): Promise<void> {
		const toast = await this.toastController.create({
			message,
			header: 'Успех',
			duration: 2000
		});
	 return toast.present();
	}
	public async showError(message: string): Promise<void> {
		const toast = await this.toastController.create({
			message,
			header: 'Ошибка',
			duration: 2000
		});
	 return toast.present();
	}
}
