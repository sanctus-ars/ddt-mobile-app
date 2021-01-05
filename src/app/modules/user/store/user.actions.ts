import { RegistryModel, UserModel } from 'src/app/shared/models';
import { IAction } from 'src/app/shared/interface/action.interface';

export enum UserActionsEnum {
	Read = '[User] Read',
	Create = '[User] Create',
	Update = '[User] Update',
	Delete = '[User] Delete',

	ReadSuccess = '[User] Read Success',
	CreateSuccess = '[User] Create Success',
	UpdateSuccess = '[User] Update Success',
	DeleteSuccess = '[User] Delete Success',

	UserError = '[User] Error',
}

export class Read implements IAction {
	public readonly type: UserActionsEnum = UserActionsEnum.Read;
}

export class Create implements IAction<RegistryModel> {
	public readonly type: UserActionsEnum = UserActionsEnum.Create;
	constructor(public payload: RegistryModel) {}
}

export class Update implements IAction<UserModel> {
	public readonly type: UserActionsEnum = UserActionsEnum.Update;
	constructor(public payload: UserModel) {}
}

export class Delete implements IAction {
	public readonly type: UserActionsEnum = UserActionsEnum.Delete;
}

export class ReadSuccess implements IAction<UserModel> {
	public readonly type: UserActionsEnum = UserActionsEnum.ReadSuccess;
	constructor(public payload: UserModel) {}
}

export class UpdateSuccess implements IAction<UserModel> {
	public readonly type: UserActionsEnum = UserActionsEnum.UpdateSuccess;
	constructor(public payload: UserModel) {}
}

export class DeleteSuccess implements IAction {
	public readonly type: UserActionsEnum = UserActionsEnum.DeleteSuccess;
}

export class CreateSuccess implements IAction<UserModel> {
	public readonly type: UserActionsEnum = UserActionsEnum.CreateSuccess;
	constructor(public payload: UserModel) {}
}

export class UserError implements IAction {
	public readonly type: UserActionsEnum = UserActionsEnum.UserError;
}

export type UserActionsTypes =
	Read |
	Create |
	Update |
	Delete |

	ReadSuccess |
	CreateSuccess |
	UpdateSuccess |
	DeleteSuccess |

	UserError;
