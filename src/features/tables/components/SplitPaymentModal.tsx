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
import { useTranslation } from 'react-i18next';


interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	toggleContinuePaymentModal: () => void;
	setAmount: any;
	setTotalWithPay: any;
	refetchTable: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	tableData: any;
	checkedOrder: any;
}

const SplitPaymentModal = ({
	isModalOpen,
	setIsModalOpen,
	refetchTable,
	checkedOrder,
	setAmount,
	toggleContinuePaymentModal,
	setTotalWithPay,
}: Props) => {
	const { t, i18n } = useTranslation();

	const { register, handleSubmit, reset, watch, getValues } = useForm();

	const [amountPerOne, setAmountPerOne] = useState<number>();
	const splitPaymentMutation = useSplitPayment({
		toggleContinuePaymentModal,
	});

	const handleSplitPayment = async (data: any) => {
		await splitPaymentMutation.mutateAsync({
			payload: {
				orderId: checkedOrder?._id,
				split: parseInt(data?.splitEqually),
			},
		});
		if (refetchTable) {
			await refetchTable();
		}

		setIsModalOpen(false);
	};

	useEffect(() => {
		if (
			getValues('splitEqually') === undefined ||
			getValues('splitEqually') < 1
		) {
			reset({
				splitEqually: 1,
			});
		}

		setAmountPerOne(
			checkedOrder?.summary?.totalWithTax /
				parseFloat(getValues('splitEqually'))
		);

		setAmount(parseFloat(getValues('splitEqually')));
		setTotalWithPay(checkedOrder?.summary?.totalWithTax);
	}, [watch('splitEqually'), getValues('splitEqually')]);

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl mb-1'>
				{t('cashier.splittotalamount')}
				</h1>

				<form
					className='flex flex-col gap-2.5 mt-2.5'
					onSubmit={handleSubmit(handleSplitPayment)}
				>
					<div className='flex h-full flex-col items-center justify-center '>
						<div className='bg-[#FAFCF6] flex items-center justify-center flex-col w-full border-green border rounded-[5px] py-3 gap-y-2.5'>
							<span className='text-darkGreen text-2xl font-extrabold'>
								{checkedOrder?.summary?.totalWithTax}
							</span>
							<span className='text-center  text-xl'>Total</span>
						</div>
					</div>
					<div className='flex items-center justify-between gap-2.5'>
						<div className='mt-2.5 flex flex-col grow '>
							<p className='text-left'>{t('cashier.splitequallyto')}</p>
							<Input
								min={1}
								defaultValue='1'
								name='splitEqually'
								register={register}
								placeholder='Split Equally To'
								type='number'
							/>
						</div>
					</div>
					<div className='flex items-center'>
					{t('cashier.amountperone')}{' '}
						<span className='text-primary ml-24'>{amountPerOne}</span>
					</div>
					<div className='flex items-center gap-x-2.5 grow mt-6'>
						<Button
							className='grow'
							variant='ghost'
							onClick={() => {
								setIsModalOpen(false);
							}}
						>
							{t('common.cancel')}
						</Button>
						<Button className='grow' type='submit'>
						{t('common.confirm')}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default SplitPaymentModal;
