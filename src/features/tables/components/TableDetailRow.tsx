import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import React, { useEffect, useState } from 'react';
import { FiChevronUp, FiXSquare, FiCopy } from 'react-icons/fi';
import { FaPrint } from 'react-icons/fa';
import useOpenController from '../hooks/useOpenController';
import moment from 'moment';
import { useSendOrderToKitchen } from '../api/sendOrderToKitchen';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { type GetTablesResponse } from 'features/cashier/api/types';
import { useOrderCancel } from '../api/orderCancel';
import TableOrderItem from './TableOrderItem';
import OrderEditModal from './OrderEditModal';
import { useDispatch } from 'react-redux';
import { resetItems, setItems } from 'features/order/slices/CartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetPrinterCommands } from 'features/order/api/getPrinterCommands';
import classNames from 'classnames';

interface Props {
	orderData: any;
	// refetchTable: <TPageData>(
	// 	options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	// ) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	refetchTable: () => any;
	checked: any;
	setChecked: any;
	branchName: string;
	orders: any;
	// setIsAllChecked?: any;
}

const TableDetailRow = ({
	orderData,
	refetchTable,
	checked,
	setChecked,
	branchName,
	orders,
}: // setIsAllChecked,
Props) => {
	const { t, i18n } = useTranslation();
	const { isOpen, toggle } = useOpenController(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const sendOrderToKitchenMutation = useSendOrderToKitchen({});
	const dispatch = useDispatch();
	const location = useLocation();
	const orderCancelMutation = useOrderCancel({});
	const navigate = useNavigate();
	const { data: printRes, refetch: refetchPrinterCommands } = useGetPrinterCommands({
		params: {
			orderId: orderData?._id,
		},
		config: {
			enabled: false,
		},
	})
	const handleSendToPrepare = async () => {
		await sendOrderToKitchenMutation.mutateAsync({
			orderId: orderData?._id,
		});
		await refetchTable();
	};
	const handleCancel = async () => {
		await orderCancelMutation.mutateAsync({
			orderId: orderData?._id,
		});
		await refetchTable();
	};

	const handleEditOrders = () => {
		navigate(
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			`/neworder/${orderData?.restaurantId}/${orderData?.tableId}/${orderData?._id}`
		);
	};

	const handlePrint = async () => {
		await refetchPrinterCommands();	
	}

	useEffect(() => {
		if (isOpen) {
			const items = orderData?.items.map((item: any) => ({
				menuItem: {
					menuItemId: item?.menuItem?.menuItemId,
				},
				// additions: allAdditions,
				notes: item?.notes,
				quantity: item?.quantity,
			}));

			dispatch(resetItems([]));
			// eslint-disable-next-line array-callback-return
			items.map((item: any) => {
				dispatch(setItems(item));
			});
		}

		// if (isOpen) {

		// }
	}, [isOpen]);

	return (
		<>
			<tr
				className={`  cursor-pointer transition-all ease-linear ${
					isOpen ? 'bg-primary text-white' : 'bg-grey'
				}`}
				onClick={toggle}
			>
				<th>
					<CheckBox
						className='text-base'
						label={`${t('order.order')} #${parseInt(orderData?.orderNumber)}`}
						onChange={() => {
							// setIsAllChecked(false);
							setChecked(orderData);
						}}
						checked={checked}
					/>
				</th>
				<th className={`text-[15px] ${isOpen ? 'text-white' : 'text-gray1'}`}>
					{moment(orderData?.createdAt).format('MMM d, yyyy h:mm a')}
				</th>
				<th className=' text-[15px]'>
					<td
						className={`bg-[#FFFFFF33] py-1.5 px-[23.5px] rounded-[10px]  border my-auto$ {isOpen? "border-white" : "bg-black"}`}
					>
						{t(
							`order.${
								orderData?.status
									?.trim()
									.split(' ')
									.join('')
									.toLowerCase() as string
							}`
						)}
					</td>
				</th>
				<th className='text-[15px]'>
					<h1>
						{t('order.totalPaid')} {orderData?.summary?.totalPaid}
					</h1>
					<h1>
						{t('order.remainedBalance')}{' '}
						{orderData?.summary?.totalWithTax - orderData?.summary?.totalPaid}
					</h1>
				</th>
				<th className=''>
					{' '}
					<td
						className={`bg-[#FFFFFF33] py-1.5 px-[23.5px] rounded-[10px]  border text-[15px] ${
							isOpen ? 'border-white' : 'border-black'
						}`}
					>
						{t(
							`order.${
								orderData?.paymentStatus
									.toLowerCase()
									.split(' ')
									.join('') as string
							}`
						)}
					</td>
				</th>
				<th className=' w-[34px]'>
					<div
						className={`cursor-pointer   p-[9.5px]  rounded-[10px] ${
							isOpen ? 'bg-[#FFFFFF80]' : 'bg-bodyGray'
						} `}
					>
						<FiChevronUp
							className={`${isOpen ? '' : 'text-gray1'} `}
							style={{
								transform: `rotate(${isOpen ? 180 : 0}deg)`,
								transition: 'all 0.25s',
							}}
						/>
					</div>
				</th>
			</tr>
			{isOpen && (
				<tr>
					<td colSpan={6}>
						<div className='bg-white flex  w-full flex-wrap lg:flex-nowrap'>
							<div className='text-white border pr-[21px] border-r-gray4 lg:basis-1/4 basis-1/2 border-b-gray4 lg:border-b-0'>
								<div>
									<h1
										className={classNames({
											'mb-2.5 text-gray3 text-[13px] ml-10': true,
											'mr-10 text-start': i18n.resolvedLanguage === 'ar',
										})}
									>
										{t('order.order')}
									</h1>

									{orderData?.items?.map((item: any) => (
										<TableOrderItem
											orderId={orderData?._id}
											orders={orders}
											refetchTable={refetchTable}
											key={item?._id}
											item={item}
										/>
									))}
								</div>
							</div>
							<div className='text-white border px-[21px] border-r-gray4 lg:basis-1/4 basis-1/2 border-b-gray4 lg:border-b-0'>
								<div className='h-full flex flex-col'>
									<h1 className='mb-[11px] text-gray3 text-[13px]'>
										{branchName}
									</h1>
									<div>
										{orderData?.summary?.headerDiscount > 0 && (
											<div className='flex justify-between mb-3 items-center'>
												<h1 className='text-gray1 text-[11px]'>
													{t('order.total')}
												</h1>
												<p className='text-gray3 text-[13px]'>
													{orderData?.summary.totalTaxableAmount -
														orderData?.summary.headerDiscount}{' '}
													SAR
												</p>
											</div>
										)}

										{orderData?.summary?.headerDiscount > 0 && (
											<div className='flex justify-between mb-3 items-center'>
												<h1 className='text-gray1 text-[11px]'>Discount</h1>
												<p className='text-primary text-[13px]'>
													{' '}
													-{orderData?.summary?.headerDiscount}
												</p>
											</div>
										)}

										<div className='flex justify-between items-center'>
											<h1 className='text-gray1 text-[11px]'>
												{t('order.totalAfterDiscount')}
											</h1>
											<p className='text-gray3 text-[13px]'>
												{orderData?.summary?.totalWithTax}
											</p>
										</div>
									</div>
									<div className='!mt-auto mb-1 w-fit flex gap-1'>
										<Button
											onClick={handlePrint}
										>
											<div className='flex items-center gap-1'>
												{t('order.print')}
												<FaPrint className='mt-1' />
											</div>
										</Button>
									</div>
								</div>
							</div>
							<div className='text-white border px-[21px] border-r-gray4 lg:basis-1/4 basis-1/2 pt-[22px] lg:pt-0'>
								<div className='flex justify-between'>
									<div className='flex flex-col gap-5'>
										<div>
											<h1 className='text-gray1 text-[11px] mb-1.5'>
												{t('menu.status')}
											</h1>
											<p className='text-darkGreen text-[13px]'>
												{t(
													`order.${
														orderData?.status
															?.trim()
															.split(' ')
															.join('')
															.toLowerCase() as string
													}`
												)}
											</p>
										</div>
										<div>
											<h1 className='text-gray1 text-[11px] mb-[5px]'>
												{t('order.payment')}
											</h1>
											<p className='text-white py-0.5 px-1.5 bg-primary rounded-small text-[13px] text-center max-w-fit'>
												{t(
													`order.${
														orderData?.paymentStatus
															.toLowerCase()
															.split(' ')
															.join('') as string
													}`
												)}{' '}
											</p>
										</div>
									</div>
									<div className='flex flex-col gap-5'>
										<div>
											<h1 className='text-gray1 text-[11px] mb-1.5'>
												{t('common.date')}
											</h1>
											<p className='text-gray3 text-[13px]'>
												{moment(orderData?.createdAt).format(
													'MMM d, yyyy h:mm a'
												)}
											</p>
										</div>
										<div>
											<h1 className='text-gray1 text-[11px] mb-[5px]'>
												{t('common.datePaid')}
											</h1>
											<p className='text-gray3 text-[13px]'>
												{' '}
												{moment(orderData?.paymentTime).format(
													'MMM d, yyyy h:mm a'
												)}
											</p>
										</div>
									</div>
								</div>
								<div></div>
							</div>
							<div className='text-white border pl-[21px] lg:border-r-0 border-r-gray4 lg:basis-1/4 basis-1/2 lg:pr-0 pr-[21px] pt-[22px] lg:pt-0'>
								<div>
									<div className='flex justify-between mb-[13px]'>
										<div className='flex-col'>
											<h1 className='text-gray1 text-[13px]'>
												{t('order.totalPaid')} {orderData?.summary?.totalPaid}
											</h1>

											<h1 className='text-gray1 text-[13px]'>
												{t('order.remainedBalance')}{' '}
												{orderData?.summary?.totalWithTax -
													orderData?.summary?.totalPaid}
											</h1>
										</div>
										{/* {!location.pathname.includes('cashier') && (
											<div onClick={handleEditOrders}>
												<h1 className='text-[17px] px-2.5 py-[5px] rounded-small bg-primary cursor-pointer'>
													Edit Orders
												</h1>
											</div>
										)} */}
									</div>
									{!location.pathname.includes('cashier') && (
										<div className='flex justify-center mb-5 gap-2.5'>
											<button
												onClick={handleSendToPrepare}
												className='text-darkOrange bg-white px-2.5 py-[5px] border border-darkOrange rounded-small text-[13px]'
											>
												{t('order.sentToPrepare')}
											</button>
											<button
												onClick={handleCancel}
												className='flex text-primary bg-white px-2.5 py-[5px] border border-primary rounded-small text-[13px] items-center gap-1'
											>
												<FiXSquare />
												<h1>{t('common.cancel')}</h1>
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</td>
				</tr>
			)}
		</>
	);
};

export default TableDetailRow;
