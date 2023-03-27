import classNames from 'classnames';
import { type SelectedItemProps } from './types';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const RoundedShape: React.FC<React.PropsWithChildren<SelectedItemProps>> = (
	props
) => {
	const {
		children,
		variant = 'success',
		height = 35,
		width,
		label,
		className = '',
		onClick,
		selected,
		setSelected,
		item,
		...otherProps
	} = props;

	const rootClassName = classNames({
		'!bg-red-100 text-primary !border-primary font-semibold':
			variant === 'primary',
		'!bg-[#f6fbed] text-[#409e0e] !border-[#cdf1b1] font-semibold':
			variant === 'success',
		'!bg-white ': variant === 'white',
		'!bg-inputBg border-borderGray font-semibold': variant === 'ghost',
		'border-borderGray min-w-20 font-semibold text-left flex items-center hover:!cursor-pointer rounded-3xl bg-transparent':
			true,
		[className]: Boolean(classNames),
	});

	return (
		<button
			type='button'
			className={rootClassName}
			style={{ height, width }}
			{...otherProps}
		>
			<span className='flex items-center'>
				<span>{label}</span>
				<span
					className='ml-5 text-gray2'
					onClick={(e) => {
						e.stopPropagation();
						const filteredArray = selected.filter(
							(selectedItem: string) => selectedItem !== item
						);

						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						setSelected(filteredArray);
					}}
				>
					<RxCross2 />
				</span>
			</span>
		</button>
	);
};

export default RoundedShape;
