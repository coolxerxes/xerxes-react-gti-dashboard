import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PostMenuCategory } from './types';
import { toast } from 'react-toastify';

const createMenuCategory: PostMenuCategory = async (payload) => {
	return await axiosInstance.post(`/menu-category`, payload);
};

interface UseCreateMenuCategory {
	config?: MutationConfig<typeof createMenuCategory>;
}

export const useCreateMenuCategory = ({
	config,
}: UseCreateMenuCategory = {}) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Category Created');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: createMenuCategory,
	});
};
