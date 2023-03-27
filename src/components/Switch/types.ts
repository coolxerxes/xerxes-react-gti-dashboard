export interface Props {
	checked?: boolean;
	name?: string;
	onChange?: (value: boolean) => void;
	className?: string;
	type?: SwitchType;
	size?: 'small' | 'medium';
}

export type SwitchType = 'Success' | 'Danger';
