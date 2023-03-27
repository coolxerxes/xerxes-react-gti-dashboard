import classNames from 'classnames';
import { type Props } from './types';
import { useTranslation } from 'react-i18next';

const Input: React.FC<React.PropsWithChildren<Props>> = (props) => {
	const {
		className = '',
		prefix,
		suffix,
		containerClassNames,
		name,
		register,
		label,
		required = false,
		disabled,
		rows = 4,
		resize = 'resize-none',
		...otherProps
	} = props;
	const { i18n } = useTranslation();

	return (
		<>
			<p
				className={classNames({
					'mb-2 text-start': true,
					'text-end': i18n.resolvedLanguage === 'ar',
				})}
			>
				{label}
			</p>
			<div
				className={classNames({
					containerClassNames: Boolean(containerClassNames),
					'min-h-[53px] bg-inputBg flex items-center pl-5 rounded-[27px] pr-5':
						true,
					'text-end': i18n.resolvedLanguage === 'ar',
				})}
			>
				{prefix}
				<textarea
					rows={rows}
					className={classNames({
						[className]: Boolean(className),
						'bh-full w-full  bg-inputBg rounded-[27px] pl-2 pt-2 focus-visible:outline-none':
							true,
						'text-end': i18n.resolvedLanguage === 'ar',
						[resize]: Boolean(resize),
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
