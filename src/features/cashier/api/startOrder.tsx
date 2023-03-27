import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type { Order } from './types';
import { toast } from 'react-toastify';

export const startOrder: any = async (body: Order) => {
	return await axiosInstance.post('/order/kitchen-queue-process', body);
};

type QueryFnType = typeof startOrder;

interface UseStartOrderOptions {
	config?: MutationConfig<QueryFnType>;
	refetch: () => void;
}

export const useStartOrder = ({
	config = {},
	refetch,
}: UseStartOrderOptions) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Order Started');
			refetch();
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: startOrder,
	});
};
