import classNames from 'classnames';
import { type Order } from 'features/cashier/api/types';
import moment from 'moment';
import React, { type FC, memo } from 'react';

interface Props {
	order: Order;
	onSelectOrder: (selectedTableId: string | undefined) => void;
	isActive: boolean;
}

// eslint-disable-next-line react/display-name
const OrderBill: FC<Props> = memo(({ order, onSelectOrder, isActive }) => {
	const { _id, orderNumber, createdAt, paymentStatus } = order;

	return (
		<div
			className={classNames({
				'border-lightGray border-solid border-2 rounded-lg min-h-20 p-2 mb-2 cursor-pointer':
					true,
				'border-primary': isActive,
			})}
			onClick={() => {
				onSelectOrder(_id);
			}}
		>
			<div className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<span className='font-dinBold text-lg'>
						Order {parseInt(orderNumber)}
					</span>
					<span
						className={classNames({
							'bg-primary w-2 h-2 rounded-full block': true,
							'bg-green': paymentStatus === 'Paid',
						})}
					/>
					<span>{paymentStatus}</span>
				</div>

				<span className='font-dinBold text-lg'></span>
			</div>
			<div className='flex justify-between'>
				<span className='text-secondary text-lg'></span>
				<span className='text-secondary text-lg'>
					{moment(createdAt).format('ll')}
				</span>
			</div>
		</div>
	);
});

export default OrderBill;
