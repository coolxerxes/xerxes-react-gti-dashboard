export interface Props {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	title?: JSX.Element | string;
	className?: string;
}
