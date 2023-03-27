import { useCallback, useEffect, useMemo, useState } from 'react';

import Banner from 'components/Banner';
import Button from 'components/Button';
import Spinner from 'components/Spinner';

import { useNavigate, useParams } from 'react-router-dom';
import { useGetTableById } from '../api/getTableById';
import CheckBox from 'components/CheckBox';

import EditTableModal from './EditTableModal';
import SplitPaymentModal from './SplitPaymentModal';
import MoveOrderToAnotherTableModal from './MoveOrderToAnotherTableModal';
import TakeOrderPaymentModal from './TakeOrderPaymentModal';
import TableDetailRow from './TableDetailRow';
import { useDispatch } from 'react-redux';
import { resetItems, setCart } from 'features/order/slices/CartSlice';
import { ContinuePaymentModal } from '../../cashier/components/TableInfo/Modals/ContinuePaymentModal';
import { useAppSelector } from 'redux/hooks';
import { toOrdinal } from 'number-to-words';
import { CashPaymentModal } from 'features/cashier/components/TableInfo/Modals/CashPaymentModal';
import { QrPaymentModal } from 'features/cashier/components/TableInfo/Modals/QrPaymentModal';
import { PostMachineModal } from 'features/cashier/components/TableInfo/Modals/PosMachineModal';
import { SuccessPaymentModal } from 'features/cashier/components/TableInfo/Modals/SuccessPaymentModal';
import { toast } from 'react-toastify';
import { useStartTable } from '../api/startTable';
import moment from 'moment';
import SimpleTag from 'components/Tag/SimpleTag';
import { useCloseTable } from '../api/closeTable';
import { useTranslation } from 'react-i18next';

