import { type STATUS } from '../../../types';
import { type User } from '../api/types';

export interface AuthState {
	token?: string;
	user: User | null;
	isLogin: boolean;
	status: STATUS;
}
