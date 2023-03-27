import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PatchMenuAdditionById } from './types';
import { toast } from 'react-toastify';

export const patchMenuAddition: PatchMenuAdditionById = async ({
	id,
	payload,
}) => {
	return await axiosInstance.patch(`/menu-addition/${id}`, payload);
};
interface UseUpdateAddition {
	config?: MutationConfig<typeof patchMenuAddition>;
}

export const useUpdateAddition = ({ config }: UseUpdateAddition) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Menu Addition Updated');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: patchMenuAddition,
	});
};
