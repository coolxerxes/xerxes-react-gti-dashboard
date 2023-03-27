export interface Props {
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	placeholder?: string;
}
