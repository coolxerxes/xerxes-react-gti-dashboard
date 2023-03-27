import classNames from 'classnames';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';

import { type Props } from './types';

const Tag: React.FC<React.PropsWithChildren<Props>> = (props) => {
	const {
		children,
		variant,
		height = 35,
		width,
		label,
		isShowSuffix = true,
		className = '',
		selected,
		...otherProps
	} = props;

	const rootClassName = classNames({
		'!bg-backgroundLightRed text-primary border-primary font-semibold':
			variant === 'primary',
		'!bg-[#f6fbed] text-[#409e0e] !border-[#cdf1b1] font-semibold':
			variant === 'success',
		'!bg-white': selected,
		'!bg-inputBg border-borderGray font-semibold': variant === 'ghost',
		'border-borderGray min-w-[90px] font-semibold text-left flex items-center px-4 hover:!cursor-pointer rounded-[25px] bg-transparent':
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
				{isShowSuffix ? (
					<>
						{selected ? (
							<span className='ml-5 text-base text-white bg-primary rounded-[50%]'>
								<TiTick />
							</span>
						) : (
							<span className='ml-5 text-gray2'>
								<RxCross2 />
							</span>
						)}
					</>
				) : null}
			</span>
		</button>
	);
};
export default Tag;
