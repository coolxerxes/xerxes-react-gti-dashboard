export interface Props {
	height?: number;
	width?: number;
	variant?: 'primary' | 'success' | 'ghost';
	label?: any;
	className?: string;
	onClick?: () => void;
	isShowSuffix?: boolean;
	selected?: boolean;
}

export interface SimpleTagProps {
	height?: number;
	width?: number;
	variant?: 'dashed' | 'ghost' | 'primary' | 'success' | 'danger';
	label?: any;
	className?: string;
}
