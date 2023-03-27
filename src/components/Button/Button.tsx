import classNames from 'classnames';
import { type Props } from './types';

const Button: React.FC<React.PropsWithChildren<Props>> = (props) => {
	const {
		children,
		variant = 'primary',
		height = 35,
		width,
		backgroundColor,
		className = '',
		type = 'button',
		onClick,
		disable = false,
		...otherProps
	} = props;

	const rootClassName = classNames({
		'text-gray': variant === 'default',
		'bg-primary text-white  active:text-white font-semibold':
			variant === 'primary',
		'hover:text-white p-0 active:text-white font-semibold flex items-center min-w-fit justify-center hover:!cursor-pointer rounded-md px-2':
			true,
		'bg-lightGray text-normalBlack font-semibold': variant === 'ghost',
		'border-dashed border-primary bg-white text-primary': variant === 'dashed',
		'text-normalBlack': variant === 'default',
		[className]: Boolean(classNames),

		'active:!text-primary active:!border-primary hover:!text-primary hover:!border-primary ':
			variant === 'dashed',
		'active:!text-normalBlack active:!border-0 active:!bg-lightGray !text-normalBlack !border-0 !bg-lightGray  hover:!text-normalBlack hover:!border-0 hover:!bg-lightGray ':
			variant === 'ghost',
		'active:!text-normalBlack active:!border-transparent hover:!text-normalBlack hover:!border-transparent':
			variant === 'default',
		'active:!text-primary bg-white active:!border-primary hover:!text-primary hover:!border-primary':
			variant === 'outline',
		'hover:!border-primary hover:border-dashed w-full bg-[#C02328] text-white':
			variant === 'prepare',
		'border-primary w-full border-dashed text-[#C02328] hover:!text-primary active:text-primary':
			variant === 'complete',
		'opacity-70': disable,
	});

	return (
		<button
			disabled={disable}
			className={rootClassName}
			onClick={onClick}
			type={type}
			style={{ height, width, backgroundColor }}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
