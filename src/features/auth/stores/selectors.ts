import { type RootState } from '../../../redux/Store';
import { type User } from '../api/types';
import { type STATUS } from '../../../types';

export const selectUser = (state: RootState): User =>
	state.resources.auth.user as any;

export const selectIsLoggedIn = (state: RootState): boolean =>
	state.resources.auth.isLogin;

export const selectAuthStatus = (state: RootState): STATUS =>
	state.resources.auth.status;
