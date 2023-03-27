import Button from 'components/Button';
import Modal from 'components/Modal';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';


interface Props {
	isOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	setCashOpen: (value: boolean) => void;
	setQrOpen: (value: boolean) => void;
	setPosMachineOpen: (value: boolean) => void;
	amount: any;
	totalWithPay: any;
	ordinal: string | any;
}
export const ContinuePaymentModal = ({
	isOpen,
	setIsModalOpen,
	setCashOpen,
	setQrOpen,
	setPosMachineOpen,
	amount,
	totalWithPay,
	ordinal,
}: Props) => {
	const { t, i18n } = useTranslation();
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524]'>
				<div className='col-span-2 text-start text-[20px] font-dinBold text-center text-[#C02328]'>
				{t('cashier.pay')} {ordinal} {t('cashier.amount')}
				</div>

				<div className='flex flex-col bg-[#A3C0480D] border-[#389E0D] border-[1px] mt-5 rounded-md'>
					<div className='text-[#389E0D] text-[25px] font-semibold flex justify-center mt-5'>
						{totalWithPay / amount}
					</div>
					<div className='flex justify-center mb-3 mt-2 font-semibold'>
					{t('cashier.amountfor')} {ordinal} {t('cashier.pay')}
					</div>
				</div>

				<span className='mt-4  font-semibold'>{t('cashier.paymentmethod')}</span>

				<div className='flex justify-center flex-col gap-2 mt-3'>
					<Button
						height={50}
						onClick={() => {
							setCashOpen(true);
							setIsModalOpen(true);
						}}
					>
						{t('cashier.cash')}
					</Button>

					<Button
						height={50}
						onClick={() => {
							setQrOpen(true);
							setIsModalOpen(false);
						}}
					>
						{t('cashier.qrcode')}
					</Button>

					<Button
						height={50}
						onClick={() => {
							setPosMachineOpen(true);
							setIsModalOpen(false);
						}}
					>
						{t('cashier.posmachine')}
					</Button>

					<Button height={50}>{t('cashier.loyalitypoints')}</Button>
				</div>

				<Button
					height={50}
					variant='default'
					className='col-span-1 p-5 w-full border-[#ABA5A2] mt-6'
				>
					{t('cashier.lastsuccess')}
				</Button>

				<div
					onClick={() => {
						setIsModalOpen(false);
					}}
					className='absolute right-3 top-3 cursor-pointer'
				></div>
			</div>
		</Modal>
	);
};
