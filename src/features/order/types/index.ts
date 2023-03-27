export interface LocationDTO {
	address: string;
	city: string;
	zipCode: number;
	state: string;
	country: string;
	latitude: string;
	longitude: string;
	district: string;
}
// eslint-disable-next-line import/export
export interface AdditionOptionDTO {
	name: string;
	nameAr: string;
	price: number;
	order: number;
	calory: number;
	_id: string;
	active: boolean;
}

export interface MenuAdditionDTO {
	name: string;
	nameAr: string;
	isMultipleAllowed: boolean;
	maxOptions: number;
	price: number;
	minOptions: number;
	freeOptions: number;
	taxEnabled: boolean;
	order: number;
	active: boolean;
	_id: string;
	options: AdditionOptionDTO[];
}

export interface Restaurant {
	docs: Array<{
		id: string;
		name: string;
		nameAr: string;
		city: string;
		whatsappNumber: string;
		enableWhatsappCommunication: boolean;
		minimumDeliveryOrderValue: number;
		isDeliveryToCarEnabled: boolean;
		location: LocationDTO;
		terms: Array<{
			OrderTypes: 'All' | 'Pickup' | 'Delivery' | 'Local';
			termsAr: string;
			termsEn: string;
		}>;
	}>;
}

export interface RestaurantResult {
	data: Restaurant;
	statusCode: number;
	timestamp: string;
}

export interface MenuCategories {
	docs: Array<{
		_id: string;
		supplierId: string;
		name: string;
		nameAr: string;
		image: string;
		active: true;
		deletedAt: string;
		addedBy: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
		id: string;
	}>;
}

export interface MenuCategoriesResult {
	data: MenuCategories;
	statusCode: number;
	timestamp: string;
}

export interface MenuItems {
	docs: Array<{
		_id: string;
		supplierId: string;
		restaurantId: string;
		categoryId: string;
		name: string;
		nameAr: string;
		description: string;
		descriptionAr: string;
		price: number;
		cost: number;
		taxEnabled: boolean;
		priceInStar: number;
		starGain: number;
		order: number;
		calories: number;
		image: string;
		waiterCode: string;
		alergies: string[];
		quantities: Array<{
			quantity: number;
			restaurantId: string;
		}>;

		suggestedItems: string[];
		hideFromMenu: string[];
		soldOut: boolean;
		manageQuantity: boolean;
		canBuyWithStars: boolean;
		additions: string[];
		sticker: string;
		stickerStyle: string[];
		active: boolean;
		deletedAt: string;
		addedBy: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
		preparationTime: number;
		id: string;
	}>;
}

export interface MenuItemsResult {
	data: MenuItems;
	statusCode: number;
	timestamp: string;
}

interface OrderItemDTO {
	menuItem: {
		menuItemId: string;
	};
	additions: Array<{
		menuAdditionId: string;
		options: Array<{
			optionId: string;
		}>;
	}>;
	quantity: number;
	notes: string;
}

export interface PostOrderPreviewPayload {
	restaurantId: string;
	source: 'App' | 'Website' | 'Dine In';
	orderType: 'To Go' | 'Pickup' | 'Delivery' | 'Dine In';
	notes?: string;
	couponCode?: string;
	isScheduled?: boolean;
	customerId?: string;
	tableId?: string | null;
	waiterId?: string;
	kitchenQueueId?: string;
	name?: string;
	contactNumber?: string;
	deliveryAddress?: LocationDTO;
	items: OrderItemDTO[];
}

type OrderItemDetails = OrderItemDTO &
	Array<{
		amountAfterDiscount: number;
		amountBeforeDiscount: number;
		unitPriceAfterDiscount: number;
		unitPriceBeforeDiscount: number;
		discount: number;
		quantity: number;
	}>;

export interface PostOrderPreviewData {
	isDryRun: boolean;
	items: OrderItemDetails;
	_id: string;
	summary: {
		discount: number;
		headerDiscount: number;
		totalBeforeDiscount: number;
		totalPaid: number;
		totalRefunded: number;
		totalTax: number;
		totalTaxableAmount: number;
		totalWithTax: number;
	};
}

export interface PostOrderPreviewResult {
	data: PostOrderPreviewData;
	statusCode: number;
	timestamp: string;
}
