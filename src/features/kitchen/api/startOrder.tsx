import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import {
	type StartOrderRequestBody,
	type StartOrder,
} from '../../kitchen/api/types';
import { toast } from 'react-toastify';

export const startOrder: StartOrder = async (body: StartOrderRequestBody) => {
	return await axiosInstance.post('/order/kitchen-queue-process', body);
};

type QueryFnType = typeof startOrder;

interface UseStartOrderOptions {
	config?: MutationConfig<QueryFnType>;
	refetch?: () => void;
}

export const useStartOrder = ({
	config = {},
	refetch,
}: UseStartOrderOptions) => {
	return useMutation({
		...config,
		mutationFn: startOrder,

		onSuccess: (res) => {
			toast.success('Order started');
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			refetch();
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
