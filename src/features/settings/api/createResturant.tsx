import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PostRestaurant } from './types';
import { toast } from 'react-toastify';

export const postRestaurant: PostRestaurant = async (data) => {
	return await axiosInstance.post('/restaurant', data);
};
interface UseCreateRestaurantOptions {
	config?: MutationConfig<typeof postRestaurant>;
}

export const useCreateRestaurant = ({ config }: UseCreateRestaurantOptions) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Branch Created successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: postRestaurant,
	});
};
