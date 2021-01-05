import { Action } from '@ngrx/store';

export interface IAction<T = null> extends Action {
	readonly type: string;
	payload?: T;
}
