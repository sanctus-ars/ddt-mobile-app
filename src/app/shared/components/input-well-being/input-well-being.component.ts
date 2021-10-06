import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-input-well-being',
	templateUrl: './input-well-being.component.html',
	styleUrls: ['./input-well-being.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputWellBeingComponent {
	@Input() class: string;
	@Input() control: FormControl = new FormControl();

	public formatLabel(value: number) {
		switch (value) {
			case 1:
			case 2:
			case 3:
				return ':(';
			case 5:
			case 4:
			case 6:
				return ':|';
			case 7:
			case 8:
				return ':)';
			case 10:
			case 9:
				return '^.^';
		}

		return value;
	}
}
