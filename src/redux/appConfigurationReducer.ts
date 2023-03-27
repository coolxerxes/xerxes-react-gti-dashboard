import { createSlice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from './Store';

interface AppConfiguration {
	language: string;
	direction: string;
}

interface initialInterface {
	appConfiguration: AppConfiguration;
}

const initialState: initialInterface = {
	appConfiguration: {
		language: '',
		direction: '',
	},
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setAppConfiguration: (state, action) => {
			state.appConfiguration = action.payload;
		},
	},
	extraReducers: (builder) => {},
});

export default globalSlice.reducer;

export const { setAppConfiguration } = globalSlice.actions;

export const selectAppConfiguration = (state: RootState) => {
	return state.ui.configuration.appConfiguration;
};

export const useAppConfiguration = () => {
	const configuration = useSelector(selectAppConfiguration);
	return useMemo(() => ({ configuration }), [configuration]);
};
