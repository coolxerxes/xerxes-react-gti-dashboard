import Button from 'components/Button';
import Modal from 'components/Modal';
import Textarea from 'components/Textarea';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { useCallWaiter } from '../api/callWaiter';

interface ICallWaiterModal {
	isOpen: boolean;
	activeOrder: string;
	setIsModalOpen: (value: boolean) => void;
}
export const CallWaiterModal: FC<ICallWaiterModal> = ({
	isOpen,
	activeOrder,
	setIsModalOpen,
}) => {
	const { handleSubmit, register, getValues } = useForm<any>({
		defaultValues: {
			comment: '',
		},
	});
	const callWaiter = useCallWaiter({ setIsModalOpen });

	const onCallWaiter = () => {
		const values = getValues();
		callWaiter
			.mutateAsync({
				id: activeOrder,
				chefRequestedClarification: true,
				comment: values.comment,
			})
			.catch((reason) => {
				// eslint-disable-next-line no-console
				console.log(reason, '-- error callWaiter');
			});
	};
	return (
		<Modal isModalOpen={isOpen} setIsModalOpen={setIsModalOpen}>
			<div>
				<h3 className='font-bold text-[22px] font-dinBold mr-[10] text-center'>
					Please write a comment to call the waiter
				</h3>

				<form onSubmit={handleSubmit(onCallWaiter)} className='p-5'>
					<Textarea name='comment' placeholder='Comment' register={register} />

					<Button type='submit' className='p-5 w-full mt-5'>
						Call The Waiter
					</Button>
				</form>
			</div>
		</Modal>
	);
};
