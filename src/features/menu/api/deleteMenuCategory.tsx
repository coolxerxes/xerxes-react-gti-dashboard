import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type DeleteMenuCategoryById } from './types';
import { toast } from 'react-toastify';

export const deleteMenuCategoryById: DeleteMenuCategoryById = async (id) => {
	return await axiosInstance.delete(`/menu-category/${id}`);
};

interface DeleteMenuItem {
	config?: MutationConfig<typeof deleteMenuCategoryById>;
}

export const useDeleteMenuCategory = ({ config }: DeleteMenuItem) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Category Deleted');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: deleteMenuCategoryById,
	});
};
