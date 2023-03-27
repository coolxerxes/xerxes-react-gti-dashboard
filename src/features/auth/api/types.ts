export interface User {
	tableRegion: any;
	_id: string;
	restaurantId: any;
	name: string;
	email: string;
	password: string;
	role: {
		_id: string;
		name: string;
	};
	phoneNumber: string;
	whatsappNumber: string;
	tables: any[];
	kitchenQueue: any;
	cashier: any;
	isBlocked: boolean;
	addedBy: any;
	createdAt: string;
	updatedAt: string;
	paused: boolean;
	supplierId: {
		_id: string;
		active: boolean;
	};
	accessToken: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export type PostLogin = (data: LoginPayload) => Promise<{ data: User }>;

export type GetProfileMe = () => Promise<{ data: User }>;
