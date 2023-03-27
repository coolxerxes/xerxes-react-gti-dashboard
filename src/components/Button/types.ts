export interface Props {
	height?: number;
	width?: number;
	variant?: string;
	className?: string;
	onClick?: (() => void) | ((e: any) => void);
	type?: 'button' | 'submit' | 'reset';
	disable?: boolean;
	backgroundColor?: any;
}
