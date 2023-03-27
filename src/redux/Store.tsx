import { combineReducers as _, configureStore } from '@reduxjs/toolkit';

import authReducer from 'features/auth/stores/reducer';
import enumReducer from 'stores/reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import configuration from './appConfigurationReducer';
import orders from './ordersReducer';
import cartReducer from '../features/order/slices/CartSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = _({
	resources: _({
		auth: authReducer,
		enum: enumReducer,
	}),
	ui: _({
		configuration,
	}),
	data: _({
		orders,
		cartReducer,
	}),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
