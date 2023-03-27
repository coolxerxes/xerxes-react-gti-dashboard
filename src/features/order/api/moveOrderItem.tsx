import { useMutation } from 'react-query';

import { toast } from 'react-toastify';

import {
	type PostOrderPreviewPayload,
	type PostOrderPreviewResult,
} from '../types';

import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
export const moveOrderItem = async ({ data }: { data: any }): Promise<any> => {
	return await axiosInstance.post(`/order/move-items`, data);
};

interface UseMoveOrderItem {
	config?: MutationConfig<typeof moveOrderItem>;
}

export const useMoveOrderItem = ({ config }: UseMoveOrderItem = {}) => {
	return useMutation({
		onMutate: async (data) => {},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data.message}`);
		},
		onSuccess: (data) => {
			toast.success('Item moved');
		},
		...config,
		mutationFn: moveOrderItem,
	});
};
