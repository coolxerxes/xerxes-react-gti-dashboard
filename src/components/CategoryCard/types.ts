export interface ImageProps {
	image: string;
	name: string;
	price?: number;
	updateIsActive?: (value: boolean, id: string) => void;
	deleteItem?: (id: string) => void;
	editItem?: (id: string) => void;
	loading?: boolean;
	className?: string;
	isSoldOut?: boolean;
}
