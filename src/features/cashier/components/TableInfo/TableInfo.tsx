/* eslint-disable @typescript-eslint/restrict-plus-operands */
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import Spinner from 'components/Spinner';
import SplitPaymentModal from 'features/tables/components/SplitPaymentModal';
import { memo, useEffect, useCallback, useMemo, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { type Summary } from 'types/order';
import type { Order, Table } from '../../api/types';
import { CashPaymentModal } from './Modals/CashPaymentModal';
import { ContinuePaymentModal } from './Modals/ContinuePaymentModal';
import { PostMachineModal } from './Modals/PosMachineModal';
import { QrPaymentModal } from './Modals/QrPaymentModal';
import { RefundModal } from './Modals/RefundModal';
import { SuccessPaymentModal } from './Modals/SuccessPaymentModal';
import OrderInfo from './OrderInfo';
import { toOrdinal } from 'number-to-words';
import TableDetailRow from 'features/tables/components/TableDetailRow';
import TakeOrderPaymentModal from 'features/tables/components/TakeOrderPaymentModal';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useGetInvoice } from 'features/cashier/api/getInvoice';
import { useTranslation } from 'react-i18next';

interface Props {
	currentTable: Table;
	isTableLoading: boolean;
	cashierDashboard: Summary;
	cashierId: string;
	refetchTable: any;
}

