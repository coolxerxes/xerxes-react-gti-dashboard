// TODO: remove it when configuration updated
import React from 'react';
import classNames from 'classnames';
import { type Props } from './types';
import { useTranslation } from 'react-i18next';
import { BiShowAlt } from 'react-icons/bi';
const Input: React.FC<React.PropsWithChildren<Props>> = (props) => {
	const { t, i18n } = useTranslation();
	const {
		className = '',
		prefix,
		suffix,
		containerClassNames,
		name,
		register,
		type = 'text',
		label,
		required = false,
		disabled = false,
		min,
		max,

		...otherProps
	} = props;
	return (
		<>
			<p
				className={classNames({
					'mb-2.5 text-start text-labelBlack': true,
					'text-end': i18n.resolvedLanguage === 'ar',
				})}
			>
				{label}
			</p>
			<div
				className={classNames({
					containerClassNames: Boolean(containerClassNames),
					'min-h-[50px] bg-inputBg flex items-center pl-5 rounded-3xl  pr-5':
						true,
				})}
			>
				{prefix}
				<input
					min={min}
					max={max}
					type={type}
					// step={type === 'number' ? 'any' : ''}
					className={classNames({
						[className]: Boolean(className),
						'bh-full w-full  bg-inputBg rounded-3xl px-2 focus-visible:outline-none ':
							true,
						'text-end': i18n.resolvedLanguage === 'ar',
					})}
					disabled={disabled}
					{...register(name, { required })}
					{...otherProps}
				/>

				{suffix}
			</div>
		</>
	);
};

export default Input;
