import classNames from 'classnames';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import moment from 'moment';
import { type FC, memo } from 'react';
import { type Order as OrderFromServer } from '../api/types';
import OrderItem from './TableInfo/OrderItem';
// import OrderItem from '';

interface Props {
	order: OrderFromServer;
}

const Order: FC<Props> = memo(({ order }) => {
	const {
		orderNumber,
		items,
		orderReadyTime,
		updatedAt,
		paymentStatus,
		summary,
	} = order;
	if (order.items.length === 0) {
		return null;
	}

	const formatTime = (timeString: string) => {
		const [hourString, minute] = timeString.split(':');
		const hour = +hourString % 24;

		return `${hour % 12 || 12}:${minute}${hour < 12 ? ' AM' : ' PM'}`;
	};

	return (
		<div className='grid grid-cols-12 mt-[10px] border-[#E2E2E2] border-[1px] rounded-lg px-2'>
			<div className='col-span-2 flex flex-row items-center'>
				<CheckBox
					onChange={() => {}}
					checked={true}
					variant='gray'
					className='checked:bg-[#C02328]'
				/>
				<div className='flex flex-col text-left justify-between my-2'>
					<span className='font-dinBold mb-1'>Order #{orderNumber}</span>

					<span className='text-xs mb-2 text-[#ABA5A2]'>
						{formatTime(moment(orderReadyTime ?? updatedAt).format('HH:mm:ss'))}
					</span>

					{paymentStatus === 'Paid' && (
						<Button
							height={24}
							width={20}
							className='text-xs text-white'
							variant='primary'
						>
							Pay One
						</Button>
					)}
				</div>
			</div>

			<div className='col-span-10'>
				<div
					className={classNames('border-[#F5F5F5] py-[11px]', {
						'border-b-2': true,
					})}
				>
					{items.map((item) => {
						return (
							<OrderItem key={item._id} orderItem={item} summary={summary} />
						);
					})}
				</div>
			</div>
		</div>
	);
});

Order.displayName = 'Order';

export default Order;
