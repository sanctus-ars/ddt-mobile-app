import { LoadingActionsEnum } from './loading.actions';
import { IAction } from 'src/app/shared/interface/action.interface';

export interface ILoadingState {
	show: boolean;
}

export const initState: ILoadingState = {
	show: false,
};

export function loadingReducer(state: ILoadingState = initState, action: IAction): ILoadingState {
	switch (action.type) {
		case LoadingActionsEnum.LoadingShow: {
			return { show: true };
		}
		case LoadingActionsEnum.LoadingHide: {
			return { show: false };
		}
		default: {
			return state;
		}
	}
}
