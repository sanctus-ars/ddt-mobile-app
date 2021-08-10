import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
	@Input() size: string = 'max';
	@Input() label: string = 'Комментарий';
 	@Input() class: string;
	@Input() placeholder: string = 'Добавить комментарий';

	@Input() control: FormControl = new FormControl();
}
