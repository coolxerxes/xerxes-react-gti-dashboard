import SimpleTag from 'components/Tag/SimpleTag';
import { type FC, memo } from 'react';
import type { Item, Summary } from 'types/order';
import type { Addition } from '../../api/types';

interface Props {
	orderItem: Item | any;
	summary: Summary;
}

const OrderItem = memo(({ orderItem, summary }: Props) => {
	const { menuItem, quantity, additions } = orderItem;

	return (
		<div className='flex py-4 border-b-2 border-b-[#F5F5F5] w-[100%]'>
			<div className='flex w-[35%]'>
				<div className='flex gap-[12px] items-center'>
					<img
						src={
							menuItem.image ??
							'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
						}
						className='rounded-full h-[30px] w-[30px]'
					/>

					<span className='capitalize'>{menuItem.name}</span>

					<SimpleTag
						// label={'waiterCode' ?? 'BK'}
						label={'BK'}
						variant='primary'
						className='flex justify-center items-center text-white font-dinBold'
						height={20}
						width={28}
					/>

					<span>x{quantity}</span>
				</div>
			</div>

			<div className='w-[30%]'>
				<div className='flex flex-wrap gap-1'>
					{additions.map((addition: Addition) => (
						<div
							key={addition.menuAdditionId}
							className='mb-1 flex justify-start'
						>
							<span className='bg-[#F5F5F5] w-max px-2 pb-1 border-[1px] rounded-md border-[#D9D9D9]'>
								{addition.name}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className='col-span-2 flex justify-center items-center w-[20%]'>
				<SimpleTag
					// label={`paymentStatus`}
					label={summary.totalPaid ? 'Paid' : 'Not Paid'}
					variant={summary.totalPaid ? 'success' : 'danger'}
					width={50}
					height={19}
					className='flex justify-center whitespace-nowrap !text-[10px]'
				/>
			</div>

			<div className='col-span-1 flex items-center justify-end w-[20%]'>
				<div className='text-end text-[14px] font-semibold'>
					+{summary.totalWithTax}
				</div>
			</div>
		</div>
	);
});

OrderItem.displayName = 'OrderItem';

export default OrderItem;
