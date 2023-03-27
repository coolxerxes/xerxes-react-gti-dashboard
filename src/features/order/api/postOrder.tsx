import { useMutation } from 'react-query';

import { toast } from 'react-toastify';

import {
	type PostOrderPreviewPayload,
	type PostOrderPreviewResult,
} from '../types';

import { useDispatch } from 'react-redux';
import { resetItems } from '../slices/CartSlice';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
export const postOrder = async ({
	data,
}: {
	data: PostOrderPreviewPayload;
}): Promise<PostOrderPreviewResult> => {
	return await axiosInstance.post(`/order`, data);
};

interface UsePostOrder {
	config?: MutationConfig<typeof postOrder>;
}

export const usePostOrder = ({ config }: UsePostOrder = {}) => {
	const dispatch = useDispatch();
	return useMutation({
		onMutate: async (data) => {},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data.message}`);
		},
		onSuccess: (data) => {
			toast.success('Order Placed');
		},
		...config,
		mutationFn: postOrder,
	});
};