const TableDetails: React.FC = () => {
	const { t, i18n } = useTranslation();

	const [editTableModal, setEditTableModal] = useState<boolean>(false);
	// const [splitTotalModal, setSplitTotalModal] = useState<boolean>(false);
	const [moveOrderModal, setMoveOrderModal] = useState<boolean>(false);
	const [cashPaymentModal, setCashPaymentModal] = useState<boolean>(false);
	const [qrPaymentModal, setQrPaymentModal] = useState<boolean>(false);
	const [posMachineModal, setPosMachineModal] = useState<boolean>(false);
	const [successPaymentModal, setSuccessPaymentModal] =
		useState<boolean>(false);
	const [continuePaymentModal, setContinuePaymentModal] =
		useState<boolean>(false);
	const [paymentSelectModal, setPaymentSelectModal] = useState<boolean>(false);
	const navigate = useNavigate();
	// const [checkedOrder, setCheckedOrder] = useState<null | any>(null);
	const [checkedOrders, setCheckedOrders] = useState<any[]>([]);

	const [amount, setAmount] = useState();
	const [totalWithPay, setTotalWithPay] = useState();
	const { tableId } = useParams();
	const [startedTime, setStartedTime] = useState<any>(0);
	const closeTableMutation = useCloseTable({});
	// const [isAllChecked, setIsAllChecked] = useState(false);

	const toggleEditTableModal = useCallback(() => {
		setEditTableModal(!editTableModal);
	}, [editTableModal, setEditTableModal]);

	const toggleSuccessPaymentModal = useCallback(() => {
		setSuccessPaymentModal(!successPaymentModal);
	}, [successPaymentModal, setSuccessPaymentModal]);

	const togglePosMachineModal = useCallback(() => {
		setPosMachineModal(!posMachineModal);
	}, [posMachineModal, setPosMachineModal]);

	const toggleQrPaymentModal = useCallback(() => {
		setQrPaymentModal(!qrPaymentModal);
	}, [qrPaymentModal, setQrPaymentModal]);

	const toggleCashPaymentModal = useCallback(() => {
		setCashPaymentModal(!cashPaymentModal);
	}, [cashPaymentModal, setCashPaymentModal]);

	const startTableMutation = useStartTable({});

	// const toggleSplitTotalModal = useCallback(() => {
	// 	if (checkedOrder?.paymentStatus === 'Paid') {
	// 		toast.error('Order is already paid');
	// 	} else if (checkedOrder?.status === 'Cancelled') {
	// 		toast.error('Order is already cancelled');
	// 	} else {
	// 		setSplitTotalModal(!splitTotalModal);
	// 	}
	// }, [splitTotalModal, setSplitTotalModal, checkedOrder]);

	const toggleMoveOrderModal = useCallback(() => {
		setMoveOrderModal(!moveOrderModal);
	}, [moveOrderModal, setMoveOrderModal]);

	const toggleContinuePaymentModal = useCallback(() => {
		setContinuePaymentModal(!continuePaymentModal);
	}, [continuePaymentModal, setContinuePaymentModal]);

	// const togglePaymentSelectModal = useCallback(() => {
	// 	if (checkedOrder?.paymentStatus === 'Paid') {
	// 		toast.error('Order is already paid');
	// 	} else if (checkedOrder?.status === 'Cancelled') {
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
				(order) =>
					order?.paymentStatus !== 'Paid' && order?.status !== 'Cancelled'
			)
		) {
			toast.error('Order is already paid or cancelled');
		} else {
			setPaymentSelectModal(!paymentSelectModal);
		}
	}, [paymentSelectModal, setPaymentSelectModal, checkedOrders]);

	const transactions = useAppSelector(
		(state) => state.data.orders.transactions
	);

	// const checkedOrderTransaction = useMemo(() => {
	// 	return transactions.filter(
	// 		(trans: any) => trans?.orderId === checkedOrder?._id
	// 	);
	// }, [transactions, checkedOrder]);

	const checkedOrderTransaction = useMemo(() => {
		return transactions.filter((trans: any) =>
			checkedOrders.some((order) => trans?.orderId === order?._id)
		);
	}, [transactions, checkedOrders]);
	const ordinalString = useMemo(() => {
		if (checkedOrderTransaction.length && amount) {
			return toOrdinal(amount - checkedOrderTransaction.length + 1);
		}
		return '';
	}, [checkedOrderTransaction, amount]);

	const {
		data: tableData,
		isLoading: isTableLoading,
		refetch: refetchTable,
	} = useGetTableById({ tableId });
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (!isTableLoading) {
	// 		setCheckedOrder(tableData?.data?.currentTableLog?.orders?.[0]);
	// 	}
	// }, [isTableLoading]);

	// useEffect(() => {
	// 	if (isAllChecked) {
	// 		setCheckedOrder(null);
	// 	}
	// }, [isAllChecked]);

	// useEffect(() => {
	// 	const timeone = moment(tableData?.data?.currentTableLog?.startingTime)
	// 		.toDate()
	// 		.getTime();

	// 	if (tableData?.data?.currentTableLog) {
	// 		const interval = setInterval(() => {
	// 			const timetwo = moment(new Date()).toDate().getTime();
	// 			const time = timetwo - timeone;
	// 			setStartedTime(moment(time).format('h:mm:ss'));
	// 			// setStartedTime();
	// 		}, 1000);

	// 		return () => {
	// 			clearInterval(interval);
	// 		};
	// 	}
	// }, [tableData]);

	if (isTableLoading) {
		return <Spinner />;
	}

	const branchName = tableData?.data?.restaurantId?.name;

	const sortedArray = tableData?.data?.currentTableLog?.orders.sort(
		(a: any, b: any) => parseInt(b.orderNumber) - parseInt(a.orderNumber)
	);
	console.log('🚀 ~ file: TableDetails.tsx:190 ~ sortedArray:', sortedArray);

	const handleOpenTable = async () => {
		await startTableMutation.mutateAsync({
			tableId,
		});
		await refetchTable();
	};

	const handleCloseTable = async () => {
		await closeTableMutation
			.mutateAsync({
				tableId,
			})
			.then(async (res) => {
				await refetchTable();
			});
	};

	return (
		<div>
			<div className='w-full bg-white h-[60px] flex items-center rounded-lg justify-between my-5 sticky top-[11%] z-[100]'>
				<Banner>
					<div className='flex items-center gap-2.5 ml-3'>
						<span
							className='cursor-pointer mt-1'
							onClick={() => {
								navigate('/tables');
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='13'
								viewBox='0 0 20 13'
							>
								<g
									id='Arrow_-_Right'
									data-name='Arrow - Right'
									transform='translate(5 -13)'
								>
									<path
										id='Arrow_-_Right-2'
										data-name='Arrow - Right'
										d='M11.176,0h0a2.279,2.279,0,0,0-1.011.238,2.056,2.056,0,0,0-.9.979,10.6,10.6,0,0,0-.29,1.153A23.3,23.3,0,0,0,8.708,6.11l0,.383a29.2,29.2,0,0,0,.24,4l.126.589a3.97,3.97,0,0,0,.259.849A2.016,2.016,0,0,0,11.112,13h.064a5.557,5.557,0,0,0,1.492-.441,25.023,25.023,0,0,0,6.215-4.105l.421-.43a3.9,3.9,0,0,0,.311-.362A1.892,1.892,0,0,0,20,6.508a1.975,1.975,0,0,0-.417-1.232l-.432-.455-.1-.1A24.552,24.552,0,0,0,12.508.364l-.271-.1A4.851,4.851,0,0,0,11.176,0Zm-9.5,4.857h0a1.645,1.645,0,1,0,0,3.289l4.11-.355a1.29,1.29,0,1,0,0-2.58Z'
										transform='translate(15 26) rotate(180)'
										fill='#585858'
									/>
								</g>
							</svg>
						</span>
						<span className='font-dinBold text-xl space-[-0.38px]  capitalize'>
							{i18n.resolvedLanguage === 'ar'
								? tableData?.data?.nameAr ?? tableData?.data?.name
								: tableData?.data?.name}
						</span>
						<Button
							onClick={toggleEditTableModal}
							className='!text-base'
							variant='ghost'
						>
							{t('tables.edit')}
						</Button>
					</div>
					<div className='mr-3 flex justify-center items-center gap-2.5'>
						{/* <Button className='text-base' onClick={toggleSplitTotalModal}>
							Split Total Amount
						</Button> */}
						{tableData?.data?.currentTableLog && (
							<Button className='text-base' onClick={togglePaymentSelectModal}>
								{t('order.paymentForSelected')}
							</Button>
						)}

						{tableData?.data?.currentTableLog && (
							<Button className='text-base' onClick={toggleMoveOrderModal}>
								{t('tables.movetoothertable')}
							</Button>
						)}

						<Button
							className='text-base'
							onClick={() => {
								dispatch(setCart(null));
								dispatch(resetItems([]));
								navigate(
									// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
									`/neworder/${tableData?.data?.restaurantId?._id}/${tableData?.data?._id}`
								);
							}}
						>
							{t('order.makeNewOrder')}
						</Button>
						{!tableData?.data?.currentTableLog && (
							<Button className='text-base' onClick={handleOpenTable}>
								+ {t('tables.addsittingtime')}
							</Button>
						)}
						{tableData?.data?.currentTableLog && (
							<div className='flex flex-col items-start text-[17px]'>
								<p>{t('tables.sittingstarttime')}</p>
								<span className='text-primary'>
									{moment(
										tableData?.data?.currentTableLog?.startingTime
									).format('h:mm:ss ')}
								</span>
							</div>
						)}
						{tableData?.data?.currentTableLog && (
							<div onClick={handleCloseTable}>
								{' '}
								<SimpleTag
									label={t('tables.closetable')}
									variant='dashed'
									className='border-primary text-primary bg-white w-[99px] h-[35px] justify-center items-center !text-base'
								/>
							</div>
							// <Button className='text-base' onClick={toggleMoveOrderModal}>

							// </Button>
						)}
					</div>
				</Banner>
			</div>

			<table className='table-auto text-left bg-white w-full shadow'>
				<thead className='text-base'>
					<tr>
						<th>
							<CheckBox
								label={t('order.orderInfo')}
								// onChange={() => {
								// 	setIsAllChecked(!isAllChecked);
								// }}
								// checked={isAllChecked}
								onChange={() => {
									checkedOrders.length === sortedArray.length
										? setCheckedOrders([])
										: setCheckedOrders(sortedArray);
								}}
								checked={checkedOrders.length === sortedArray.length}
							/>
						</th>
						<th>{t('order.time')}</th>
						<th>{t('menu.status')}</th>
						<th>{t('order.total')}</th>
						<th>{t('order.payment')}</th>
					</tr>
				</thead>
				<tbody>
					{sortedArray?.map((order: any, index: number) => (
						<TableDetailRow
							orders={sortedArray}
							branchName={branchName}
							// refetchTable={refetchTable}
							key={index}
							orderData={order}
							refetchTable={() => {
								refetchTable()
									.then(() => {
										setCheckedOrders([]);
									})
									.catch((err) => {
										console.log(err);
									});
							}}
							// setIsAllChecked={setIsAllChecked}
							// checked={order?._id === checkedOrder?._id && !isAllChecked}
							// setChecked={setCheckedOrder}
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

			{editTableModal && (
				<EditTableModal
					tableData={tableData?.data}
					isModalOpen={editTableModal}
					setIsModalOpen={toggleEditTableModal}
					refetchTable={refetchTable}
				/>
			)}
			{/* {splitTotalModal && (
				<SplitPaymentModal
					checkedOrder={checkedOrder}
					tableData={tableData?.data}
					isModalOpen={splitTotalModal}
					setIsModalOpen={setSplitTotalModal}
					refetchTable={refetchTable}
					setAmount={setAmount}
					toggleContinuePaymentModal={toggleContinuePaymentModal}
					setTotalWithPay={setTotalWithPay}
				/>
			)} */}
			{moveOrderModal && (
				<MoveOrderToAnotherTableModal
					// checkedOrder={checkedOrder}
					checkedOrders={checkedOrders}
					tableData={tableData?.data}
					isModalOpen={moveOrderModal}
					setIsModalOpen={toggleMoveOrderModal}
					refetchTable={refetchTable}
				/>
			)}
			{continuePaymentModal && (
				<ContinuePaymentModal
					isOpen={continuePaymentModal}
					setIsModalOpen={toggleContinuePaymentModal}
					setCashOpen={toggleCashPaymentModal}
					setQrOpen={toggleQrPaymentModal}
					setPosMachineOpen={togglePosMachineModal}
					amount={amount}
					totalWithPay={totalWithPay}
					ordinal={ordinalString}
				/>
			)}
			{/* {cashPaymentModal && (
				<CashPaymentModal
					isOpen={cashPaymentModal}
					setIsModalOpen={toggleCashPaymentModal}
					setSuccessPaymentOpen={toggleSuccessPaymentModal}
					totalAmount={totalWithPay ?? 0}
					checkedOrder={checkedOrder?._id}
					amount={amount}
					transactions={checkedOrderTransaction[0]}
				/>
			)} */}
			{qrPaymentModal && (
				<QrPaymentModal
					isOpen={qrPaymentModal}
					setIsModalOpen={toggleQrPaymentModal}
				/>
			)}
			{posMachineModal && (
				<PostMachineModal
					isOpen={posMachineModal}
					setIsModalOpen={togglePosMachineModal}
				/>
			)}
			{successPaymentModal && (
				<SuccessPaymentModal
					isOpen={successPaymentModal}
					setIsModalOpen={toggleSuccessPaymentModal}
					transactions={checkedOrderTransaction}
					toggleContinuePaymentModal={toggleContinuePaymentModal}
					totalAmount={totalWithPay as unknown as number}
					amount={amount as unknown as number}
					ordinal={ordinalString}
				/>
			)}

			{paymentSelectModal && (
				<TakeOrderPaymentModal
					// checkedOrder={checkedOrder}
					// isAllChecked={isAllChecked}
					tableData={tableData?.data}
					isModalOpen={paymentSelectModal}
					setIsModalOpen={togglePaymentSelectModal}
					// refetchTable={refetchTable}
					checkedData={checkedOrders}
					refetchTable={() => {
						refetchTable()
							.then(() => {
								setCheckedOrders([]);
							})
							.catch((err) => {
								console.log(err);
							});
					}}
				/>
			)}
		</div>
	);
};

export default TableDetails;
