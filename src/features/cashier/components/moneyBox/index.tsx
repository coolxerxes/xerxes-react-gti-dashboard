import Banner from 'components/Banner';
import Button from 'components/Button';
import SimpleTag from 'components/Tag/SimpleTag';
import { useGetCurrentLog } from '../api/useGetCurrentLog';

export default function MoneyBox() {
	const { response } = useGetCurrentLog('63e8a3b935e6cd28d8932c50');
	const Balance = response?.openingBalance ? response?.openingBalance : '';
	return (
		<div className='w-full -z-10 h-[50px] flex items-center rounded-lg mt-5'>
			<Banner>
				<span className='font-dinBold text-lg space-[-0.38px] ml-3'>
					Cashier Box 1
				</span>
				<div className='mr-3 flex justify-center items-center gap-2 tracking-tighter'>
					<SimpleTag
						label={`Starting Money: ${Balance} SAR`}
						variant='dashed'
						className='border-secondary text-black bg-grey'
					/>
					<SimpleTag
						label={`Total Refunds: ${Balance} SAR`}
						variant='dashed'
						className='border-lightBlue text-lightBlue bg-blueBg'
					/>
					<SimpleTag
						label={`Total Sales: ${Balance} SAR`}
						variant='dashed'
						className='border-lightCyan text-lightCyan bg-cyanBg'
					/>
					<SimpleTag
						label={`Today Total in Cash: ${Balance} SAR`}
						variant='dashed'
						className='border-darkGreen text-darkGreen bg-greenBg'
					/>
					<SimpleTag
						label={`Total in Bank: ${Balance} SAR`}
						variant='dashed'
						className='border-darkOrange text-darkOrange bg-orangeBg'
					/>
					<Button>Close Cashier</Button>
				</div>
			</Banner>
		</div>
	);
}
