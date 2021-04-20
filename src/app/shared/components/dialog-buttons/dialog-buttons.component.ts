import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';

@Component({
	selector: 'app-dialog-buttons',
	templateUrl: './dialog-buttons.component.html',
	styleUrls: ['./dialog-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogButtonsComponent {
 @Input() mode: PopupModeEnum = PopupModeEnum.create;
 @Output() saveEmitter: EventEmitter<void> = new EventEmitter<void>();
 @Output() cancelEmitter: EventEmitter<void> = new EventEmitter<void>();
 @Output() removeEmitter: EventEmitter<void> = new EventEmitter<void>();

 public cancelAction(): void {
 	this.cancelEmitter.emit();
 }

 public saveAction(): void {
 	this.saveEmitter.emit();
 }

 public removeAction(): void {
 	this.removeEmitter.emit()
 }
}
