import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const updateOrder: any = async ({ orderId, payload }: any) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(`/order/${orderId}`, payload);
};

interface UseUpdateOrder {
	config?: MutationConfig<typeof updateOrder>;
}

export const useUpdateOrder = ({ config }: UseUpdateOrder) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Updated successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: updateOrder,
	});
};
