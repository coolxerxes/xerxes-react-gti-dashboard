import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PostMenuItem } from './types';
import { toast } from 'react-toastify';

const createMenuItem: PostMenuItem = async (payload) => {
	return await axiosInstance.post(`/menu-item`, payload);
};

interface UseCreateMenuItem {
	config?: MutationConfig<typeof createMenuItem>;
}

export const useCreateMenuItem = ({ config }: UseCreateMenuItem = {}) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Item Created');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: createMenuItem,
	});
};
