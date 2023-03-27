import { type Props } from './types';

const Radio: React.FC<React.PropsWithChildren<Props>> = ({
	checked,
	id,
	name,
	label,
	onChange,
}) => {
	return (
		<div className='flex items-center'>
			<input
				type='radio'
				id={id}
				name={name}
				value=''
				checked={checked}
				onClick={() => {
					onChange(!checked);
				}}
				className='h-4 w-4 !text-primary border-primary !focus:ring-primary !bg-primary'
			/>
			<label htmlFor={id} className='ml-2 block text-base text-black'>
				{label}
			</label>
		</div>
	);
};

export default Radio;
