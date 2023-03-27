import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type DeleteMenuItemById } from './types';
import { toast } from 'react-toastify';

export const deleteMenuItemById: DeleteMenuItemById = async (id) => {
	return await axiosInstance.delete(`/menu-item/${id}`);
};

interface DeleteMenuItem {
	config?: MutationConfig<typeof deleteMenuItemById>;
}

export const useDeleteMenuItem = ({ config }: DeleteMenuItem) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Item Deleted');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: deleteMenuItemById,
	});
};
