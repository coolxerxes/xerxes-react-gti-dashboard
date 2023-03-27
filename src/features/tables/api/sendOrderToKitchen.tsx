import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const sendOrderToKitchen: any = async ({ orderId }: any) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		`/order/${orderId}/sent-to-kitchen`
	);
};

interface UseSendOrderToKitchen {
	config?: MutationConfig<typeof sendOrderToKitchen>;
}

export const useSendOrderToKitchen = ({ config }: UseSendOrderToKitchen) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Order sent to kitchen');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: sendOrderToKitchen,
	});
};
