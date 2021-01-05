import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IHistoryState } from './history.reducers';
import { HistoryRouterModel } from 'src/app/shared/models';

export const getAllHistory = createFeatureSelector('history');
export const getLastPath = (): MemoizedSelector<object, HistoryRouterModel> => createSelector(
	getAllHistory,
	(state: IHistoryState) => state.data[state.data.length - 1]
);
