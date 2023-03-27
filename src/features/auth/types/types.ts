export interface Inputs {
	email: string;
	password: string;
	alias: string;
	rememberMe: boolean;
}

export interface RegisterInputs {
	alias: string;
	name: string;
	nameAr?: string;
	about?: string;
	aboutAr?: string;
	email: string;
	phoneNumber?: string;
	vatNumber?: string;
	twitter?: string;
	instagram?: string;
	snapchat?: string;
	tiktok?: string;
	whatsapp?: string;
	domain?: string;
	taxEnabled?: boolean;
	taxRate?: number;
	reservationFee?: number;
	supplierUserEmail: string;
	supplierUserPassword: string;
	supplierUserName: string;
	supplierUserPhoneNumber?: string;
	supplierUserWhatsappNumber?: string;
}
