import { createSlice } from '@reduxjs/toolkit';
import { type EnumState } from './types';

import { getEnumsMeAsync } from './thunk';

const initialState: EnumState = {
	enums: [],
	status: 'INITIAL',
};

export const guestsSlice = createSlice({
	name: 'userDataService',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getEnumsMeAsync.pending, (state) => {
				state.status = 'STARTED';
			})
			.addCase(getEnumsMeAsync.fulfilled, (state, action) => {
				state.status = 'DONE';
				state.enums = [...state.enums, action.payload.data?.[0]];
			})
			.addCase(getEnumsMeAsync.rejected, (state) => {
				state.status = 'FAILED';
			});
	},
});

export default guestsSlice;
