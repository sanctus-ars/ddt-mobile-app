import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent {
	@Input() icon: string;
	@Input() label: string;
	@Input() class: string;
	@Input() placeholder: string;
	@Input() textControl: FormControl = new FormControl();
}
