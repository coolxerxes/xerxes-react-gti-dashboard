import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const createCustomer = async ({ data }: { data: any }): Promise<any> => {
	return await axiosInstance.post(`/customer`, data);
};

interface UseCreateCustomer {
	config?: MutationConfig<typeof createCustomer>;
}

export const useCreateCustomer = ({ config }: UseCreateCustomer = {}) => {
	return useMutation({
		onMutate: async (data) => {},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data.message}`);
		},
		onSuccess: (data) => {},
		...config,
		mutationFn: createCustomer,
	});
};
