import { UserModel } from 'src/app/shared/models';
import { UserActionsEnum } from './user.actions';
import { IAction } from 'src/app/shared/interface/action.interface';

export interface IUserState {
	language: string;
	data: UserModel | null;
}

export const initUserState: IUserState = {
	language: navigator.language,
	data: null,
};

export function userReducer(state: IUserState = initUserState, action: IAction<UserModel | null>): IUserState {
	switch (action.type) {
		case UserActionsEnum.Create:
		case UserActionsEnum.Update:
			{
				return {
					...state,
					data: action.payload
				};
			}

		case UserActionsEnum.Delete: {
			return initUserState;
		}

		default: {
			return state;
		}
	}
}
