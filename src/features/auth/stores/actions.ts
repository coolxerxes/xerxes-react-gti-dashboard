import { postLoginAsync, getProfileMeAsync } from './thunk';
import authSlice from './slice';

const { signOut } = authSlice.actions;

export { postLoginAsync, getProfileMeAsync, signOut };
