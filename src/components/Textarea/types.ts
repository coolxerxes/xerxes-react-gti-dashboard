import { type UseFormRegister } from 'react-hook-form';

export interface Props {
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	containerClassNames?: string;
	label?: JSX.Element | string;
	prefix?: JSX.Element;
	suffix?: JSX.Element;
	placeholder?: any;
	resize?: ResizeType;
	rows?: number;
	cols?: number;
	register: UseFormRegister<any>;
	required?: boolean;
	disabled?: boolean;
}

export type ResizeType = 'resize-none' | 'resize-x' | 'resize-y' | 'resize';
