import Button from 'components/Button';
import Modal from 'components/Modal';
import Textarea from 'components/Textarea';
import { useMemo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import SimpleTag from 'components/Tag/SimpleTag';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import Input from 'components/Input';
import { useTakePayment } from 'features/tables/api/takePayment';
import { useAppDispatch } from '../../../../../redux/hooks';
import { deleteTransaction } from '../../../../../redux/ordersReducer';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	setSuccessPaymentOpen: (value: boolean) => void;
	totalAmount: number;
	checkedOrder: string;
	cashierId?: string;
	amount: any;
	transactions: any;
}
export const CashPaymentModal = ({
	isOpen,
	setIsModalOpen,
	setSuccessPaymentOpen,
	totalAmount,
	checkedOrder,
	cashierId,
	amount,
	transactions,
}: Props) => {
	const { t, i18n } = useTranslation();

	const { handleSubmit, register, getValues, watch } = useForm<any>({
		defaultValues: {
			receivedAmount: 0,
		},
	});
	const dispatch = useAppDispatch();

	const onSuccessSplitCashPayment = () => {
		dispatch(deleteTransaction(transactions));
	};
	const takePayment = useTakePayment({
		//@ts-ignore
		setIsModalOpen: setIsModalOpen,
		onSuccessSplitCashPayment:
			amount > 0 ? onSuccessSplitCashPayment : () => {},
		//@ts-ignore
		setSuccessPaymentOpen: amount > 0 ? setSuccessPaymentOpen : () => {},
	});

	const receiveAmountWatch = useMemo(() => {
		const { receivedAmount } = getValues();
		if (+receivedAmount > totalAmount) {
			return +receivedAmount - totalAmount;
		}
	}, [getValues, totalAmount, watch('receivedAmount')]);

	const onSubmit = () => {
		const data: any = {
			orderId: checkedOrder,
			amount:
				amount == 0
					? totalAmount
					: Math.floor((totalAmount / amount) * 100) / 100,
			paymentMethod: 'Cash',
		};

		if (cashierId) {
			data.cashierId = cashierId;
		}

		if (transactions) {
			data.transactionId = transactions._id;
		}
		takePayment.mutateAsync({
			data,
		});
	};
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524]'>
				<div className='col-span-2 text-start text-[20px] font-dinBold text-center text-[#C02328]'>
					{t('payment.cashpayment')}
				</div>

				<div className='flex flex-col bg-[#A3C0480D] border-[#389E0D] border-[1px] mt-5 rounded-md'>
					<div className='text-[#389E0D] text-[25px] font-semibold flex justify-center mt-5'>
						{amount == 0 ? totalAmount : totalAmount / amount}
					</div>
					<div className='flex justify-center mb-3 mt-2 font-semibold'>
					{t('order.total')}
					</div>
				</div>

				<div className='flex justify-between items-center mt-2'>
					<form className='w-[100%] px-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='relative'>
							<span className='mt-4  font-semibold'>{t('cashier.receivedamount')}</span>
							<Input
								register={register}
								name='receivedAmount'
								className="w-full relative after:content-['SAR'] after:inline-block after:text-red-500 after:absolute after:top-0"
							/>
							<div className='mr-4 text-[#389E0D] font-dinBold absolute top-11 right-0'>
								SAR
							</div>
						</div>
						<div className='flex justify-between mt-2 w-[60%]'>
							<span>{t('cashier.refundamount')}</span>
							<span className='flex justify-center text-[#C02328] text-[20px] font-semibold'>
								{receiveAmountWatch}
							</span>
						</div>
						<div className='grid grid-cols-2 gap-3'>
							<Button
								variant='default'
								className='col-span-1 p-5 w-full border-[#ABA5A2] mt-5'
								onClick={setIsModalOpen}
							>
								{t('common.cancel')}
							</Button>

							<Button type='submit' className='col-span-1 p-5 w-full mt-5'>
							{t('common.confirm')}
							</Button>
						</div>
					</form>
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
