import {
	type RestaurantInput,
	type SettingInput,
} from 'features/settings/types';

export interface BeforeConfirmOrderMessage {
	en: string;
	ar: string;
}

export interface DefaultWorkingHours {
	start: string;
	end: string;
}

export interface Location {
	address: string;
	city: string;
	zipCode: number;
	state: string;
	country: string;
	latitude: string;
	longitude: string;
	district: string;
}

export interface Term {
	type: string;
	termsAr: string;
	termsEn: string;
}

export interface Restaurant {
	isAppOrderEnabled: boolean;
	_id: string;
	supplierId: string;
	name: string;
	nameAr: string;
	city: string;
	whatsappNumber: string;
	enableWhatsappCommunication: boolean;
	beforeConfirmOrderMessage: BeforeConfirmOrderMessage;
	defaultWorkingHours: DefaultWorkingHours;
	isMenuBrowsingEnabled: boolean;
	isDeliveryEnabled: boolean;
	isPickupOrderEnabled: boolean;
	isScheduledOrderEnabled: boolean;
	isDeliveryToCarEnabled: boolean;
	isReservationEnabled: boolean;
	isWaitingEnabled: boolean;
	minimumDeliveryOrderValue: number;
	location: Location;
	active: boolean;
	deletedAt?: any;
	addedBy: string;
	overrideWorkingHours: any[];
	terms: Term[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}

export interface RestaurantResponse {
	data: Restaurant;
	statusCode: number;
	timestamp: Date;
}

export interface GetRestaurantsResponse {
	data: {
		docs: Restaurant[];
	};
	statusCode: number;
	timestamp: Date;
}

export interface RestaurantPayload extends RestaurantInput {}

export type PostRestaurant = (
	data: RestaurantPayload
) => Promise<RestaurantResponse>;

export type PutRestaurant = (data: {
	id: string;
	payload: RestaurantPayload;
}) => Promise<RestaurantResponse>;

export type DeleteRestaurant = (id: string) => Promise<string>;

export type GetRestaurants = () => Promise<GetRestaurantsResponse>;

export interface OverrideWorkingHour {
	day: string;
	start: string;
	end: string;
}

export interface Supplier {
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
	overrideWorkingHours: OverrideWorkingHour[];
	isAppOrderEnabled: boolean;
	isReservationEnabled: boolean;
	isWaitingEnabled: boolean;
	id: string;
}

export interface SupplierResponse {
	data: Supplier;
	statusCode: number;
	timestamp: Date;
}

export interface SupplierPayload extends SettingInput {}

export type PutSupplier = (
	data: Partial<SupplierPayload>
) => Promise<SupplierResponse>;

export type GetSupplier = () => Promise<SupplierResponse>;

export interface Payment {
	inStore: {
		ePayment: boolean;
		cashPayment: boolean;
		rewardsClaim: boolean;
	};
	delivery: {
		ePayment: boolean;
		cashPayment: boolean;
		rewardsClaim: boolean;
	};
	pickup: {
		ePayment: boolean;
		cashPayment: boolean;
		rewardsClaim: boolean;
	};
	bankAccountHolder: string;
	bankAccountHolderEmail: string;
	bankName: string;
	otherBank: string;
	iban: string;
	_id: string;
}

export interface PaymentSetupResponses {
	data: {
		docs: Payment[];
	};
	statusCode: number;
	timestamp: Date;
}

export type GetPaymentSetups = () => Promise<PaymentSetupResponses>;

export type PatchPaymentSetup = (data: {
	id: string;
	payload: Payment;
}) => Promise<{ data: Payment }>;

export type GetPaymentSetupById = (id: string) => Promise<{ data: Payment }>;
