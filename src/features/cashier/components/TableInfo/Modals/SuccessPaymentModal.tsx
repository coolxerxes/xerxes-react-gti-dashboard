import Button from 'components/Button';
import Modal from 'components/Modal';
import Textarea from 'components/Textarea';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import SimpleTag from 'components/Tag/SimpleTag';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import Lottie from 'react-lottie-player';
import lottieJson from '../../../../../assets/success.json';
import { useTranslation } from 'react-i18next';

interface Props {
	isOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	transactions: any;
	toggleContinuePaymentModal: () => void;
	totalAmount: number;
	amount: number;
	ordinal: string | any;
}
export const SuccessPaymentModal = ({
	isOpen,
	setIsModalOpen,
	transactions,
	toggleContinuePaymentModal,
	totalAmount,
	amount,
	ordinal,
}: Props) => {
	const { t, i18n } = useTranslation();
	const handlerNextPay = () => {
		setIsModalOpen(false);
		toggleContinuePaymentModal();
	};
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524]'>
				<div className='flex flex-col bg-[#A3C0480D] border-[#389E0D] border-[1px] mt-5 rounded-md'>
					<div className='text-[#389E0D] text-[25px] font-semibold flex justify-center mt-5'>
						{amount === 0 ? totalAmount : totalAmount / amount}
					</div>
					{amount !== 0 && (
						<div className='flex justify-center mb-3 mt-2 font-semibold'>
							{t('cashier.amountfor')} {ordinal} {t('cashier.pay')}
						</div>
					)}
				</div>

				<div className='flex justify-center'>
					<Lottie
						loop
						animationData={lottieJson}
						play
						style={{ width: 200, height: 200 }}
					/>
				</div>

				<p className='text-[#389E0D] text-[20px] font-dinBold flex justify-center'>
				{t('cashier.paymentsuccessfully')}
				</p>

				<div className='flex gap-2'>
					<Button
						height={50}
						variant='default'
						className='col-span-1 p-5 w-full !text-[#393230] border-[#ABA5A2] mt-6'
					>
						{t('cashier.wantreceipt')} ?
					</Button>
					{transactions.length > 0 && (
						<Button
							height={50}
							variant='primary'
							className='col-span-1 p-5 w-full !text-[#ffffff] border-[#ABA5A2] mt-6'
							onClick={handlerNextPay}
						>
							{t('cashier.nextpay')}
						</Button>
					)}
				</div>
				<div
					onClick={() => {
						setIsModalOpen(false);
					}}
					className='absolute right-1 top-1 cursor-pointer'
				>
					<CloseModalIcon />
				</div>
			</div>
		</Modal>
	);
};
