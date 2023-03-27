import React from 'react';
import classNames from 'classnames';

import { type ImageProps } from './types';

const CategoryCard: React.FC<React.PropsWithChildren<ImageProps>> = (props) => {
	const { image, name, price, className = '' } = props;
	return (
		<div
			style={{ boxShadow: '0px 0px 3px #0000000D' }}
			className={classNames({
				'pt-4 p-3 relative rounded-lg justify-between !border-inputBg border-2 min-w-40 min-h-40':
					true,
				[className]: !!className,
			})}
		>
			<div className='flex justify-center mx-auto rounded-[50%]'>
				<img
					src={
						image ??
						'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
					}
					alt='credit card icon '
					className='w-[59px] h-[59px] rounded-[50%]'
				/>
			</div>
			<div
				className={`text-center  font-bold m-2 ${
					price ? 'text-base text-black1' : 'text-xs text-[#6D6A75]'
				}`}
			>
				{name}
			</div>
			{price && (
				<div className='text-center text-base text-primary font-bold m-2'>
					{price} SAR
				</div>
			)}
		</div>
	);
};
export default CategoryCard;
