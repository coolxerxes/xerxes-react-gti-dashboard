import { type Props } from './types';
import classNames from 'classnames';

const CheckBox: React.FC<React.PropsWithChildren<Props>> = ({
	checked,
	name,
	label,
	onChange,
	className = '',
	variant = 'default',
}) => {
	return (
		<div
			className={classNames({
				'flex items-center mr-2 gap-2 cursor-pointer': true,
				[className]: Boolean(className),
			})}
		>
			<input
				name={name}
				checked={checked}
				onChange={onChange}
				id='red-checkbox'
				type='checkbox'
				// className={classNames({
				// 	'w-4 h-4 !border-[red] !text-[red] !bg-[red] rounded focus:outline-none cursor-pointer font-medium':
				// 		variant === 'default',
				// 	'appearance-none border-[#DBDBDB] rounded border-[3px] w-[17px] h-[17px] cursor-pointer':
				// 		variant === 'gray',
				// })}
			/>
			<label
				htmlFor='red-checkbox'
				className=' font-medium text-gray-900 dark:text-gray-300'
			>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
