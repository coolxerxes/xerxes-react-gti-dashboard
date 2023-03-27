import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SlArrowDown } from 'react-icons/sl';
import { TiTick } from 'react-icons/ti';
import classNames from 'classnames';

import { type Props } from './types';
import SelectedItem from './SelectedItem';
import { useLocation } from 'react-router-dom';

const MultiSelect: React.FC<React.PropsWithChildren<Props>> = ({
	onChange,
	options,
	selected,
	className = '',
	variant,
	setSelected,
}): JSX.Element => {
	const { pathname } = useLocation();

	const isTables = pathname.includes('tables');

	return (
		<Listbox value={selected} onChange={onChange} multiple>
			<div className='relative'>
				<Listbox.Button
					className={classNames({
						'relative w-full flex items-center cursor-default rounded-3xl min-h-[50px] bg-inputBg px-5 text-left focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 !sm:text-base':
							true,
						[className]: Boolean(className),
					})}
				>
					<span className='truncate flex gap-3 items-center !text-base flex-wrap whitespace-normal	'>
						{selected?.map((item, index) => (
							<SelectedItem
								variant={variant}
								key={index}
								setSelected={setSelected}
								selected={selected}
								item={item}
								label={options?.find((oItem) => oItem.value === item)?.label}
							/>
						))}
					</span>
					<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 !text-base'>
						<SlArrowDown
							className='h-3 w-3 text-gray mr-4 font-semibold'
							aria-hidden='true'
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Listbox.Options
						className={`${
							isTables ? 'relative' : 'absolute'
						} z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 !text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
					>
						{options?.map((option, personIdx) => (
							<Listbox.Option
								key={personIdx}
								className={({ active }) =>
									`relative cursor-default select-none py-2 pl-10 pr-4 ${
										active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
									}`
								}
								value={option.value}
							>
								{({ selected }) => (
									<>
										<span
											className={`block  truncate  ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{option.label}
										</span>
										{selected ? (
											<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
												<TiTick className='h-5 w-5' aria-hidden='true' />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

export default MultiSelect;
