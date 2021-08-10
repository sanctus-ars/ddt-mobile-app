import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-number',
	templateUrl: './input-number.component.html',
	styleUrls: ['./input-number.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
	@Input() min: number;
	@Input() max: number;
	@Input() icon: string;
	@Input() label: string;
	@Input() class: string;
	@Input() required: boolean = false;
	@Input() control: FormControl = new FormControl();
	@Input() placeholder: string;
}
