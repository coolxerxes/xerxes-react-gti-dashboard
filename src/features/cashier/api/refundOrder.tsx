import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type { Order } from './types';
import { toast } from 'react-toastify';

export const refundOrder: any = async (body: Order) => {
	return await axiosInstance.post('/payments/refund', body);
};

type QueryFnType = typeof refundOrder;

interface UseStartCashierOptions {
	config?: MutationConfig<QueryFnType>;
	closeModal: (value: boolean) => void;
}

export const useRefundOrder = ({
	config = {},
	closeModal,
}: UseStartCashierOptions) => {
	const onSuccess = () => {
		toast.success('Order Refunded');
		closeModal(false);
	};
	return useMutation({
		...config,
		mutationFn: refundOrder,
		onSuccess,
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
