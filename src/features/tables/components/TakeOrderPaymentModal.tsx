import React, {
	useState,
	type Dispatch,
	type SetStateAction,
	useEffect,
} from 'react';
import { useUpdateTable } from '../api/updateTable';
import Input from 'components/Input';
import Select from 'components/Select';
import Modal from 'components/Modal';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { type GetTablesResponse } from 'features/cashier/api/types';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { useGetList } from '../api/getList';
import { useSplitPayment } from '../api/splitPayment';
import { useTakePayment } from '../api/takePayment';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTable: () => any;
	tableData?: any;
	// checkedOrder: any;
	// isAllChecked: boolean;
	// isOrder?: boolean;
	// ordersData?: any;
	// payableOrders?: any;
	checkedData: any;
}

const TakeOrderPaymentModal = ({
	isModalOpen,
	setIsModalOpen,
	tableData,
	refetchTable,
	// checkedOrder,
	// isAllChecked,
	// isOrder,
	// ordersData,
	// payableOrders,
	checkedData,
}: Props) => {
	const takePaymentMutation = useTakePayment({});
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation();
	// const filteredOrders = isOrder
	// 	? ordersData?.filter(
	// 			(order: any) =>
	// 				order?.paymentStatus !== 'Paid' || order?.status === 'Cancelled'
	// 	  )
	// 	: tableData?.currentTableLog?.orders?.filter(
	// 			(order: any) =>
	// 				order?.paymentStatus !== 'Paid' || order?.status === 'Cancelled'
	// 	  );
	const filteredOrders = checkedData?.filter(
		(order: any) =>
			!(order?.paymentStatus === 'Paid' || order?.status === 'Cancelled')
	);

	const totalTablePaymentsSummary = filteredOrders?.map(
		(order: any) => order?.summary?.totalWithTax - order?.summary?.totalPaid
	);
	console.log(
		'🚀 ~ file: TakeOrderPaymentModal.tsx:68 ~ filteredOrders:',
		filteredOrders
	);

	console.log(
		'🚀 ~ file: TakeOrderPaymentModal.tsx:70 ~ totalTablePaymentsSummary:',
		totalTablePaymentsSummary
	);
	const totalTablePayment = totalTablePaymentsSummary?.reduce(
		(accumulator: number, currentValue: number) => accumulator + currentValue,
		0
	);
	console.log(
		'🚀 ~ file: TakeOrderPaymentModal.tsx:74 ~ totalTablePayment:',
		totalTablePayment
	);

	const handlePayment = async () => {
		setLoading(true);
		try {
			filteredOrders?.forEach(async (order: any) => {
				// if (order?.paymentStatus !== 'Paid' || order?.status !== 'Cancelled')

				await takePaymentMutation.mutateAsync({
					data: {
						orderId: order?._id,
						amount: order?.summary?.totalWithTax,
						paymentMethod: 'Cash',
					},
				});
			});
		} catch (e: any) {
			console.log(
				'🚀 ~ file: TakeOrderPaymentModal.tsx:105 ~ handlePayment ~ e:',
				e
			);
			toast.error(
				e?.response?.data?.message || e?.message || 'Something went wrong'
			);
			setLoading(false);
		}

		// if (isAllChecked) {
		// 	tableData?.currentTableLog?.orders.map(async (order: any) => {
		// 		if (order?.paymentStatus !== 'Paid' || order?.status !== 'Cancelled')
		// 			await takePaymentMutation.mutateAsync({
		// 				data: {
		// 					orderId: order?._id,
		// 					amount: order?.summary?.totalWithTax,
		// 					paymentMethod: 'Cash',
		// 				},
		// 			});
		// 	});
		// } else {
		// 	await takePaymentMutation.mutateAsync({
		// 		data: {
		// 			orderId: checkedOrder?._id,
		// 			amount:
		// 				checkedOrder?.summary?.totalWithTax -
		// 				checkedOrder?.summary?.totalPaid,
		// 			paymentMethod: 'Cash',
		// 		},
		// 	});
		// }

		await refetchTable();

		setIsModalOpen(false);
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl  capitalize mb-2.5'>
					{tableData?.name}
				</h1>

				<div className='flex h-full flex-col items-center justify-center '>
					<div className='bg-[#FAFCF6] flex items-center justify-center flex-col w-full border-green border rounded-[5px] py-3 gap-y-2.5'>
						<span className='text-darkGreen text-[25px] font-extrabold'>
							{totalTablePayment.toFixed(2)}
							{/* {isAllChecked
								? totalTablePayment
								: checkedOrder?.summary?.totalWithTax -
								  checkedOrder?.summary?.totalPaid} */}
						</span>
						<span className='text-center  text-[17px]'>{t('order.total')}</span>
					</div>
				</div>
				<div className='flex items-center justify-between gap-2.5'>
					<div className='mt-2.5 flex flex-col grow '>
						<p className='text-left mb-2.5 text-base'>{t('order.payment')}</p>
						<Button className='py-6' onClick={handlePayment} disable={loading}>
							{t('payment.cashpayment')}
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TakeOrderPaymentModal;
