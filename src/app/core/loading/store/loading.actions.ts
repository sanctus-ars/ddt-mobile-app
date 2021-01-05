import { IAction } from 'src/app/shared/interface';

export enum LoadingActionsEnum {
	LoadingShow = '[Loading] Show',
	LoadingHide = '[Loading] Hide',
}

export class LoadingHide implements IAction {
	public readonly type: LoadingActionsEnum = LoadingActionsEnum.LoadingHide;
}

export class LoadingShow implements IAction {
	public readonly type: LoadingActionsEnum = LoadingActionsEnum.LoadingShow;
}

export type LoadingActionsTypes = LoadingHide | LoadingShow;
