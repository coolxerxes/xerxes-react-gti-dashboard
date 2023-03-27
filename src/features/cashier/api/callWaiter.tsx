import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { toast } from 'react-toastify';
import { type CallWaiter } from 'features/kitchen/api/types';

export const callWaiter: CallWaiter = async (body: string) => {
	return await axiosInstance.post('', body);
};

type QueryFnType = typeof callWaiter;

interface UseStartOrderOptions {
	config?: MutationConfig<QueryFnType>;
	refetch: () => void;
}

export const useCallWaiter = ({
	config = {},
	refetch,
}: UseStartOrderOptions) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Waiter has been called');
			refetch();
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: callWaiter,
	});
};
