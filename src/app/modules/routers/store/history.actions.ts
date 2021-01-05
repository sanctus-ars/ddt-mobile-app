import { NavigationExtras } from '@angular/router';
import { HistoryRouterModel } from 'src/app/shared/models';

import { IAction } from 'src/app/shared/interface/action.interface';

export enum HistroyActionsEnum {
	Loading = '[History] Loading',

	GoMain = '[History] Go To Main Page',
	GoBack = '[History] Go Back',
	GoToUrl = '[History] Go To URL',
	GoToError = '[History] Go to Error',

	HistoryError = '[History] Error',
	HistorySuccess = '[History] Success',
}

export class HistoryLoading implements IAction {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.Loading;
}

export class HistoryGoMain implements IAction {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.GoMain;
}

export class HistoryGoBack implements IAction {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.GoBack;
}

export class HistoryGoToError implements IAction<{code?: number, message?: string}> {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.GoToError;
	constructor(public payload?: {code?: number, message?: string}) {}
}

export class HistoryGoToUrl implements IAction<{url: string, extras?: NavigationExtras}> {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.GoToUrl;
	constructor(public payload: {url: string, extras?: NavigationExtras}) {}
}

export class HistoryError implements IAction<{code: number, message: string}> {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.HistoryError;
	constructor(public payload?: {code: number, message: string}) {}
}

export class HistorySuccess implements IAction<HistoryRouterModel[]> {
	public readonly type: HistroyActionsEnum = HistroyActionsEnum.HistorySuccess;
	constructor(public payload: HistoryRouterModel[]) {}
}

export type HistoryActionsTypes =
	HistoryGoBack |
	HistoryGoToError |
	HistoryGoToUrl |
	HistorySuccess |
	HistoryError;
