import { type DefaultTFuncReturn } from 'i18next';
import { type UseFormRegister } from 'react-hook-form';

export interface Props {
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: InputType;
	className?: string;
	containerClassNames?: string;
	label?: JSX.Element | any;
	prefix?: JSX.Element;
	suffix?: JSX.Element;
	placeholder?: any;
	register: UseFormRegister<any>;
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string;
	min?: number;
	max?: number;
	isRightIcon?: boolean;
}

export type InputType = 'text' | 'number' | 'textarea' | 'password' | 'time';
