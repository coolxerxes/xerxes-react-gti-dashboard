import CloseModalIcon from 'assets/icons/closeModalIcon';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { type Props } from './type';

const Modal: React.FC<React.PropsWithChildren<Props>> = ({
	isModalOpen,
	setIsModalOpen,
	children,
	title,
	className,
}): JSX.Element => {
	return (
		<>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as='div'
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					className={`relative z-[9999999] ${className}`}
					onClose={() => {
						setIsModalOpen(false);
					}}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-50' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='z-[100] min-w-[528px]  w-full max-w-md transform overflow-hidden rounded-xl bg-white py-5 text-left align-middle shadow-xl transition-all relative'>
									<div className='flex grow items-start justify-between px-2.5 pb-3 '>
										<div className=' grow'>{children}</div>

										{/* <div
											onClick={() => {
												setIsModalOpen(false);
											}}
											className='cursor-pointer absolute right-[15px] '
										>
											<CloseModalIcon />
										</div> */}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Modal;
