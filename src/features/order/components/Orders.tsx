import Spinner from 'components/Spinner';
import { useGetInfinteOrders, useGetOrders } from '../api/getOrders';
import Button from 'components/Button';
import Banner from 'components/Banner';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { resetItems, setCart, setOrderType } from '../slices/CartSlice';
import TableDetailRow from 'features/tables/components/TableDetailRow';
import CheckBox from 'components/CheckBox';
import OrderDetailRow from './OrderDetailRow';
import TakeOrderPaymentModal from 'features/tables/components/TakeOrderPaymentModal';
import OrderTypeModal from 'features/tables/components/OrderTypeModal';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';

const Orders = () => {
	// const { data, isLoading, refetch } = useGetOrders({
	// 	params: { pagination: false },
	// });

	const { orders, isLoading, refetch, fetchMore, hasNextPage } =
		useGetInfinteOrders({
			// params: { pagination: false },
		});

	// const [checkedOrder, setCheckedOrder] = useState<null | any>(null);
	const [checkedOrders, setCheckedOrders] = useState<any[]>([]);
	console.log(
		'🚀 ~ file: Orders.tsx:31 ~ Orders ~ checkedOrders:',
		checkedOrders
	);
	const [paymentSelectModal, setPaymentSelectModal] = useState<boolean>(false);
	const [moveOrderModal, setMoveOrderModal] = useState<boolean>(false);
	// const [isAllChecked, setIsAllChecked] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	// const orders = data?.data?.docs;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const togglePaymentSelectModal = useCallback(() => {
		// if (checkedOrder?.paymentStatus === 'Paid') {
		// 	toast.error('Order is already paid');
		// } else if (checkedOrder?.status === 'Cancelled') {
		// 	toast.error('Order is already cancelled');
		// } else {
		// 	setPaymentSelectModal(!paymentSelectModal);
		// }
		if (checkedOrders.length === 0) {
			toast.error('Please select order');
		} else if (
			!checkedOrders.some(
				(order) =>
					order?.paymentStatus !== 'Paid' && order?.status !== 'Cancelled'
			)
		) {
			toast.error('Order is already paid or cancelled');
			// if (checkedOrders.find((order) => order?.paymentStatus === 'Paid')) {
			// 	toast.error('Order is already paid');
			// } else if (checkedOrders.find((order) => order?.status === 'Cancelled')) {
			// 	toast.error('Order is already cancelled');
			// }
		} else {
			setPaymentSelectModal(!paymentSelectModal);
		}
	}, [paymentSelectModal, setPaymentSelectModal, checkedOrders]);

	const toggleMoveOrderModal = useCallback(() => {
		setMoveOrderModal(!moveOrderModal);
	}, [moveOrderModal, setMoveOrderModal]);

	// useEffect(() => {
	// 	if (isAllChecked) {
	// 		setCheckedOrder(null);
	// 	}
	// }, [isAllChecked]);

	if (isLoading) {
		return <Spinner />;
	}

	const sortedArray = orders.sort(
		(a: any, b: any) => parseInt(b.orderNumber) - parseInt(a.orderNumber)
	);

	const handleNewOrder = () => {
		dispatch(setCart(null));
		dispatch(resetItems([]));
		dispatch(setOrderType(''));
		setIsModalOpen(true);
	};

	return (
		<div>
			<div className=' bg-[#F6F6F6] sticky top-[8%] z-[100] h-[30px] rounded-lg'></div>
			<div
				className={classNames({
					'w-full bg-white h-[60px] flex items-center rounded-lg justify-between mb-5 sticky top-[11%] z-[100] ':
						true,
				})}
			>
				<Banner
					className={`${
						i18n.resolvedLanguage === 'ar'
							? 'flex-row-reverse px-3'
							: 'flex-row '
					}`}
				>
					<div className='flex items-center gap-2.5'>
						<span className='font-dinBold text-2xl ml-3 space-[-0.38px] xl:text-[25px]'>
							{t('order.allOrders')}
						</span>
					</div>
					<div className='mr-3 flex justify-center items-center gap-2.5'>
						{orders?.length > 0 && (
							<Button className='text-base' onClick={togglePaymentSelectModal}>
								{t('order.paymentForSelected')}
							</Button>
						)}

						<Button className='text-base' onClick={handleNewOrder}>
							{t('order.makeNewOrder')}
						</Button>
					</div>
				</Banner>
			</div>
			<div className=''>
				<InfiniteScroll
					dataLength={orders.length} // This is important field to render the next data
					next={fetchMore}
					hasMore={hasNextPage}
					loader={<Spinner />}
					refreshFunction={refetch}
					pullDownToRefresh
					pullDownToRefreshThreshold={50}
					pullDownToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>
							&#8595; Pull down to refresh
						</h3>
					}
					releaseToRefreshContent={
						<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
					}
				>
					<table
						className={classNames({
							'table-auto overflow-x-auto text-left bg-white w-full shadow':
								true,
						})}
						style={{
							direction: i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr',
						}}
					>
						<thead className='text-base'>
							<tr>
								<th className=' lg:text-lg xl:text-xl'>
									<CheckBox
										label={t('order.orderInfo')}
										onChange={() => {
											// setIsAllChecked(!isAllChecked);
											if (checkedOrders.length === orders.length) {
												setCheckedOrders([]);
											}
											if (checkedOrders.length < orders.length) {
												setCheckedOrders(orders);
											}
										}}
										checked={checkedOrders.length === orders.length}
									/>
								</th>
								<th className=' lg:text-lg xl:text-xl'> {t('order.time')}</th>
								<th className=' lg:text-lg xl:text-xl'>{t('menu.status')}</th>
								<th className=' xl:text-xl'>{t('order.total')}</th>
								<th className=' lg:text-lg xl:text-xl'>{t('order.payment')}</th>
							</tr>
						</thead>
						<tbody>
							{sortedArray?.map((order: any, index: number) => (
								<OrderDetailRow
									orders={sortedArray}
									refetch={() => {
										refetch()
											.then(() => {
												setCheckedOrders([]);
											})
											.catch((err) => {
												console.error(err);
											});
									}}
									key={index}
									orderData={order}
									// setIsAllChecked={setIsAllChecked}
									// checked={order?._id === checkedOrder?._id && !isAllChecked}
									checked={checkedOrders.some(
										(checkedOrder) => checkedOrder._id === order._id
									)}
									// setChecked={setCheckedOrder}
									setChecked={(order: any) => {
										checkedOrders.some(
											(checkedOrder) => checkedOrder._id === order._id
										)
											? setCheckedOrders(
													checkedOrders.filter(
														(checkedOrder) => checkedOrder._id !== order._id
													)
											  )
											: setCheckedOrders([...checkedOrders, order]);
									}}
								/>
							))}
						</tbody>
					</table>
				</InfiniteScroll>
			</div>

			{paymentSelectModal && (
				<TakeOrderPaymentModal
					// ordersData={orders}
					// checkedOrder={checkedOrder}
					// isOrder={true}
					// isAllChecked={isAllChecked}
					checkedData={checkedOrders}
					isModalOpen={paymentSelectModal}
					setIsModalOpen={togglePaymentSelectModal}
					refetchTable={() => {
						refetch()
							.then(() => {
								setCheckedOrders([]);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				/>
			)}
			{isModalOpen && (
				<OrderTypeModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</div>
	);
};

export default Orders;
