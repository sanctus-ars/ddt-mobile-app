import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUserState } from './user.reducers';

export const getAllUser = createFeatureSelector('user');
export const getUserData = createSelector(
	getAllUser,
	(state: IUserState) => state.data,
);
