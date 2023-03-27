import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type DeleteRestaurant } from './types';
import { toast } from 'react-toastify';

export const deleteRestaurant: DeleteRestaurant = async (id) => {
	return await axiosInstance.delete(`/restaurant/${id}`);
};

interface UseDeleteRestaurantOptions {
	config?: MutationConfig<typeof deleteRestaurant>;
}

export const useDeleteRestaurant = ({ config }: UseDeleteRestaurantOptions) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Branch Deleted successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: deleteRestaurant,
	});
};
