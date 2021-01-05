import { UserModel } from 'src/app/shared/models';
import { AuthActionsEnum } from './auth.actions';
import { IAction } from 'src/app/shared/interface/action.interface';

export interface IAuthState {
	isAuth: boolean;
	data: UserModel | null;
}

export const initState: IAuthState = {
	isAuth: false,
	data: null,
};

export function authReducer(state: IAuthState = initState, action: IAction<UserModel>): IAuthState {
	switch (action.type) {
		case AuthActionsEnum.AuthLoginSuccess : {
			return {
				...state,
				isAuth: true,
				data: action.payload
			};
		}

		case AuthActionsEnum.AuthLogoutSucces : {
			return initState;
		}
		default: {
			return state;
		}
	}
}
