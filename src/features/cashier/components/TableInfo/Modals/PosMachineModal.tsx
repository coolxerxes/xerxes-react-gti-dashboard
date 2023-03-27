import Button from 'components/Button';
import Modal from 'components/Modal';
import { type FC } from 'react';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import { useTranslation } from 'react-i18next';


interface Props {
	isOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
}
export const PostMachineModal: FC<Props> = ({ isOpen, setIsModalOpen }) => {
	const { t, i18n } = useTranslation();
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div className='w-full flex flex-col text-[#272524]'>
				<div className='col-span-2 text-start text-[20px] font-dinBold text-center text-[#C02328]'>
				{t('cashier.posmachine')}
				</div>

				<div className=''>{t('cashier.animation')}</div>

				<div className='flex flex-col bg-[#A3C0480D] border-[#389E0D] border-[1px] mt-5 rounded-md'>
					<div className='text-[#389E0D] text-[25px] font-semibold flex justify-center mt-5'>
						100.00
					</div>
					<div className='flex justify-center mb-3 mt-2 font-semibold'>
					{t('order.total')}
					</div>
				</div>

				{/* <span className='mt-4  font-semibold'>
					The Link Will Be Updated On QR Code To Collect The Amount
				</span>

				<div className='grid grid-cols-2 gap-3'>
					<Button
						type='submit'
						variant='default'
						className='col-span-1 p-5 w-full border-[#ABA5A2] mt-5'
						onClick={setIsModalOpen}
					>
						Cancel
					</Button>

					<Button
						type='submit'
						className='col-span-1 p-5 w-full mt-5'
						onClick={(event) => {
							setIsModalOpen(event);
						}}
					>
						Confirm
					</Button>
				</div> */}

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
