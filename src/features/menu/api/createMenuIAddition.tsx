import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PostMenuAddition } from './types';
import { toast } from 'react-toastify';

export const postMenuAddition: PostMenuAddition = async (payload) => {
	return await axiosInstance.post(`/menu-addition`, payload);
};

interface UseCreateMenuAdditionOptions {
	config?: MutationConfig<typeof postMenuAddition>;
}

export const useCreateMenuAddition = ({
	config,
}: UseCreateMenuAdditionOptions = {}) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Addition Created');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: postMenuAddition,
	});
};
