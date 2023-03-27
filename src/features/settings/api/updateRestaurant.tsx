import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PutRestaurant } from './types';
import { toast } from 'react-toastify';

export const patchRestaurant: PutRestaurant = async ({ id, payload }) => {
	return await axiosInstance.patch(`/restaurant/${id}`, payload);
};

interface UseUpdateMenuItem {
	config?: MutationConfig<typeof patchRestaurant>;
}

export const useUpdateRestaurant = ({ config }: UseUpdateMenuItem) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Updated successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: patchRestaurant,
	});
};
