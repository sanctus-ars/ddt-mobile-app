import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILoadingState } from './loading.reducer';

export const getAllLoading = createFeatureSelector('loading');
export const getIsLoading = createSelector(
	getAllLoading,
	(state: ILoadingState) => state.show,
);
