import Button from 'components/Button';
import Modal from 'components/Modal';
import Textarea from 'components/Textarea';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import SimpleTag from 'components/Tag/SimpleTag';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import OrderItem from '../OrderItem';
import { type Summary } from 'types/order';
import CheckBox from 'components/CheckBox';
import { useState } from 'react';
import { useCallback } from 'react';
import { refundOrder, useRefundOrder } from 'features/cashier/api/refundOrder';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	// checkedOrder: string | any;
	// isAllChecked: boolean;
	summary: Summary;
	// tableData: any;
	refetchTable: any;
	checkedData: any;
}
export const RefundModal = ({
	isOpen,
	setIsModalOpen,
	// checkedOrder,
	// tableData,
	// isAllChecked,
	refetchTable,
	checkedData,
}: Props) => {
	const { t, i18n } = useTranslation();
	const refundOrder = useRefundOrder({ closeModal: setIsModalOpen });
	// const filteredOrders = tableData?.currentTableLog?.orders.filter(
	// 	(order: any) => order?.paymentStatus === 'Paid'
	// );
	const filteredOrders = checkedData.filter(
		(order: any) => order?.paymentStatus === 'Paid'
	);

	const totalTablePaymentsSummary = filteredOrders?.map(
		(order: any) => order.summary.totalPaid
	);
	const refundOrdersArray = filteredOrders?.map((order: any) => ({
		orderId: order?._id,
		amount: order.summary.totalPaid,
	}));
	const totalTablePayment = totalTablePaymentsSummary?.reduce(
		(accumulator: number, currentValue: number) => accumulator + currentValue,
		0
	);

	const onSubmit = async () => {
		refundOrdersArray.forEach(async (order: any) => {
			await refundOrder.mutateAsync({
				orderId: order?.orderId,
				amount: order?.amount,
			});
		});

		// if (!isAllChecked) {
		// 	await refundOrder.mutateAsync({
		// 		orderId: checkedOrder?._id,
		// 		amount: checkedOrder?.summary?.totalPaid,
		// 	});
		// } else if (isAllChecked) {
		// 	refundOrdersArray.map(async (refundOrder: any) => {
		// 		await refundOrder.mutateAsync({
		// 			orderId: refundOrder?.orderId,
		// 			amount: refundOrder?.amount,
		// 		});
		// 	});
		// }

		refetchTable();
	};

	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524]'>
				<div className='col-span-2  text-[20px] text-center text-[#C02328] flex gap-2'>
					<p className='font-dinBold'>{t('cashier.refundorder')}</p>

					<p className='text-[15px] text-[#ABA5A2] font-semibold flex item-center'>
						{/* {isAllChecked
							? 'Refund whole Table'
							: `#${parseInt(checkedOrder?.orderNumber)}`} */}
						Refund
					</p>
				</div>

				<div className='flex flex-col bg-[#C023280D] border-[#C02328] border-[1px] mt-5 rounded-md'>
					<div className='text-[#C02328] text-[25px] font-semibold flex justify-center mt-5'>
						{/* {isAllChecked
							? totalTablePayment
							: checkedOrder?.summary?.totalPaid} */}
						{totalTablePayment}
					</div>
					<div className='flex justify-center mb-3 mt-2 font-semibold'>
						{t('cashier.totalrefunds')}
					</div>
				</div>
				<div className='grid grid-cols-2 gap-3'>
					<Button
						type='submit'
						variant='default'
						className='col-span-1 p-5 w-full border-[#ABA5A2] mt-5'
						onClick={() => {
							setIsModalOpen(false);
						}}
					>
						{t('common.cancel')}
					</Button>

					<Button
						type='submit'
						className='col-span-1 p-5 w-full mt-5'
						onClick={onSubmit}
					>
						{t('common.confirm')}
					</Button>
				</div>
				<div
					onClick={() => {
						setIsModalOpen(false);
					}}
					className='absolute right-3 top-3 cursor-pointer'
				>
					<CloseModalIcon />
				</div>
			</div>
		</Modal>
	);
};
