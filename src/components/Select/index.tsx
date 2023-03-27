import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { SlArrowDown } from 'react-icons/sl';
import { TiTick } from 'react-icons/ti';

import { type Props } from './types';
import classNames from 'classnames';

const Select: React.FC<React.PropsWithChildren<Props>> = ({
	onChange,
	options,
	selected,
	className = '',
}): JSX.Element => {
	return (
		<Listbox value={selected} onChange={onChange}>
			<div className='relative mt-2.5'>
				<Listbox.Button
					className={classNames({
						'relative w-full flex items-center justify-between cursor-default rounded-3xl bg-inputBg py-2 px-5  text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg':
							true,
						[className]: Boolean(className),
					})}
				>
					<span className='block truncate text-lg'>
						{options.find((item) => item.value === selected)?.label}
					</span>

					<span className='pointer-events-none'>
						<SlArrowDown
							className='h-3 w-3 text-gray font-semibold'
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
					<Listbox.Options className='absolute mt-1 max-h-60 z-[9999] w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg'>
						{options.map((option, personIdx) => (
							<Listbox.Option
								key={personIdx}
								className={({ active }) =>
									`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
										active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
									}`
								}
								value={option.value}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate text-lg ${
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

export default Select;
