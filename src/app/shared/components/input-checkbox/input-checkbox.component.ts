import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-checkbox',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCheckboxComponent {
	@Input() label: string;
	@Input() class: string;
	@Input() labelPosition: 'before' | 'after' = 'after';
	@Input() control: FormControl = new FormControl();
}