const TableInfo = memo(
	({
		currentTable,
		isTableLoading,
		cashierDashboard,
		cashierId,
		refetchTable,
	}: Props) => {
		const { t, i18n } = useTranslation();
		const [continuePaymentModalOpen, setContinuePaymentModalOpen] =
			useState(false);
		const [cashPaymentModalOpen, setCashPaymentModalOpen] = useState(false);
		const [successPaymentModalOpen, setSuccessPaymentModalOpen] =
			useState(false);
		const location = useLocation();
		const [orderId, setOrderId] = useState('');
		const [qrPaymentModalOpen, setQrPaymentModalOpen] = useState(false);
		const [posMachineModalOpen, setPosMachineModalOpen] = useState(false);
		const [refundModalOpen, setRefundModalOpen] = useState(false);
		const [splitModalOpen, setSplitModalOpen] = useState(false);
		// const [checkedOrder, setCheckedOrder] = useState<any>();
		const [checkedOrders, setCheckedOrders] = useState<any>([]);
		const [paymentSelectModal, setPaymentSelectModal] =
			useState<boolean>(false);
		const [amount, setAmount] = useState();
		const [totalWithPay, setTotalWithPay] = useState();
		// const [isAllChecked, setIsAllChecked] = useState(true);
		const transactions = useAppSelector(
			(state) => state.data.orders.transactions
		);

		const checkedOrderTransaction = useMemo(() => {
			return transactions.filter(
				// (trans: any) => trans?.orderId === checkedOrder
				(trans: any) =>
					checkedOrders.some((order: any) => order?._id === trans?.orderId)
			);
		}, [transactions, checkedOrders]);

		// const handlerCheckOrder = useCallback(
		// 	(id: any) => {
		// 		setCheckedOrder(id);
		// 	},
		// 	[setCheckedOrder]
		// );

		// const filteredOrders = currentTable?.currentTableLog?.orders.filter(
		// 	(order: any) =>
		// 		order?.paymentStatus !== 'Paid' || order?.status === 'Cancelled'
		// );

		// const togglePaymentSelectModal = useCallback(() => {
		// 	if (
		// 		checkedOrder?.paymentStatus === 'Paid' ||
		// 		filteredOrders?.length === 0
		// 	) {
		// 		toast.error('Order is already paid');
		// 	} else if (
		// 		checkedOrder?.status === 'Cancelled' ||
		// 		filteredOrders?.length === 0
		// 	) {
		// 		toast.error('Order is already cancelled');
		// 	} else {
		// 		setPaymentSelectModal(!paymentSelectModal);
		// 	}
		// }, [paymentSelectModal, setPaymentSelectModal, checkedOrder]);

		const togglePaymentSelectModal = useCallback(() => {
			if (checkedOrders.length === 0) {
				toast.error('Please select order');
			} else if (
				!checkedOrders.some(
					(order: any) =>
						order?.paymentStatus !== 'Paid' && order?.status !== 'Cancelled'
				)
			) {
				toast.error('Order is already paid or cancelled');
			} else {
				setPaymentSelectModal(!paymentSelectModal);
			}
		}, [paymentSelectModal, setPaymentSelectModal, checkedOrders]);

		// useEffect(() => {
		// 	if (!isTableLoading) {
		// 		setCheckedOrder(currentTable?.currentTableLog?.orders?.[0]);
		// 	}
		// }, [isTableLoading]);

		// useEffect(() => {
		// 	if (isAllChecked) {
		// 		setCheckedOrder(null);
		// 	}
		// }, [isAllChecked]);
		const branchName = currentTable?.restaurantId?.name;

		const isPaid = currentTable?.currentTableLog?.paymentNeeded
			? `${t('cashier.notpaid')}`
			: `${t('cashier.paid')}`;

		const toggleContinuePaymentModal = useCallback(() => {
			setContinuePaymentModalOpen(!continuePaymentModalOpen);
		}, [continuePaymentModalOpen, setContinuePaymentModalOpen]);

		const toggleSplitPaymentModal = useCallback(() => {
			setSplitModalOpen(!splitModalOpen);
		}, [splitModalOpen, setSplitModalOpen]);

		const toggleCashPaymentModal = useCallback(() => {
			setCashPaymentModalOpen(!cashPaymentModalOpen);
		}, [setCashPaymentModalOpen, cashPaymentModalOpen]);

		const toggleSuccessPaymentModal = useCallback(() => {
			setSuccessPaymentModalOpen(!successPaymentModalOpen);
		}, [setSuccessPaymentModalOpen, successPaymentModalOpen]);

		const toggleQrPaymentModal = useCallback(() => {
			setQrPaymentModalOpen(!qrPaymentModalOpen);
		}, [setQrPaymentModalOpen, qrPaymentModalOpen]);

		const togglePosMachineModal = useCallback(() => {
			setPosMachineModalOpen(!posMachineModalOpen);
		}, [setPosMachineModalOpen, posMachineModalOpen]);

		const toggleRefundModal = useCallback(() => {
			setRefundModalOpen(!refundModalOpen);
		}, [setRefundModalOpen, refundModalOpen]);

		const totalAmount = useMemo(() => {
			let totalAmountValue;
			if (checkedOrders.length > 0) {
				const order: any = currentTable?.currentTableLog?.orders.find(
					// (el: any) => el?._id === checkedOrder
					(el: any) =>
						checkedOrders.some((order: any) => order?._id === el?._id)
				);
				totalAmountValue = order?.items.reduce((a: any, c: any) => {
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					return a + c.amountAfterDiscount;
				}, 0);
				return totalAmountValue;
			}

			return 0;
		}, [checkedOrders]);

		const discount = useMemo(() => {
			let discountValue;
			if (checkedOrders.length > 0) {
				const order: any = currentTable?.currentTableLog?.orders.find(
					// (el: any) => el?._id === checkedOrder
					(el: any) =>
						checkedOrders.some((order: any) => order?._id === el?._id)
				);
				discountValue = order?.items.reduce((a: any, c: any) => {
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					return a + (c.amountBeforeDiscount - c.amountAfterDiscount);
				}, 0);
				return discountValue;
			}
			return 0;
		}, [checkedOrders]);

		// useEffect(() => {
		// 	if (!isTableLoading) {
		// 		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// 		// @ts-expect-error
		// 		setCheckedOrder(currentTable?.currentTableLog?.orders[0]?._id);
		// 	}
		// }, [currentTable, isTableLoading]);

		const checkedOrderItem = useMemo(() => {
			const order: any = currentTable?.currentTableLog?.orders.find(
				// (el: any) => el?._id === checkedOrder
				(el: any) => checkedOrders.some((order: any) => order === el?._id)
			);
			if (order) {
				setAmount(order?.transactions?.length);
				setTotalWithPay(order?.summary.totalBeforeDiscount);
			}
			return order;
		}, [checkedOrders]);

		const ordinalString = useMemo(() => {
			if (checkedOrderTransaction.length) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				return toOrdinal(amount - checkedOrderTransaction.length + 1);
			}
		}, [checkedOrderTransaction]);
		const sortedArray =
			currentTable?.currentTableLog?.orders.sort(
				(a: any, b: any) => parseInt(b.orderNumber) - parseInt(a.orderNumber)
			) ?? [];

		const handleGetInvoice = () => {};

		return (
			<div className='lg:w-3/4 bg-white rounded-lg  min-h-[600px]'>
				<div className='flex justify-between p-4'>
					<span className='text-left font-dinBold xl:text-[25px] text-2xl'>
						{currentTable?.name}
					</span>

					{currentTable?.currentTableLog?.paymentNeeded ? (
						<div className='flex gap-2 '>
							{/* <Button>Different Method</Button> */}

							{/* <Button onClick={toggleSplitPaymentModal}>
								Split Total Amount
							</Button> */}

							<Button
								className='xl:text-base'
								onClick={togglePaymentSelectModal}
							>
								{t('cashier.paymentforselected')}
							</Button>

							<Button
								width={120}
								className='!bg-lightRedBg !rounded-lg !text-primary border-primary hover:!border-primary hover:!text-primary xl:text-base'
							>
								{isPaid}
							</Button>
						</div>
					) : (
						<div className='flex gap-2 xl:text-base'>
							<Button>{t('cashier.invoice')}</Button>

							<Button className='px-3' onClick={toggleRefundModal}>
								<span className='flex items-center'>{t('cashier.refund')}</span>
							</Button>

							<Button className='px-12  bg-green !border-[#389E0D] !rounded-lg  !text-black'>
								{t('cashier.paid')}
							</Button>
						</div>
					)}
				</div>
				<div className='h-[2px] w-full bg-inputBg'></div>
				{/* {checkedOrder && */}
				{!!checkedOrders.length &&
					checkedOrderItem?.transactions?.length > 0 &&
					checkedOrderTransaction?.length > 0 && (
						<div className='flex justify-between items-center m-3 rounded-md py-1 px-[10px]  bg-[#FCF4F4] border-dashed border-2 border-primary'>
							<span className='text-primary text-base'>
								YOU PAID{' '}
								{checkedOrderItem?.transactions?.length -
									checkedOrderTransaction?.length}{' '}
								FROM {checkedOrderItem?.transactions?.length} SPLIT PAYMENT
							</span>

							<Button onClick={toggleContinuePaymentModal}>
								<span className='flex items-center'>
									{checkedOrderItem?.transactions?.length -
										checkedOrderTransaction?.length}{' '}
									/{checkedOrderItem?.transactions?.length} Continue Payment
								</span>
							</Button>
						</div>
					)}
				{isTableLoading ? (
					<Spinner />
				) : (
					<div className='px-3 mt-3 overflow-x-auto'>
						<table className='table-auto text-left bg-white w-full shadow'>
							<thead className='xl:text-[17px] text-base'>
								<tr>
									<th className=' lg:text-lg xl:text-xl'>
										<CheckBox
											label={t('order.orderInfo')}
											// onChange={() => {
											// 	setIsAllChecked(!isAllChecked);
											// }}
											// checked={isAllChecked}
											onChange={() => {
												// setIsAllChecked(!isAllChecked);
												if (checkedOrders.length === sortedArray.length) {
													setCheckedOrders([]);
												}
												if (checkedOrders.length < sortedArray.length) {
													setCheckedOrders(sortedArray);
												}
											}}
											checked={checkedOrders.length === sortedArray.length}
										/>
									</th>
									<th className=' lg:text-lg xl:text-xl'> {t('order.time')}</th>
									<th className=' lg:text-lg xl:text-xl'>{t('menu.status')}</th>
									<th className=' xl:text-xl'>{t('order.total')}</th>
									<th className=' lg:text-lg xl:text-xl'>
										{t('order.payment')}
									</th>
								</tr>
							</thead>
							<tbody>
								{sortedArray?.map((order: any, index: number) => (
									<TableDetailRow
										orders={sortedArray}
										branchName={branchName}
										refetchTable={refetchTable}
										key={index}
										orderData={order}
										// setIsAllChecked={setIsAllChecked}
										// checked={order?._id === checkedOrder?._id && !isAllChecked}
										// setChecked={setCheckedOrder}
										checked={checkedOrders.some(
											(checkedOrder: any) => checkedOrder._id === order._id
										)}
										// setChecked={setCheckedOrder}
										setChecked={(order: any) => {
											checkedOrders.some(
												(checkedOrder: any) => checkedOrder._id === order._id
											)
												? setCheckedOrders(
														checkedOrders.filter(
															(checkedOrder: any) =>
																checkedOrder._id !== order._id
														)
												  )
												: setCheckedOrders([...checkedOrders, order]);
										}}
									/>
								))}
							</tbody>
						</table>
					</div>
				)}

				<ContinuePaymentModal
					isOpen={continuePaymentModalOpen}
					setIsModalOpen={toggleContinuePaymentModal}
					setCashOpen={toggleCashPaymentModal}
					setQrOpen={toggleQrPaymentModal}
					setPosMachineOpen={togglePosMachineModal}
					amount={amount}
					totalWithPay={totalWithPay}
					ordinal={ordinalString}
				/>
				{paymentSelectModal && (
					<TakeOrderPaymentModal
						// checkedOrder={checkedOrder}
						// isAllChecked={isAllChecked}
						// tableData={currentTable}
						isModalOpen={paymentSelectModal}
						setIsModalOpen={togglePaymentSelectModal}
						// refetchTable={refetchTable}
						checkedData={checkedOrders}
						refetchTable={() => {
							refetchTable()
								.then(() => {
									setCheckedOrders([]);
								})
								.catch((err: any) => {
									console.log(err);
								});
						}}
					/>
				)}
				{/* <CashPaymentModal
					isOpen={cashPaymentModalOpen}
					setIsModalOpen={toggleCashPaymentModal}
					setSuccessPaymentOpen={toggleSuccessPaymentModal}
					totalAmount={totalAmount}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment

					checkedOrder={checkedOrder}
					cashierId={cashierId}
					amount={amount}
					transactions={checkedOrderTransaction[0]}
				/> */}
				<SuccessPaymentModal
					isOpen={successPaymentModalOpen}
					setIsModalOpen={toggleSuccessPaymentModal}
					transactions={checkedOrderTransaction}
					toggleContinuePaymentModal={toggleContinuePaymentModal}
					totalAmount={totalAmount}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					amount={amount}
					ordinal={ordinalString}
				/>
				<QrPaymentModal
					isOpen={qrPaymentModalOpen}
					setIsModalOpen={toggleQrPaymentModal}
				/>
				<PostMachineModal
					isOpen={posMachineModalOpen}
					setIsModalOpen={togglePosMachineModal}
				/>
				<RefundModal
					// isAllChecked={isAllChecked}
					// tableData={currentTable}
					checkedData={checkedOrders}
					refetchTable={() => {
						refetchTable()
							.then(() => {
								setCheckedOrders([]);
							})
							.catch((err: any) => {
								console.log(err);
							});
					}}
					isOpen={refundModalOpen}
					setIsModalOpen={toggleRefundModal}
					// checkedOrder={checkedOrder}
					summary={cashierDashboard}
				/>
				{/* 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error */}
				<SplitPaymentModal
					isModalOpen={splitModalOpen}
					setIsModalOpen={toggleSplitPaymentModal}
					checkedOrder={currentTable?.currentTableLog?.orders.find(
						// (el: any) => el._id === checkedOrder
						(el: any) =>
							checkedOrders.some(
								(checkedOrder: any) => checkedOrder._id === el._id
							)
					)}
					toggleContinuePaymentModal={toggleContinuePaymentModal}
					setAmount={setAmount}
					setTotalWithPay={setTotalWithPay}
				/>
			</div>
		);
	}
);

TableInfo.displayName = 'TableInfo';

export default TableInfo;
