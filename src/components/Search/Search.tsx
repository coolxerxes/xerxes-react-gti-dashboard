// TODO: remove it when configuration updated
import React from 'react';
import classNames from 'classnames';
import { CiSearch } from 'react-icons/ci';

import { type Props } from './types';

const Search: React.FC<React.PropsWithChildren<Props>> = (props) => {
	const { className = '', ...otherProps } = props;

	return (
		<div
			className={classNames({
				'min-h-[32px] bg-inputBg flex items-center pl-5 rounded-[27px]': true,
			})}
		>
			<CiSearch fontSize={20} className='text-gray font-bold' />
			<input
				className={classNames({
					[className]: Boolean(className),
					'h-full w-full  bg-inputBg rounded-[27px] pl-2 focus-visible:outline-none':
						true,
				})}
				{...otherProps}
			/>
		</div>
	);
};

export default Search;
