import { Switch } from '@headlessui/react';
import React from 'react';
import classNames from 'classnames';

import { type Props } from './types';

const CustomSwitch: React.FC<Props> = ({
	name,
	checked = false,
	onChange,
	type = 'Success',
	className,
	size,
}) => {
	return (
		<Switch
			className='p-0 border-none rounded-full focus:outline-0'
			name={name}
			checked={checked}
			onChange={onChange}
		>
			<span
				className={classNames({
					' rounded-full shadow flex border-none': true,
					'h-[13.5px] p-[2px] w-[27px]': size === 'small',
					'h-[25px] w-[50px] p-[3px]': !size,

					'bg-[#E3FBF0]': checked && type === 'Success',
					'bg-primary': checked && type === 'Danger',
					'bg-[#ABA5A2]': !checked,
					className: Boolean(className),
				})}
			>
				<span
					className={classNames({
						'block  rounded-full border-none transition duration-300 ease-in-out transform':
							true,
						'h-[9.5px]  w-[9.5px]': size === 'small',
						'h-[19px]  w-[19px]': !size,
						'translate-x-[125%]': checked && !size,
						'translate-x-[140%]': checked && size === 'small',
						'bg-checkBoxChecked ': type === 'Success' && checked,
						'bg-checkBoxUnchecked ': type === 'Danger' && checked,
						'bg-checkBoxUnchecked': !checked,
					})}
				></span>
			</span>
		</Switch>
	);
};

export default CustomSwitch;
