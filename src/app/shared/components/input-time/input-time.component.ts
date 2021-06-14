import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-time',
	templateUrl: './input-time.component.html',
	styleUrls: ['./input-time.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTimeComponent {
	@Input() label: string = 'Время';
	@Input() class: string;
	@Input() placeholder: string;
	@Input() timeControl: FormControl = new FormControl();
}
