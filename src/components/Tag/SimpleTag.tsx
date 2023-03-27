import classNames from 'classnames';
import React from 'react';

import { type SimpleTagProps } from './types';

const NormalTag: React.FC<React.PropsWithChildren<SimpleTagProps>> = (
	props
) => {
	const {
		children,
		variant,
		height,
		width,
		label,
		className = '',
		...otherProps
	} = props;

	const rootClassName = classNames({
		'!border-dashed border-2 font-medium text-[15px]': variant === 'dashed',
		'text-xs bg-primary font-dinBold p-2': variant === 'primary',
		'text-xs bg-grey border-lightGray border-2 border-solid text-black !p-1':
			variant === 'ghost',
		'text-xs bg-[#389E0D0D] border-[#389E0D] border-[1px] text-[10px] border-solid text-[#389E0D]':
			variant === 'success',
		'text-xs bg-[#F6DEDF] border-primary border-[1px] text-[10px] border-solid text-primary':
			variant === 'danger',
		'min-w-[20px] text-sm flex items-center  rounded-md cursor-pointer': true,
		[className]: Boolean(classNames),
	});
	return (
		<div className={rootClassName} style={{ height, width }} {...otherProps}>
			{children}
			<span className='flex items-center mx-auto '>{label}</span>
		</div>
	);
};
export default NormalTag;
