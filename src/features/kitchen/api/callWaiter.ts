import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type { CallWaiter } from './types';
import { toast } from 'react-toastify';

export interface CallWaiterBody {
	id: string;
	chefRequestedClarification: boolean;
	comment: string;
}

export const callWaiter: CallWaiter = async ({
	id,
	chefRequestedClarification,
	comment,
}: CallWaiterBody) => {
	return await axiosInstance.patch(`/order/${id}/add-chef-inquiry-comment`, {
		comment,
		chefRequestedClarification,
	});
};

type QueryFnType = typeof callWaiter;

interface UseCallWaiterOptions {
	config?: MutationConfig<QueryFnType>;
	setIsModalOpen: (value: boolean) => void;
	noToast?: boolean;
}

export const useCallWaiter = ({
	config,
	setIsModalOpen,
	noToast,
}: UseCallWaiterOptions) => {
	const onSuccess = (): void => {
		!noToast && toast.success('Waiter was called successfully');
		setIsModalOpen(false);
	};

	return useMutation({
		...config,
		onSuccess,
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: callWaiter,
	});
};
