import { type UseFormRegister } from 'react-hook-form';

export interface Props {
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: InputType;
	className?: string;
	containerClassNames?: string;
	label?: JSX.Element | string;
	prefix?: JSX.Element;
	suffix?: JSX.Element;
	placeholder?: string;
	register: UseFormRegister<any>;
	required?: boolean;
}

export type InputType = 'text' | 'number' | 'textarea' | 'password';
