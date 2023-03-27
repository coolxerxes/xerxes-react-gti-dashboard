import { createSlice } from '@reduxjs/toolkit';
import type { Order } from 'features/cashier/api/types';

interface OrderState {
	order: Order[];
	isLoading: boolean;
	error: string;
	transactions: any;
}

const initialState: OrderState[] | any = {
	order: [],
	transactions: [],
};

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrders: (state, action) => {
			state.order = action.payload;
		},
		setTransaction: (state, action) => {
			const arr = [...state.transactions, ...action.payload];
			const uniqueArr = arr.filter((obj, index, self) => {
				return index === self.findIndex((t) => t._id === obj._id);
			});
			state.transactions = uniqueArr;
		},
		deleteTransaction: (state, action) => {
			state.transactions = state.transactions.filter(
				(transaction: any) => transaction?._id !== action.payload?._id
			);
		},
	},
});

export default ordersSlice.reducer;

export const { setOrders, setTransaction, deleteTransaction } =
	ordersSlice.actions;
