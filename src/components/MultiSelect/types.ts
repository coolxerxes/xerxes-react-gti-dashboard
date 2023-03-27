import { type Dispatch, type SetStateAction } from 'react';

export interface Props {
	options: Option[];
	selected?: string[] | number[];
	onChange: (value: string[]) => void;
	className?: string;
	variant?: 'primary' | 'success' | 'ghost' | 'white';
	setSelected?: Dispatch<SetStateAction<string[]>>;
	multi?: boolean;
}

export interface Option {
	value?: string | number;
	label: string;
}

export interface SelectedItemProps {
	height?: number;
	width?: number;
	variant?: 'primary' | 'success' | 'ghost' | 'white';
	label?: string;
	className?: string;
	onClick?: () => void;
	setSelected?: Dispatch<SetStateAction<string[]>>;
	selected?: any;
	item?: string | number;
}
