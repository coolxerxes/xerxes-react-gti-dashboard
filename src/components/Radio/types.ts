export interface Props {
	label: string;
	name: string;
	id: string;
	onChange: (e: boolean) => void;
	checked: boolean;
	className?: string;
}
