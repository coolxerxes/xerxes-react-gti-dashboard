export interface RestaurantId {
	_id: string;
	name: string;
	nameAr: string;
}

export interface CustomerId {
	_id: string;
	name: string;
}

export interface TableId {
	_id: string;
	name: string;
	nameAr: string;
}

export interface MenuItem {
	menuItemId: string;
	name: string;
	nameAr: string;
	description: string;
	descriptionAr?: any;
	unitPriceBeforeDiscount: number;
	amountBeforeDiscount: number;
	unitPriceDiscount: number;
	discount: number;
	unitPriceAfterDiscount: number;
	amountAfterDiscount: number;
	itemTaxableAmount: number;
	tax: number;
	taxEnabled: boolean;
	priceInStar: number;
	starGain: number;
	calories: number;
	image: string;
	alergies: any[];
	waiterCode?: string;
}

export interface Addition {
	menuAdditionId: string;
	name?: string;
	nameAr?: string;
	options: Array<{
		optionId: string;
		name: string;
	}>;
}

export interface Item {
	menuItem: MenuItem;
	additions: Addition[];
	unitPriceBeforeDiscount: number;
	amountBeforeDiscount: number;
	unitPriceDiscount: number;
	discount: number;
	unitPriceAfterDiscount: number;
	amountAfterDiscount: number;
	itemTaxableAmount: number;
	tax: number;
	quantity: number;
	notes: string;
	_id: string;
}

export interface TableFee {
	fee: number;
	netBeforeTax: number;
	tax: number;
}

export interface Summary {
	totalBeforeDiscount: number;
	discount: number;
	totalWithTax: number;
	totalTaxableAmount: number;
	totalTax: number;
	totalPaid: number;
	totalRefunded: number;
	headerDiscount: number;
}

export interface DeliveryAddress {
	address: string;
	city: string;
	zipCode: number;
	state: string;
	latitude: string;
	longitude: string;
	district: string;
}

export interface Order {
	_id: string;
	supplierId: string;
	restaurantId: RestaurantId;
	customerId?: CustomerId;
	tableId: TableId;
	waiterId?: any;
	kitchenQueueId?: any;
	cashierId?: any;
	groupId?: any;
	name: string;
	contactNumber: string;
	source: string;
	orderType: string;
	status: string;
	isScheduled: boolean;
	isGrouped: boolean;
	scheduledDateTime?: any;
	items: Item[];
	paymentStatus: 'Not Paid' | 'Paid';
	tableFee: TableFee;
	summary: Summary;
	taxRate: number;
	transactions: any[];
	menuQrCodeScannedTime?: any;
	sentToKitchenTime?: any;
	orderReadyTime?: any;
	orderNumber: string;
	paymentTime?: any;
	sittingStartTime?: any;
	couponCode?: any;
	addedBy: string;
	deliveryAddress: DeliveryAddress;
	__v: number;
	createdAt: string;
	updatedAt: string;
}

export interface Kitchen {
	active: boolean;
	addedBy: string;
	createdAt: string;
	id: string;
	name: string;
	nameAr: string;
	paused: boolean;
	restaurantId: string;
	supplierId: string;
	updatedAt: string;
	userId: string;
	__v: number;
	_id: string;
}

export interface TableLog {
	menuScannedTime: string;
	helpNeeded: boolean;
	_id: string;
	supplierId: string;
	restaurantId: string;
	tableId: string;
	waiterId: string;
	orders: string[];
	startingTime: string;
	closingTime?: string;
	paymentNeeded: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Table {
	currentTableLog?: TableLog;
	_id: string;
	supplierId: string;
	restaurantId: RestaurantId;
	tableRegionId: string;
	name: string;
	nameAr: string;
	totalChairs: number;
	shape: string;
	minutesAllowed: number;
	startingTime?: any;
	status: string;
	waiterNeeded: boolean;
	deletedAt?: any;
	addedBy: string;
	createdAt: string;
	updatedAt: string;
}

export interface GetOrdersParams {
	restaurantId?: string;
	tableId?: string;
}

export interface GetTablesParams {
	restaurantId?: string;
	tableRegionId?: string;
}

export interface GetOrdersResponse {
	data: {
		docs: Order[];
	};
}

export interface GetKitchensResponse {
	data: {
		docs: Kitchen[];
	};
}

export interface GetTablesResponse {
	data: {
		docs: Table[];
	};
}

export type GetOrders = (params?: any) => Promise<GetOrdersResponse>;

export type GetKitchens = (
	id?: string | undefined
) => Promise<GetKitchensResponse>;

export type GetTables = (
	params?: GetTablesParams
) => Promise<GetTablesResponse>;

export interface GetTableParams {
	id: string | undefined;
}

export interface GetTableResponse {
	data: {
		docs: Table;
	};
}
export type GetTable = (id?: GetTableParams) => Promise<GetTableResponse>;

export interface GetCashierResponse {
	data: {
		docs: Table;
	};
}

export interface GetCashierParams {
	params?: any;
}
export type GetCashiers = (
	params?: GetCashierParams
) => Promise<GetCashierResponse>;

export interface GetCashierDashboardResponse {
	openingBalance: number;
	totalInBank: number;
	totalInCash: number;
	totalRefunds: number;
	totalSales: number;
}

export type GetDashboard = (
	cashierId: string | undefined
) => Promise<GetCashierDashboardResponse>;
