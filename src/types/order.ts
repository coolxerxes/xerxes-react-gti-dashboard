export interface RestaurantId {
	_id: string;
	name: string;
	nameAr: string;
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
	descriptionAr: string;
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
	image?: any;
	alergies: any[];
	preparationTime: number;
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
	preparationTime: number;
	preparationStatus: string;
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
	latitude: string;
	longitude: string;
}

export interface PreparationDetails {
	preparationTime: number;
	expectedStartTime: Date;
	expectedEndTime: Date;
	actualStartTime: Date;
	actualEndTime: Date;
	kitchenSortingNumber: number;
}

export interface OrderObject {
	_id: string;
	supplierId: string;
	restaurantId: RestaurantId;
	customerId?: any;
	tableId: TableId;
	waiterId?: any;
	kitchenQueueId?: any;
	cashierId?: any;
	groupId?: any;
	orderNumber: string;
	name?: any;
	contactNumber?: any;
	source: string;
	orderType: string;
	status: string;
	isScheduled: boolean;
	isGrouped: boolean;
	scheduledDateTime: Date;
	items: Item[];
	paymentStatus: string;
	tableFee: TableFee;
	summary: Summary;
	taxRate: number;
	transactions: any[];
	menuQrCodeScannedTime: Date;
	sentToKitchenTime?: any;
	orderReadyTime?: any;
	paymentTime?: any;
	sittingStartTime: Date;
	couponCode: string;
	addedBy: string;
	deliveryAddress: DeliveryAddress;
	preparationDetails: PreparationDetails;
	chefRequestedClarification: boolean;
	chefInquiry: any[];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	id: string;
}
