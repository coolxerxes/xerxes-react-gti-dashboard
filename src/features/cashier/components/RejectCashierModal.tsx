import CloseModalIcon from 'assets/icons/closeModalIcon';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStartCashier } from '../api/startCashier';

interface IRejectCashierModal {
	isOpen: boolean;
	setIsOpen: () => void;
	selectedCashier: string;
}
export const RejectCashierModal: FC<IRejectCashierModal> = ({
	isOpen,
	setIsOpen,
	selectedCashier,
}) => {
	const startCahiers = useStartCashier({ selectedCashier: selectedCashier });
	const { handleSubmit, register, getValues, reset } = useForm<any>({
		defaultValues: {
			openingBalance: 0,
		},
	});

	useEffect(() => {
		reset({
			openingBalance: 0,
		});
	}, []);

	const onSubmit = async () => {
		const { openingBalance } = getValues();

		await startCahiers.mutateAsync({
			cashierId: selectedCashier,
			openingBalance: +openingBalance,
		});
	};

	const onCancel = () => {
		setIsOpen();
	};

	return (
		<Modal
			isModalOpen={isOpen}
			setIsModalOpen={setIsOpen}
			className='w-[600px]'
		>
			<div
				onClick={() => {
					setIsOpen();
				}}
				className='absolute right-3 top-3 cursor-pointer'
			>
				<CloseModalIcon />
			</div>
			<div className='w-full'>
				<h3 className='font-bold text-[22px] font-dinBold mr-[10] text-[#c02328]'>
					Reject Money On Cashier
				</h3>
				<p className='text-[15px] text-[#272524] mt-2'>How Mach On Cashier</p>
				<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
					<div className='w-[100%]'>
						<Input
							register={register}
							name='openingBalance'
							className="w-full relative after:content-['SAR'] after:inline-block after:text-red-500 after:absolute after:top-0"
						/>
					</div>
					<div className='flex w-full justify-between gap-2'>
						<Button
							type='button'
							className='p-5 w-full mt-5'
							variant='complete'
							onClick={onCancel}
						>
							Cancel
						</Button>
						<Button type='submit' className='p-5 w-full mt-5'>
							Confirm
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};
