import { RegistryModel, LoginModel, UserModel, AnswerModel } from 'src/app/shared/models';

import { IAction } from 'src/app/shared/interface/action.interface';

export enum AuthActionsEnum {
	AuthLogout = '[Auth] Logout',
	AuthLogoutSucces = '[Auth] Logout Success',

	AuthCheck = '[Auth] Check',

	AuthRegistry = '[Auth] Registry',
	AuthRegistrySuccess = '[Auth] Registry Success',
	AuthRegistryRedirect = '[Auth] Registry Redirect',

	AuthLogin = '[Auth] Login',
	AuthLoginSuccess = '[Auth] Login Success',
	AuthLoginRedirect = '[Auth] Login Redirect',

	AuthError = '[Auth] Error',
}

export class AuthError implements IAction<AnswerModel> {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthError;
	constructor(public payload: AnswerModel) {}
}

export class AuthCheck implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthCheck;
}

export class AuthLogout implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthLogout;
}

export class AuthLogoutSucces implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthLogoutSucces;
}

export class AuthRegistry implements IAction<RegistryModel> {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthRegistry;
	constructor(public payload: RegistryModel) {}
}
export class AuthRegistryRedirect implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthRegistryRedirect;
}
export class AuthRegistrySuccess implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthRegistrySuccess;
}

export class AuthLogin implements IAction<LoginModel> {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthLogin;
	constructor(public payload: LoginModel) {}
}
export class AuthLoginSuccess implements IAction<UserModel> {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthLoginSuccess;
	constructor(public payload: UserModel) {}
}
export class AuthLoginRedirect implements IAction {
	public readonly type: AuthActionsEnum = AuthActionsEnum.AuthLoginRedirect;
}

export type AuthActionsTypes =
	AuthLogout |

	AuthRegistry |
	AuthRegistryRedirect |
	AuthRegistrySuccess |

	AuthLogin |
	AuthLoginSuccess |
	AuthLoginRedirect;
