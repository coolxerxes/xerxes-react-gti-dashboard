import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type DeleteMenuAdditionById } from './types';
import { toast } from 'react-toastify';

export const deleteMenuAddition: DeleteMenuAdditionById = async (id) => {
	return await axiosInstance.delete(`/menu-addition/${id}`);
};

interface DeleteMenuAdditionOption {
	config?: MutationConfig<typeof deleteMenuAddition>;
}

export const useDeleteMenuAddition = ({ config }: DeleteMenuAdditionOption) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Addition Deleted');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: deleteMenuAddition,
	});
};
