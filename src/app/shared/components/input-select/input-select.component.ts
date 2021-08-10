import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-select',
	templateUrl: './input-select.component.html',
	styleUrls: ['./input-select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectComponent {
	@Input() class: string;
	@Input() label: string;
	@Input() control: FormControl = new FormControl();
	@Input() selectList: {value: string, key: string}[] = [];
}
