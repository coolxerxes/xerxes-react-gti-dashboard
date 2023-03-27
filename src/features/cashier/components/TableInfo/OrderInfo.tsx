import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import moment from 'moment';
import { useEffect } from 'react';
import { type FC, memo } from 'react';
import { Summary } from '../../api/types';
import OrderItem from './OrderItem';

interface Props {
	item: any;
	handlerCheckOrder: (id: string) => void;
	checkedOrder: string | any;
	isOpen: boolean;
	cashierDashboard: Summary;
	setRefundData: (arg: any) => void;
}

const OrderInfo = memo(
	({ item, handlerCheckOrder, checkedOrder, isOpen, setRefundData }: Props) => {
		const {
			orderNumber,
			items,
			orderReadyTime,
			updatedAt,
			paymentStatus,
			summary,
			_id,
		} = item;

		const formatTime = (timeString: string) => {
			const [hourString, minute] = timeString.split(':');
			const hour = +hourString % 24;

			return `${hour % 12 || 12}:${minute}${hour < 12 ? ' AM' : ' PM'}`;
		};

		useEffect(() => {
			if (checkedOrder === _id) {
				setRefundData(items);
			}
		}, [isOpen]);

		const onChangeCheckBox = () => {
			handlerCheckOrder(_id);
		};

		return (
			<div className='border-[1px] rounded-[10px] border-solid border-[#E7E8E8] p-2 flex mb-[10px] mt-[10px]'>
				<div className='flex items-center w-[20%]'>
					<div className='mr-0'>
						<CheckBox
							onChange={onChangeCheckBox}
							checked={checkedOrder === _id}
							variant='gray'
							className='checked:bg-[#C02328] mr-0'
						/>
					</div>
					<div className='flex flex-col align-center justify-center'>
						<div className='font-dinBold mb-1'>Order #{orderNumber}</div>
						<div className='text-xs mb-2 text-[#ABA5A2] text-center'>
							{' '}
							{formatTime(
								moment(orderReadyTime ?? updatedAt).format('HH:mm:ss')
							)}{' '}
						</div>

						<div className='flex justify-center'>
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
				</div>
				<div className={`w-[100%]`}>
					<div className='col-span-10 flex items-center w-[100%]'>
						<div className={`w-[100%]`}>
							{items.map((iItem: any) => {
								return (
									<OrderItem
										key={iItem._id}
										orderItem={iItem}
										summary={summary}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

OrderInfo.displayName = 'OrderInfo';

export default OrderInfo;
