import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from './auth.reducer';

export const getAllAuth = createFeatureSelector('auth');
export const getAuthStatus = createSelector(getAllAuth, (state: IAuthState) => state.isAuth);
export const getAuthUserData = createSelector(getAllAuth, (state: IAuthState) => state.data);
