import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const orderCancel: any = async ({ orderId }: any) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		`/order/${orderId}/cancel`
	);
};

interface UseOrderCancel {
	config?: MutationConfig<typeof orderCancel>;
}

export const useOrderCancel = ({ config }: UseOrderCancel) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Order cancelled');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: orderCancel,
	});
};
