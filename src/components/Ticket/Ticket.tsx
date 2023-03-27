import { useEffect, useMemo, useState } from 'react';
import Button from 'components/Button';
import moment from 'moment';
import type { Item, OrderObject } from 'types/order';
import TicketItem from './TicketItem';
import { useStartOrder } from 'features/kitchen/api/startOrder';
import Stopwatch from 'components/Timer/Stopwatch';
import { useTranslation } from 'react-i18next';

interface Props {
	order: OrderObject;
	refetch: () => void;
	activeOrder: string | null;
	changeActiveOrder: (id: string) => void;
	isFullyVersion?: boolean;
}

const Ticket: React.FC<Props> = ({
	order,
	refetch,
	activeOrder,
	changeActiveOrder,
	isFullyVersion,
}) => {
	const { t, i18n } = useTranslation();
	const [startTimer, setStartTimer] = useState(false);
	const [time, setTime] = useState(0);

	const onChangeOrderId = (): void => {
		changeActiveOrder(order.id);
	};

	const isPreparingStatus = useMemo(
		() => order.status !== 'Started Preparing',
		[order]
	);

	const startOrder = useStartOrder({ refetch });

	useEffect(() => {
		if (order.status === 'Started Preparing') {
			const startDate = new Date(order.preparationDetails.actualStartTime);
			const endDate = new Date();

			const diffInSeconds = Math.floor(
				(endDate.getTime() - startDate.getTime()) / 1000
			);

			if (diffInSeconds > 0) {
				setTime(diffInSeconds);
			}
			setStartTimer(true);
		}
		if (order.status !== 'Started Preparing') {
			setTime(0);
		}
	}, []);

	useEffect(() => {
		if (startTimer) {
			const interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, [startTimer]);

	const onStartOrder = async (): Promise<void> => {
		if (isPreparingStatus) {
			setStartTimer(true);
		}

		const preparationStatus = isPreparingStatus
			? 'Started Preparing'
			: 'Done Preparing';

		await startOrder.mutateAsync({
			orderId: order.id,
			preparationStatus: preparationStatus,
		});
	};

	const {
		orderType,
		orderNumber,
		createdAt,
		items,
		preparationDetails: { preparationTime },
	} = order;

	const colorValue = useMemo(() => {
		if (orderType === 'Dine In') {
			return 'text-[#096DD9] border-[#91D5FF] bg-[#E6F7FF]';
		}
		if (orderType === 'Delivery') {
			return 'text-[#389e0d] border-[#B7EB8F] bg-[#F6FFED]';
		}
		if (orderType === 'Pickup') {
			return 'text-[#D46B08] border-[#D46B08] bg-[#FFF7E6]';
		}

		return '#FFF';
	}, [order, orderType]);

	return (
		<div className='w-[300px] min-h-[530px] relative'>
			<div className='absolute top-[95px] h-[30px] w-[100%] overflow-hidden'>
				<div className='absolute bg-[#F4F4F4] w-[20px] h-[20px] left-[-8px] top-[6px] rounded-[50%] bg-[#F6F6F6]'></div>
				<div className='absolute bg-[#F4F4F4] w-[20px] h-[20px] right-[-8px] top-[6px] rounded-[50%] bg-[#F6F6F6]'></div>
			</div>

			<div className='p-[16px] font-[500] bg-white rounded-t-3xl w-[300px]'>
				<div className='flex justify-between'>
					<Stopwatch preparationTime={preparationTime} time={time} />

					<label className='inline-flex items-center'>
						<input
							checked={activeOrder === order.id}
							onChange={onChangeOrderId}
							type='checkbox'
							className='w-[24px] h-[24px] peer relative appearance-none rounded-full border-2 border-[#DBDBDB] checked:bg-[#C02328]'
						/>
					</label>
					<span
						className={`h-[34px] w-[80px] border rounded-full flex justify-center pt-[3px] ${colorValue}`}
					>
						{orderType}
					</span>
				</div>
				<div className='bg-gradient-to-r from-[#70DC72] via-[#DFF23B] to-[#C02328] w-[50%] h-[2px] mt-2'></div>

				<div className='flex justify-between mt-2 pb-5 border-b-2 border-dashed border-[#E2E2E2]'>
					<div className='font-[700]'>
						{t('kitchen.order')} {parseInt(orderNumber)}
					</div>
					<div className='text-[#ABA5A2]'>{moment(createdAt).format('LT')}</div>
				</div>
			</div>

			<div className='bg-white h-[333px] overflow-auto'>
				{(items || []).map((item: Item) => (
					<TicketItem
						key={item._id}
						item={item}
						oderId={order.id}
						isFullyVersion={isFullyVersion}
					/>
				))}
			</div>

			<div className='w-full bg-white rounded-b-3xl'>
				<div className='w-full flex p-4 border-[#E2E2E2] border-t-2 '>
					<Button
						onClick={onStartOrder}
						variant={
							order.status !== 'Started Preparing' ? 'prepare' : 'complete'
						}
					>
						{isPreparingStatus
							? `${t('kitchen.startprepare')}`
							: `${t('kitchen.ordercompleted')}`}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Ticket;
