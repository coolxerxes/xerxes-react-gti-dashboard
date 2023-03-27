export interface MenuCategory {
	supplierId: string;
	name: string;
	nameAr: string;
	image: string;
	active: boolean;
	order: number;
	deletedAt: null;
	addedBy: string;
	createdAt: string;
	updatedAt: string;
	_id: string;
	id: string;
}

export interface Quantity {
	quantity: number;
	restaurantId: string;
}

export interface MenuItem {
	name: string;
	nameAr: string;
	description: string;
	descriptionAr: string;
	price: number;
	taxEnabled: boolean;
	calories: number;
	waiterCode: string;
	cost: number;
	categoryId: string;
	restaurantId: string;
	priceInStar: number;
	starGain: number;
	alergies: string[];
	quantities: Quantity[];
	suggestedItems: string[];
	additions: MenuAddition[];
	sticker: string;
	stickerStyle: string[];
	active?: boolean;
	image: string;
	hideFromMenu: string[];
	canBuyWithStars: boolean;
	soldOut: boolean;
	order: number;

	manageQuantity: boolean;
	_id: string;
	preparationTime?: number;
}

export interface AddCategory {
	name: string;
	nameAr: string;
	image: string;
}

export interface Option {
	name: string;
	nameAr: string;
	price: number;
	order: number;
	calory: number;
	active?: boolean;
	_id?: string;
}

export interface MenuAddition {
	_id: string;
	supplierId: string;
	name: string;
	nameAr: string;
	isMultipleAllowed: boolean;
	options: Option[];
	maxOptions: number;
	minOptions: number;
	freeOptions: number;
	active: boolean;
	addedBy: string;
	createdAt: string;
	updatedAt: string;
	taxEnabled: boolean;
	order: number;
}

export interface CategoryAdd {
	image: string;
	name: string;
	nameAr: string;
}

export interface GetMenuItemsParams {
	restaurantId?: string;
	categoryId?: string;
	search?: string;
	page?: number;
	limit?: number;
	pagination?: boolean;
}

export interface Menu {
	name: string;
	nameAr: string;
	description: string;
	descriptionAr: string;
	price: number;
	taxEnabled: boolean;
	calories: number;
	waiterCode: string;
	cost: number;
	categoryId: string;

	restaurantId: string;

	priceInStar: number;
	starGain: number;
	alergies: string[];
	quantities: Quantity[];
	suggestedItems: string[];
	additions: string[];
	sticker?: string;
	stickerStyle: string[];
	active?: boolean;
	image: string;
	hideFromMenu: string[];
	canBuyWithStars: boolean;
	soldOut: boolean;
	order: number;

	manageQuantity: boolean;
	_id: string;
	preparationTime?: number;
}

export interface GetMenuItemsResponse {
	data: {
		docs: Menu[];
	};
}

export type GetMenuItems = (
	params?: GetMenuItemsParams
) => Promise<GetMenuItemsResponse>;

type MenuItemOmittedAddition = Omit<MenuItem, 'additions'>;

interface MenuItemInput extends MenuItemOmittedAddition {
	additions: string[];
}

export type MenuItemPayload = Partial<MenuItemInput>;

export type PostMenuItem = (
	data: MenuItemPayload
) => Promise<{ data: MenuItem }>;

export type GetMenuItemById = (id: string) => Promise<{ data: MenuItem }>;

export type PatchMenuItemById = (data: {
	id: string;
	payload: MenuItemPayload;
}) => Promise<{ data: MenuItem }>;

export type DeleteMenuItemById = (id: string) => Promise<string>;

export interface GetMenuAdditionResponse {
	data: {
		docs: MenuAddition[];
	};
}

export type GetMenuAdditions = () => Promise<GetMenuAdditionResponse>;

export type GetMenuAdditionById = (
	id: string
) => Promise<{ data: MenuAddition }>;

export type MenuAdditionPayload = Partial<MenuAddition>;

export type PostMenuAddition = (
	data: MenuAdditionPayload
) => Promise<{ data: MenuAddition }>;

export type PatchMenuAdditionById = (data: {
	id: string;
	payload: MenuAdditionPayload;
}) => Promise<{ data: MenuAddition }>;

export type DeleteMenuAdditionById = (id: string) => Promise<string>;

export interface GetMenuCategoriesResponse {
	data: {
		docs: MenuCategory[];
	};
}

export type GetMenuCategories = (
	params?: GetMenuItemsParams
) => Promise<GetMenuCategoriesResponse>;

export type GetMenuCategoryById = (
	id: string
) => Promise<{ data: MenuCategory }>;

export type MenuCategoryPayload = Partial<MenuCategory>;

export type PatchMenuCategoryById = (
	data: MenuCategoryPayload
) => Promise<{ data: MenuCategory }>;

export type PostMenuCategory = (
	data: MenuCategoryPayload
) => Promise<{ data: MenuCategory }>;

export type DeleteMenuCategoryById = (id: string) => Promise<string>;
