import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type PostOrderPreviewData } from '../types';

export interface CartState {
	cart: any;
	items: any[];
	discount: string;
	orderType: string;
	customerData: any;
}

const initialState: CartState = {
	cart: null,
	items: [],
	discount: '',
	orderType: '',
	customerData: null,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setDiscount: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.discount = action.payload;
		},
		setCart: (state, action) => {
			state.cart = action.payload;
		},
		removeItem: (state, action) => {
			state.items = state.items.filter((item: any, index2: number) => {
				return index2 !== action.payload;
			});
		},
		editQuantity: (state, action) => {
			state.items = state.items.map((item, index) => {
				if (index === action.payload) {
					return {
						...item,
						// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
						quantity: item.quantity + 1,
					};
				} else {
					return item;
				}
			});
		},
		decreaseQuantity: (state, action) => {
			state.items = state.items.map((item, index) => {
				if (index === action.payload) {
					return {
						...item,
						// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
						quantity: item.quantity - 1,
					};
				} else {
					return item;
				}
			});
		},
		setItems: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		resetItems: (state, action) => {
			state.items = [];
		},
		setOrderType: (state, action) => {
			state.orderType = action.payload;
		},
		setCustomerData: (state, action) => {
			state.customerData = action.payload;
		},
		// set((prevState: any) => ({ items: [...prevState.items, item] })),
	},
});

// Action creators are generated for each case reducer function
export const {
	setDiscount,
	setCart,
	removeItem,
	editQuantity,
	decreaseQuantity,
	setItems,
	resetItems,
	setOrderType,
	setCustomerData,
} = cartSlice.actions;

export default cartSlice.reducer;
