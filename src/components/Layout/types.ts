export interface Menu {
	key: string;
	label: string;
	icon: string;
	iconRed?: string;
	isSubMenu: boolean;
	subMenus?: SubMenu[];
}

export interface SubMenu {
	key: string;
	label: string;
	isActive: boolean;
	isClickAble: boolean;
}
