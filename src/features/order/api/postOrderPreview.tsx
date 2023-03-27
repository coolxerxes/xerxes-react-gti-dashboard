import { useQuery } from 'react-query';

import { useMutation } from 'react-query';

import { toast } from 'react-toastify';

import {
	type PostOrderPreviewPayload,
	type PostOrderPreviewResult,
} from '../types';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { setCart } from '../slices/CartSlice';
export const postOrderPreview = async ({
	data,
}: {
	data: PostOrderPreviewPayload;
}): Promise<PostOrderPreviewResult> => {
	return await axiosInstance.post(`/order/preview`, data);
};

interface UsePostOrderPreview {
	config?: MutationConfig<typeof postOrderPreview>;
}

export const usePostOrderPreview = ({ config }: UsePostOrderPreview = {}) => {
	const dispatch = useDispatch();
	return useMutation({
		onMutate: async (data) => {},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data.message}`);
		},
		onSuccess: (data) => {},
		...config,
		mutationFn: postOrderPreview,
	});
};
