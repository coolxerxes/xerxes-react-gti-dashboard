import Banner from 'components/Banner';
import Button from 'components/Button';
import Ticket from 'components/Ticket';
import { useGetOrders } from 'features/kitchen/api/getOrders';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import { CallWaiterModal } from './CallWaiterModal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setOrders } from 'redux/ordersReducer';
import { useTranslation } from 'react-i18next';

const Kitchen: React.FC = () => {
	const { t, i18n } = useTranslation();

	const [callWaiterModalOpen, setCallWaiterModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState<string>('');
	const { data: orders, refetch } = useGetOrders({});

	const toggleCallWatiterModal = () => {
		setCallWaiterModalOpen(!callWaiterModalOpen);
	};

	const changeActiveOrder = (id: string): void => {
		setActiveOrder(id);
	};

	const dispatch = useAppDispatch();
	const ordersState = useAppSelector((state) => state.data.orders.order);

	const isFullyVersion = false;

	const orderTypes = useMemo(() => {
		let priorityOrder = 0;
		let activeOrder = 0;
		let newOrder = 0;

		ordersState.forEach((order: any) => {
			const startDate = new Date(order?.preparationDetails?.actualStartTime);
			const endDate = new Date();

			const diffInSeconds = Math.floor(
				(endDate.getTime() - startDate.getTime()) / 1000
			);

			const min = Math.floor(diffInSeconds / 60);

			if (order.status !== 'Started Preparing') {
				newOrder += 1;
			} else if (order.status === 'Started Preparing') {
				activeOrder += 1;
			}
			if (
				order.status === 'Started Preparing' &&
				+min > +order?.preparationDetails?.preparationTime + 2
			) {
				priorityOrder += 1;
			}
		});
		return {
			priorityOrder,
			activeOrder,
			newOrder,
		};
	}, [ordersState]);

	useEffect(() => {
		if (orders?.data.docs) {
			dispatch(setOrders(orders?.data.docs));
		}
	}, [orders]);

	const reversedArray = [...ordersState].reverse();

	return (
		<div>
			<Tab.Group>
				<div className='w-full h-[60px] flex items-center rounded-lg sticky top-[11%] z-[5] my-5'>
					<Banner className=''>
						<div className='flex ml-auto'>
							<div className='flex gap-[20px] mr-[10px]'>
								<div className='text-[#C02328] h-[46px] w-[147px] bg-[#FCF4F4] rounded-lg flex items-center justify-center space-x-4'>
									<span className='text-[32px] font-dinBold mb-[5px]'>
										{orderTypes.priorityOrder}
									</span>

									<div className='border-r-2 border-[#D9D9D9] h-[35px] w-[0]'></div>

									<span
										className={classNames({
											'font-bold text-[16px] font-dinBold mr-[10] text-left flex flex-col':
												true,
											'text-end flex-col-reverse':
												i18n.resolvedLanguage === 'ar',
										})}
									>
										<span>{t('kitchen.priority')}</span>
										<span>{t('kitchen.order')}</span>
									</span>
								</div>

								<div className='text-[#389E0D] h-[46px] w-[147px] bg-[#FCF4F4] rounded-lg flex items-center justify-center space-x-4'>
									<span className='text-[32px] font-dinBold mb-[5px]'>
										{orderTypes.activeOrder}
									</span>

									<div className='border-r-2 border-[#D9D9D9] h-[35px] w-[0]'></div>

									<span
										className={classNames({
											'font-bold text-[16px] font-dinBold mr-[10] text-left flex flex-col':
												true,
											'text-end flex-col-reverse':
												i18n.resolvedLanguage === 'ar',
										})}
									>
										<span>{t('kitchen.active')}</span>
										<span>{t('kitchen.order')}</span>
									</span>
								</div>

								<div className='text-[#08979C] h-[46px] w-[147px] bg-[#FCF4F4] rounded-lg flex items-center justify-center space-x-4'>
									<span className='text-[32px] font-dinBold mb-[5px]'>
										{orderTypes.newOrder}
									</span>

									<div className='border-r-2 border-[#D9D9D9] h-[35px] w-[0]'></div>

									<span
										className={classNames({
											'font-bold text-[16px] font-dinBold mr-[10] text-left flex flex-col':
												true,
											'text-end flex-col-reverse':
												i18n.resolvedLanguage === 'ar',
										})}
									>
										<span>{t('kitchen.new')}</span>
										<span>{t('kitchen.order')}</span>
									</span>
								</div>
							</div>

							<div className='flex items-center mr-[15px] text-[15px] font-normal'>
								<Button
									disable={!activeOrder}
									onClick={toggleCallWatiterModal}
									className='p-5'
								>
									{t('kitchen.callthewaiter')}
								</Button>
							</div>
						</div>
					</Banner>
				</div>

				<div className='grid grid-cols-1 overflow-x-scroll'>
					<div
						className={`flex gap-[20px] pl-2 ${
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							isFullyVersion && 'flex-wrap justify-between gap-[10px]'
						}`}
					>
						{(reversedArray ?? []).map((order: any) => (
							<Ticket
								changeActiveOrder={changeActiveOrder}
								activeOrder={activeOrder}
								refetch={refetch}
								order={order}
								key={order.id}
								isFullyVersion={isFullyVersion}
							/>
						))}
					</div>

					<CallWaiterModal
						isOpen={callWaiterModalOpen}
						activeOrder={activeOrder}
						setIsModalOpen={toggleCallWatiterModal}
					/>
				</div>
			</Tab.Group>
		</div>
	);
};

export default Kitchen;
