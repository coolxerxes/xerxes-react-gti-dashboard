import { createSlice } from '@reduxjs/toolkit';
import { type AuthState } from './types';

import { postLoginAsync, getProfileMeAsync } from './thunk';
import { TOKEN } from 'config/constants';

export const userInitializer = {
	tableRegion: null,
	isDefaultWaiter: true,
	_id: '',
	restaurantId: null,
	name: '',
	email: '',
	password: '',
	role: {
		_id: '',
		name: '',
	},
	phoneNumber: '',
	whatsappNumber: '',
	tables: [],
	kitchenQueue: null,
	cashier: null,
	isBlocked: false,
	addedBy: null,
	createdAt: '',
	updatedAt: '',
	paused: true,
	supplierId: {
		_id: '',
		active: true,
	},
	accessToken: '',
};

const initialState: AuthState = {
	isLogin: false,
	user: userInitializer,
	status: 'INITIAL',
};

export const guestsSlice = createSlice({
	name: 'userDataService',
	initialState,
	reducers: {
		signOut(state) {
			state.isLogin = false;
			state.token = undefined;
			state.status = 'FAILED';
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(postLoginAsync.pending, (state) => {
				state.status = 'STARTED';
			})
			.addCase(postLoginAsync.fulfilled, (state, action) => {
				state.status = 'DONE';
				state.user = action.payload.data;
				state.isLogin = true;
				localStorage.setItem(TOKEN, action.payload.data.accessToken);
			})
			.addCase(postLoginAsync.rejected, (state) => {
				state.status = 'FAILED';
				state.isLogin = false;
			})
			.addCase(getProfileMeAsync.pending, (state) => {
				state.status = 'STARTED';
			})
			.addCase(getProfileMeAsync.fulfilled, (state, action) => {
				state.status = 'DONE';
				state.user = action.payload.data;
				state.isLogin = true;
			})
			.addCase(getProfileMeAsync.rejected, (state) => {
				state.status = 'FAILED';
				state.isLogin = false;
			});
	},
});

export default guestsSlice;
