export interface BeforeConfirmOrderMessage {
	en: string;
	ar: string;
}

export interface DefaultWorkingHours {
	start: string;
	end: string;
}

export interface OverrideWorkingHours {
	day: string;
	start: string;
	end: string;
	isActive: boolean;
}

export interface SettingInput {
	_id: string;
	name: string;
	nameAr: string;
	about: string;
	aboutAr: string;
	vatNumber: string;
	email: string;
	phoneNumber: string;
	logo: string;
	backgroundImage: string;
	twitter: string;
	instagram: string;
	snapchat: string;
	tiktok: string;
	whatsapp: string;
	domain: string;
	restaurant: boolean;
	crDoc: string;
	mancucpilityCertDoc: string;
	incorporationContractDoc: string;
	IbanCertDoc?: any;
	IdDoc?: any;
	deletedAt?: any;
	active: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
	ibanCertDoc: string;
	idDoc: string;
	reservationFee: number;
	taxEnabled: boolean;
	taxEnabledOnReservationFee: boolean;
	taxEnabledOnTableFee: boolean;
	taxRate: number;
	defaultWorkingHours: DefaultWorkingHours;
	isDeliveryEnabled: boolean;
	isDeliveryToCarEnabled: boolean;
	isMenuBrowsingEnabled: boolean;
	isPickupOrderEnabled: boolean;
	isScheduledOrderEnabled: boolean;
	overrideWorkingHours: OverrideWorkingHours[];
	isAppOrderEnabled: boolean;
	isReservationEnabled: boolean;
	isWaitingEnabled: boolean;
}

export interface RestaurantInput {
	name: string;
	nameAr: string;
	city: string;
	whatsappNumber: string;
	enableWhatsappCommunication: boolean;
	beforeConfirmOrderMessage: {
		en: string;
		ar: string;
	};
	defaultWorkingHours: {
		start: string;
		end: string;
	};
	isDefaultWorkingHours: boolean;
	overrideWorkingHours: OverrideWorkingHours[];
	isMenuBrowsingEnabled: boolean;
	isDeliveryEnabled: boolean;
	isPickupOrderEnabled: boolean;
	isScheduledOrderEnabled: boolean;
	isReservationEnabled: boolean;
	isWaitingEnabled: boolean;
	minimumDeliveryOrderValue: number;
	isAppOrderEnabled: boolean;
	isDeliveryToCarEnabled: boolean;
	terms?: Terms[];
	location: {
		address: string;
		city: string;
		zipCode: number;
		state: string;
		country: string;
		latitude: string;
		longitude: string;
		district: string;
	};
	enableTermsAndConditionsForOrders: boolean;
	id: string;
}

export interface Terms {
	type: string;
	termsAr: string;
	termsEn: string;
}
