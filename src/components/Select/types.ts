export interface Props {
	options: Option[];
	selected: string | boolean | number;
	onChange: (value: string) => void;
	className?: string;
}

export interface Option {
	value: string | boolean | number;
	label: string;
}
