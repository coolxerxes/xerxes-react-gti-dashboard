import { useTranslation } from 'react-i18next';
import useScrollPosition from '../Layout/hooks/useScrollPosition';

const Banner: React.FC<any> = ({ children, className }) => {
	const scrollPosition = useScrollPosition();
	const { i18n } = useTranslation();

	return (
		<>
			{/* <div
				className={
					scrollPosition > 50 ? `absolute inset-0 rounded-lg shadow-lg` : ``
				}
			></div>
			<div
				className={
					scrollPosition > 50
						? `absolute inset-0 rounded-lg shadow-lg before:absolute before:inset-0 `
						: ``
				}
			></div>
			<div
				className={
					scrollPosition > 50
						? `absolute inset-0 rounded-lg shadow-lg after:absolute after:inset-0 `
						: ``
				}
			></div> */}

			<div
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				className={`w-[100%] flex bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg px-3 ${
					i18n.resolvedLanguage === 'ar' ? 'flex-row-reverse ' : 'flex-row'
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				}  ${className}`}
			>
				{children}
			</div>
		</>
	);
};

export default Banner;
