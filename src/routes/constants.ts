export const ADMIN_ROOT = '/';
export const SETTINGS = `settings`;
export const MENU = `menus`;
export const CASHIER = 'cashier';
export const TABLES = 'tables';
export const KITCHEN = 'kitchen';
export const ORDERS = 'orders';

export const ADMIN = {
	PATHS: {
		ROOT: ADMIN_ROOT,
		LOGIN: `/login`,
		QR: `/qr`,
		SETTINGS_GENERAL: `/${SETTINGS}/general`,
		SETTINGS_RESTAURANT: `/${SETTINGS}/restaurant`,
		SETTINGS_PAYMENT: `/${SETTINGS}/payment_integration`,
		SETTINGS_PAYMENT_EDIT: `/${SETTINGS}/payment_integration/edit_payment`,
		SETTINGS_WHATSAPPQR: `/${SETTINGS}/whatsappQR`,
		MENU_FOODS: `/${MENU}/foods`,
		MENU_FOODS_ADD_CATEGORY: `/${MENU}/foods/category/add`,
		MENU_FOODS_EDIT_CATEGORY: `/${MENU}/foods/category/edit`,
		MENU_FOODS_ADD: `/${MENU}/foods/add`,
		MENU_FOODS_EDIT: `/${MENU}/foods/edit`,
		MENU_ADDITIONS: `/${MENU}/additions`,
		MENU_SORT: `/${MENU}/sort`,

		MENU_ADDITIONS_ADD: `/${MENU}/additions/add`,
		MENU_ADDITIONS_EDIT: `/${MENU}/additions/edit`,
		CASHIERMONEY: `/${CASHIER}/money`,
		TABLES: '/tables',
		KITCHEN_GENERAL: `/${KITCHEN}/kitchen`,
		NEW_ORDER: '/neworder',
	},
};
