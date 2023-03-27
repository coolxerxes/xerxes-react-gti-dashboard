import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PatchMenuCategoryById } from './types';
import { toast } from 'react-toastify';

export const updateMenuCategory: PatchMenuCategoryById = async ({
	_id,
	...data
}) => {
	return await axiosInstance.patch(`/menu-category/${_id as string}`, data);
};

interface UseUpdateMenuCategory {
	config?: MutationConfig<typeof updateMenuCategory>;
}

export const useUpdateMenuCategory = ({ config }: UseUpdateMenuCategory) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Category Updated');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: updateMenuCategory,
	});
};
