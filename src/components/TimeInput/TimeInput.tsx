import classNames from 'classnames';
import { type Props } from './types';

const Input: React.FC<React.PropsWithChildren<Props>> = (props) => {
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
		...otherProps
	} = props;

	return (
		<>
			<p className='mb-2 text-start'>{label}</p>
			<div
				className={classNames({
					containerClassNames: Boolean(containerClassNames),
					'min-h-[53px] bg-inputBg flex items-center pl-5 rounded-[27px] pr-5':
						true,
				})}
			>
				<input
					type={type}
					className={classNames({
						[className]: Boolean(className),
						'bh-full w-full  bg-inputBg rounded-[27px] pl-2 focus-visible:outline-none':
							true,
					})}
					{...register(name, { required })}
					{...otherProps}
				/>
			</div>
		</>
	);
};

export default Input;
