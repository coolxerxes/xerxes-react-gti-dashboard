import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type {
	ChangeItemStatus,
	StartOrderRequestBody,
} from '../../kitchen/api/types';
import { toast } from 'react-toastify';

export const changeItemStatus: ChangeItemStatus = async (
	body: StartOrderRequestBody
) => {
	return await axiosInstance.post('/order/kitchen-queue-process', body);
};

type QueryFnType = typeof changeItemStatus;

interface UseStartOrderOptions {
	config?: MutationConfig<QueryFnType>;
	refetch: () => void;
}

export const useChangeItemStatus = ({
	config = {},
	refetch,
}: UseStartOrderOptions) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Item Status changed');
			refetch();
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: changeItemStatus,
	});
};
