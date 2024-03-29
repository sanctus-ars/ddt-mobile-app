import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-date',
	templateUrl: './input-date.component.html',
	styleUrls: ['./input-date.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent {
	@Input() class: string;
	@Input() label: string = 'Дата';
	@Input() required: boolean = false;
	@Input() control: FormControl = new FormControl();
}
