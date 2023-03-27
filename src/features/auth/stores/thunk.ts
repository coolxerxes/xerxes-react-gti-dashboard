import { createAsyncThunk } from '@reduxjs/toolkit';
import { postLogin, getProfileMe } from '../api/index';
import { type LoginPayload } from '../api/types';

export const postLoginAsync = createAsyncThunk(
	'auth/login',
	async (payload: LoginPayload) => {
		return await postLogin(payload);
	}
);

export const getProfileMeAsync = createAsyncThunk(
	'user/profileMe',
	async () => {
		return await getProfileMe();
	}
);
