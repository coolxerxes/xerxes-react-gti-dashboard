import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PatchMenuItemById } from './types';
import { toast } from 'react-toastify';

export const updateMenuItem: PatchMenuItemById = async ({ id, payload }) => {
	console.log(
		'🚀 ~ file: updateMenuItem.tsx:8 ~ constupdateMenuItem:PatchMenuItemById= ~ payload:',
		payload
	);
	return await axiosInstance.patch(`/menu-item/${id}`, payload);
};

interface UseUpdateMenuItem {
	config?: MutationConfig<typeof updateMenuItem>;
	noToast?: boolean;
}

export const useUpdateMenuItem = ({ config, noToast }: UseUpdateMenuItem) => {
	console.log(
		'🚀 ~ file: updateMenuItem.tsx:16 ~ useUpdateMenuItem ~ config:',
		config
	);
	return useMutation({
		...(config ?? {}),

		onSuccess: (res) => {
			console.log(
				'🚀 ~ file: updateMenuItem.tsx:28 ~ useUpdateMenuItem ~ res:',
				res
			);
			!noToast && toast.success('Menu Item Updated');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: updateMenuItem,
	});
};
