import DashboardIcon from 'assets/images/dashboard.svg';
import DashboardIconRed from 'assets/images/dashboard_red.svg';
import Orders from 'assets/images/orders.svg';
import Tables from 'assets/images/tables.svg';
import TablesRed from 'assets/images/tables_red.svg';
import Reservation from 'assets/images/reservation.svg';
import ReservationRed from 'assets/images/reservation-red.svg';
import Waiting from 'assets/images/waiting.svg';
import WaitingRed from 'assets/images/waiting-red.svg';
import Cashier from 'assets/images/cashier.svg';
import CashierRed from 'assets/images/cashier-red.svg';
import Kitchen from 'assets/images/chefs-hat.svg';
import KitchenRed from 'assets/images/chefs-hat-red.svg';
import Reports from 'assets/images/reports.svg';
import ReportsRed from 'assets/images/reports-red.svg';
import Comments from 'assets/images/comments.svg';
import CommentsRed from 'assets/images/comments-red.svg';
import Feedback from 'assets/images/feedback.svg';
import FeedbackRed from 'assets/images/feedback-red.svg';
import Coupons from 'assets/images/coupon.svg';
import CouponsRed from 'assets/images/coupon-red.svg';
import MenuIcon from 'assets/images/menu.svg';
import MenuRed from 'assets/images/menu-red.svg';
import Employee from 'assets/images/employe.svg';
import EmployeeRed from 'assets/images/employe-red.svg';
import Qr from 'assets/images/qr.svg';
import QrRed from 'assets/images/qr-red.svg';
import Settings from 'assets/images/settings.svg';
import SettingsRed from 'assets/images/settings_red.svg';
import SignOut from 'assets/images/sign-out.svg';

import { type Menu } from './types';

import { ADMIN, CASHIER, MENU, SETTINGS, KITCHEN } from 'routes/constants';

export const menus = (pathname: string): Menu[] => {
	return [
		// {
		// 	key: '/dashboard',
		// 	label: 'Dashboard',
		// 	icon: DashboardIcon,
		// 	iconRed: DashboardIconRed,
		// 	isSubMenu: false,
		// },
		{
			key: '/',
			// key: '/orders',

			label: 'Orders',
			icon: Orders,
			iconRed: DashboardIconRed,
			isSubMenu: true,
			// subMenus: [
			// 	{
			// 		key: 'dine in',
			// 		label: 'Dine in',
			// 		isActive: false,
			// 		isClickAble: true,
			// 	},
			// 	{
			// 		key: 'pick up',
			// 		label: 'Pick up',
			// 		isActive: false,
			// 		isClickAble: true,
			// 	},
			// 	{
			// 		key: 'schedule',
			// 		label: 'Schedule Orders',
			// 		isActive: false,
			// 		isClickAble: true,
			// 	},
			// 	{
			// 		key: 'app',
			// 		label: 'App',
			// 		isActive: false,
			// 		isClickAble: true,
			// 	},
			// 	{
			// 		key: 'delivery',
			// 		label: 'Delivery',
			// 		isActive: false,
			// 		isClickAble: true,
			// 	},
			// ],
		},
		{
			key: '/tables',
			label: 'Tables',
			icon: Tables,
			iconRed: TablesRed,
			isSubMenu: false,
		},
		// {
		// 	key: '/reservation',
		// 	label: 'Reservation',
		// 	icon: Reservation,
		// 	iconRed: ReservationRed,
		// 	isSubMenu: false,
		// },
		// {
		// 	key: '/waiting',
		// 	label: 'Waiting',
		// 	icon: Waiting,
		// 	iconRed: WaitingRed,
		// 	isSubMenu: false,
		// },
		{
			key: ADMIN.PATHS.CASHIERMONEY,
			label: 'Cashier',
			icon: Cashier,
			iconRed: CashierRed,
			isSubMenu: false,
		},
		{
			key: KITCHEN,
			label: 'Kitchen',
			icon: Kitchen,
			iconRed: KitchenRed,
			isSubMenu: false,
		},
		// {
		// 	key: '/reports',
		// 	label: 'Reports',
		// 	icon: Reports,
		// 	iconRed: ReportsRed,
		// 	isSubMenu: false,
		// },
		// {
		// 	key: '/comments',
		// 	label: 'Comments',
		// 	icon: Comments,
		// 	iconRed: CommentsRed,
		// 	isSubMenu: false,
		// },
		// {
		// 	key: '/feedback',
		// 	label: 'Feedback',
		// 	icon: Feedback,
		// 	iconRed: FeedbackRed,
		// 	isSubMenu: false,
		// },
		// {
		// 	key: '/coupon',
		// 	label: 'Coupons & promotions',
		// 	icon: Coupons,
		// 	iconRed: CouponsRed,
		// 	isSubMenu: false,
		// },
		{
			key: MENU,
			label: 'Menu',
			icon: MenuIcon,
			iconRed: MenuRed,
			isSubMenu: true,
			subMenus: [
				{
					key: ADMIN.PATHS.MENU_FOODS,
					label: 'Foods',
					isActive: pathname.includes(ADMIN.PATHS.MENU_FOODS),
					isClickAble: true,
				},
				{
					key: '/menus/sort',
					label: 'Sort',
					isActive: pathname === '/menus/sort',
					isClickAble: true,
				},
				{
					key: ADMIN.PATHS.MENU_ADDITIONS,
					label: 'Modifiers',
					isActive: pathname.includes(ADMIN.PATHS.MENU_ADDITIONS),
					isClickAble: true,
				},
				{
					key: '/menus/menu_engineering',
					label: 'Menu Engineering',
					isActive: pathname === '/menus/menu_engineering',
					isClickAble: true,
				},
			],
		},
		// {
		// 	key: '/employee',
		// 	label: 'Employees',
		// 	icon: Employee,
		// 	iconRed: EmployeeRed,
		// 	isSubMenu: false,
		// },
		{
			key: '/qr',
			label: "QR's",
			icon: Qr,
			iconRed: QrRed,
			isSubMenu: false,
		},
		{
			key: SETTINGS,
			label: 'Settings',
			icon: Settings,
			iconRed: SettingsRed,
			isSubMenu: true,
			subMenus: [
				{
					key: ADMIN.PATHS.SETTINGS_GENERAL,
					label: 'General',
					isActive: pathname.includes(ADMIN.PATHS.SETTINGS_GENERAL),
					isClickAble: true,
				},
				{
					key: ADMIN.PATHS.SETTINGS_WHATSAPPQR,
					label: 'Whatsapp QR',
					isActive: pathname.includes(ADMIN.PATHS.SETTINGS_WHATSAPPQR),
					isClickAble: true,
				},
				{
					key: ADMIN.PATHS.SETTINGS_RESTAURANT,
					label: 'Restaurant',
					isActive: pathname.includes(ADMIN.PATHS.SETTINGS_RESTAURANT),
					isClickAble: true,
				},
				{
					key: '/settings/payment_integration',
					label: 'Payment and Integration',
					isActive: pathname === '/settings/payment_integration',
					isClickAble: true,
				},
				{
					key: 'design',
					label: 'Design',
					isActive: false,
					isClickAble: true,
				},
				{
					key: 'subscription',
					label: 'Subscription',
					isActive: false,
					isClickAble: true,
				},
			],
		},
		{
			key: 'login',
			label: 'Sign out',
			icon: SignOut,
			isSubMenu: false,
		},
	];
};
