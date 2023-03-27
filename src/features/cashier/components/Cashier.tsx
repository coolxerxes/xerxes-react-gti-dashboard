import { useEffect, useCallback, useState } from 'react';
import Banner from 'components/Banner';
import Button from 'components/Button';
import Select from 'components/Select';
import SimpleTag from 'components/Tag/SimpleTag';
import { HiOutlineFilter } from 'react-icons/hi';
import { useGetOrders } from '../../kitchen/api/getOrders';
import { useGetTables } from '../api/getTables';
import Spinner from 'components/Spinner';
import Bill from './Bill';
import { useTranslation } from 'react-i18next';
import type { Summary, Table } from '../api/types';
import TableInfo from './TableInfo/TableInfo';
import { CloseCashierModal } from './CloseCashierModal';
import { useLocation } from 'react-router-dom';
import { useGetCashierDashboard } from '../api/getDashboardData';
import { useGetTableById } from 'features/tables/api/getTableById';
import { useAppSelector } from 'redux/hooks';
import { useGetCashierLogsById } from '../api/getLogs';
import { useGetOrderById } from '../api/getOrderById';
import { useGetTransactionById } from '../api/getTransactionById';
import OrderBill from './TableInfo/OrderBill';

const Cashier: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [filterBy, setFilterBy] = useState<string>('allOrders');
	const { data: tables, isLoading: isLoadingTables } = useGetTables({});
	const [selectedTableId, setSelectedTableId] = useState<string | undefined>();
	const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
	const userData = useAppSelector((state) => state.resources.auth.user);
	const [cashierOrders, setCashierOrders] = useState<any>([]);
	const [transactionId, setTransactionId] = useState('');
	const [orderId, setOrderId] = useState('');

	const id = userData?.cashier;
	const {
		data: transactionIdData,
		isLoading: isTransacationDataLoading,
		refetch: refetchTransactionData,
	} = useGetTransactionById({
		id: transactionId,
		config: {
			enabled: !!transactionId,
		},
	});
	const {
		data: orderData,
		isLoading: isOrderDataLoading,
		refetch: refetchOrderData,
	} = useGetOrderById({
		id: orderId,
		config: {
			enabled: !!orderId,
		},
	});
	useEffect(() => {
		setSelectedTableId(tables?.data.docs[0]._id);
	}, [isLoadingTables]);

	const { data: cashierDashboard } = useGetCashierDashboard({
		cashierId: userData?.cashier,
	});

	const {
		data: cashierLogsData,
		refetch,
		isLoading: isCashierLogsDataLoading,
	} = useGetCashierLogsById({
		id: userData?.cashier,
	});

	const {
		data: tableById,
		refetch: refetchTable,
		isLoading: isTableIdLoading,
	} = useGetTableById({
		tableId: selectedTableId,
	});

	const handlerSetSelectedTableId = useCallback((id: string | undefined) => {
		setSelectedOrderId(undefined);
		setSelectedTableId(id);
	}, []);

	const handlerSetSelectedOrderId = useCallback((id: string | undefined) => {
		setSelectedTableId(undefined);
		setSelectedOrderId(id);
	}, []);

	useEffect(() => {
		void refetchTable();
	}, [selectedTableId]);

	const [selectedTable, setSelectedTable] = useState<Table>();
	const [closeCashierModalOpen, setCloseCashierModalOpen] = useState(false);

	const toggleCloseCashierModal = useCallback(() => {
		setCloseCashierModalOpen(!closeCashierModalOpen);
	}, [setCloseCashierModalOpen, closeCashierModalOpen]);

	useEffect(() => {
		// eslint-disable-next-line array-callback-return
		try {
			if (!isCashierLogsDataLoading) {
				cashierLogsData?.data?.transactions.map(async (transaction: any) => {
					setTransactionId(transaction);
					await refetchTransactionData();
				});
			}
		} catch (error) {
			console.log('🚀 ~ file: Cashier.tsx:112 ~ useEffect ~ error:', error);
		}
	}, [cashierLogsData, isCashierLogsDataLoading]);

	useEffect(() => {
		if (transactionIdData) {
			setOrderId(transactionIdData?.data?.orderId);
			void refetchOrderData();
		}
	}, [transactionIdData, orderId]);

	useEffect(() => {
		if (orderData) {
			setCashierOrders([...cashierOrders, orderData]);
		}
	}, [orderData]);

	useEffect(() => {
		void refetchAllData();
	}, [refetchTable]);

	async function refetchAllData() {
		try {
			await refetch();
			await refetchTransactionData();
			await refetchOrderData();
		} catch (error) {
			console.log(
				'🚀 ~ file: Cashier.tsx:141 ~ refetchAllData ~ error:',
				error
			);
		}
	}

	const filterOrders = (tables: Table[] | undefined) => {
		if (!tables) {
			return [];
		}

		switch (filterBy) {
			case 'paid': {
				return tables.filter(
					(table) =>
						!table?.currentTableLog?.paymentNeeded &&
						table?.currentTableLog?.orders?.length
				);
			}

			case 'notPaid': {
				return tables.filter(
					(table) =>
						table?.currentTableLog?.paymentNeeded &&
						table?.currentTableLog?.orders?.length
				);
			}

			default:
				return tables?.filter(
					(table) => table?.currentTableLog?.orders?.length
				);
		}
	};
	const allOrdersId = filterOrders(tables?.data.docs)
		.map((table) => {
			return table.currentTableLog?.orders.map((order) => order);
		})
		?.flat();

	const availableOrders = cashierOrders.filter((cashierOrder: any) =>
		allOrdersId.includes(cashierOrder?._id)
	);

	return (
		<div className='grid grid-cols-1'>
			<div className='w-full min-h-[60px] flex items-center rounded-lg mt-[20px]'>
				<div className='w-[100%] flex  bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg'>
					<div className='flex w-full lg:flex-nowrap flex-wrap gap-y-2 justify-between px-[15px]'>
						<span className='flex items-center whitespace-nowrap font-dinBold xl:text-lg text-[17px] space-[-0.38px] mr-[10px]'>
							{t('cashier.cashierbox')} 1
						</span>

						<div className='flex justify-end items-center w-max gap-[10px] '>
							<SimpleTag
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								label={`${t('cashier.startingmoney')}: ${
									cashierDashboard?.openingBalance
								} SAR`}
								variant='dashed'
								className='border-[#ABA5A2] text-[#393230] bg-[#FAFAFA] px-1 pt-1 xl:text-[15px]'
							/>

							<SimpleTag
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								label={`${t('cashier.totalrefunds')}: ${
									cashierDashboard?.totalRefunds
								} SAR`}
								variant='dashed'
								className='border-[#0A6DD9] text-[#096DD9] bg-[#FAFAFA] px-1 pt-1 xl:text-[15px]'
							/>

							<SimpleTag
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								label={`${t('cashier.totalsales')}: ${
									cashierDashboard?.totalSales
								} SAR`}
								variant='dashed'
								className='border-[#04979C] text-[#08979C] bg-[#04979C0D] px-1 pt-1 xl:text-[15px]'
							/>

							<SimpleTag
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								label={`${t('cashier.todaytotalcash')}: ${
									cashierDashboard?.totalInCash
								} SAR`}
								variant='dashed'
								className='border-[#A3C048] text-[#389E0D] bg-[#A3C0480D] px-1 pt-1 xl:text-[15px]'
							/>

							<SimpleTag
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								label={`${t('cashier.totalbank')}: ${
									cashierDashboard?.totalInBank
								} SAR`}
								variant='dashed'
								className='border-[#D46B08] text-[#D46B08] bg-[#D46B080D] px-1 pt-1 xl:text-[15px]'
							/>

							<Button
								className='px-1 xl:text-base'
								onClick={toggleCloseCashierModal}
							>
								{t('cashier.closecashier')}
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full mt-[20px] relative z-0'>
				<div className='flex flex-col lg:flex-row justify-between gap-5'>
					<div className='lg:w-1/4 bg-white rounded-lg lg:min-h-[600px] max-h-[600px] lg:max-h-0 overflow-y-auto'>
						<div className='flex justify-between items-center p-[15px]'>
							<span className='text-left font-dinBold text-xl xl:text-[21px]'>
								{t('cashier.bills')}
							</span>

							<div className='relative'>
								<Select
									selected={filterBy}
									onChange={(value) => {
										setFilterBy(value);
									}}
									className=' h-[36px] flex items-center gap-x-3 text-[#AEAEAE] pb-3 pl-9'
									options={[
										{ value: 'allOrders', label: `${t('cashier.allorders')}` },
										{ value: 'paid', label: `${t('cashier.paid')}` },
										{ value: 'notPaid', label: `${t('cashier.notpaid')}` },
									]}
								/>
							</div>
						</div>

						<div className='h-[2px] w-full bg-inputBg mt-1'></div>

						<div className='px-2 mt-3'>
							{isLoadingTables ? (
								<Spinner />
							) : (
								<>
									{(filterOrders(tables?.data.docs) || []).map(
										(table, index) => {
											const isActive = selectedTableId
												? selectedTableId === table._id
												: index === 0;
											return (
												<div key={table._id}>
													<Bill
														key={table._id}
														table={table}
														onSelectTable={handlerSetSelectedTableId}
														isActive={isActive}
													/>
												</div>
											);
										}
									)}
									{availableOrders?.map((order: any, index: any) => {
										const isActive = selectedTableId
											? selectedOrderId === order._id
											: index === 0;
										return (
											<OrderBill
												key={order._id}
												order={order}
												onSelectOrder={handlerSetSelectedOrderId}
												isActive={isActive}
											/>
										);
									})}
								</>
							)}
						</div>
					</div>

					<TableInfo
						refetchTable={refetchTable}
						currentTable={tableById?.data}
						isTableLoading={isTableIdLoading}
						cashierDashboard={cashierDashboard as unknown as Summary}
						cashierId={id}
					/>

					<CloseCashierModal
						isOpen={closeCashierModalOpen}
						activeOrder={selectedTable}
						setIsModalOpen={toggleCloseCashierModal}
						cashierDashboard={cashierDashboard}
					/>
				</div>
			</div>
		</div>
	);
};

export default Cashier;
