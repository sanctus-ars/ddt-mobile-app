import { HistoryRouterModel } from 'src/app/shared/models';
import { HistroyActionsEnum } from './history.actions';
import { IAction } from 'src/app/shared/interface/action.interface';

export interface IHistoryState {
	data: HistoryRouterModel[];
}

export const initState = {
	data: [],
};

export function historyReducer(state: IHistoryState = initState, action: IAction<HistoryRouterModel[]>): IHistoryState {
	switch (action.type) {
		case HistroyActionsEnum.HistorySuccess: {
			return {
				...state,
				data: [...action.payload]
			};
		}
		default: {
			return state;
		}
	}
}
