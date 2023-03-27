import Button from 'components/Button';
import Modal from 'components/Modal';
import Textarea from 'components/Textarea';
import { useEffect, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { GetCashierDashboardResponse, type Table } from '../api/types';
import SimpleTag from 'components/Tag/SimpleTag';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import Input from 'components/Input';
import Upload from 'components/Upload';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpen: boolean;
	activeOrder: Table | undefined;
	setIsModalOpen: (value: boolean) => void;
	cashierDashboard?: GetCashierDashboardResponse;
}
export const CloseCashierModal: FC<Props> = ({
	isOpen,
	activeOrder,
	setIsModalOpen,
	cashierDashboard,
}) => {
	const { t, i18n } = useTranslation();
	const { handleSubmit, register, getValues, reset } = useForm<any>({
		defaultValues: {
			openingBalance: '',
			comment: '',
		},
	});

	useEffect(() => {
		reset({
			openingBalance: cashierDashboard?.totalInBank,
		});
	}, []);

	const onSubmit = () => {};
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524] px-6'>
				<div className='col-span-2 text-start text-[20px] font-dinBold text-center text-[#C02328]'>
				{t('cashier.closecashier')}
				</div>

				<div className='grid grid-cols-2 mt-6 gap-3 font-semibold'>
					<SimpleTag
						label={`${t('cashier.startingmoney')}: ${cashierDashboard?.openingBalance} SAR`}
						variant='dashed'
						className='col-span-1 border-[#ABA5A2] text-[#393230] bg-[#FAFAFA] p-2 flex justify-center font-semibold'
					/>

					<SimpleTag
						label={`${t('cashier.totalbank')}: ${cashierDashboard?.totalInBank} SAR`}
						variant='dashed'
						className='col-span-1 border-[#D46B08] text-[#D46B08] bg-[#D46B080D] px-1 flex justify-center font-semibold'
					/>
				</div>

				<SimpleTag
					label={`${t('cashier.todaytotalcash')}: ${cashierDashboard?.totalInCash} SAR`}
					variant='dashed'
					className='mt-2 col-span-1 border-[#A3C048] text-[#389E0D] bg-[#A3C0480D] p-2 flex justify-center font-semibold'
				/>

				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					<p className='mt-[20px] font-semibold'>{t('cashier.howmuchcashier')}</p>
					<div className='w-[100%]'>
						<Input
							register={register}
							name='openingBalance'
							className="w-full relative after:content-['SAR'] after:inline-block after:text-red-500 after:absolute after:top-0"
						/>
					</div>

					<div className='grid grid-cols-3 mt-4 mb-[28px] font-semibold'>
						<span>{t('cashier.cashvariance')}</span>
						<span className='flex justify-center text-[#C02328] text-[20px]'>
							-400.00
						</span>
					</div>

					<div className='font-semibold'>{t('cashier.commentaboutcash')}</div>

					<Textarea
						name='comment'
						placeholder='Type Comment'
						register={register}
					/>

					<div className='mt-5'>
						<div className='font-semibold'>{t('cashier.uploadreceipt')}</div>

						<div className='mt-1'>
							<Upload
								onChange={(url) => {
									// setValue('backgroundImage', url);
								}}
								horizontal={true}
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 gap-3'>
						<Button
							type='submit'
							variant='default'
							className='col-span-1 p-5 w-full border-[#ABA5A2] mt-5'
							onClick={() => {
								return setIsModalOpen;
							}}
						>
							{t('common.cancel')}
						</Button>

						<Button type='submit' className='col-span-1 p-5 w-full mt-5'>
						{t('cashier.closecashier')}
						</Button>
					</div>
				</form>

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
