import { useEffect } from 'react';
import { type balanceInput } from './interfaces';

export default function BalanceInput({
	Balance,
	BalanceValue,
	setBalance,
}: balanceInput) {
	function handleChange(e: Event) {
		const target = e.target as HTMLButtonElement;
		setBalance(target.value);
	}
	useEffect(() => {
		setBalance(Balance);
	}, [Balance]);
	return (
		<div className='flex rounded-full bg-slate-100 mt-1'>
			<input
				type='text'
				id='website-admin'
				className=' bg-slate-100 rounded-r-lg border text-gray-900  block flex-1 min-w-0 w-full text-sm  p-2.5 border border-0'
				value={BalanceValue}
				onChange={() => {
					void handleChange;
				}}
			/>
			<span className='inline-flex items-center px-3 text-sm text-darkGreen  border border-0 border-gray-300 rounded-r-md'>
				SAR
			</span>
		</div>
	);
}
