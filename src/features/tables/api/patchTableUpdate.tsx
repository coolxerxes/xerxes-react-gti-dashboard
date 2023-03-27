import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { useQuery } from 'react-query';

import { useMutation } from 'react-query';

import { toast } from 'react-toastify';

export const callWaiter = async ({
	data,
	tableId,
}: {
	data: any;
	tableId: string;
}) => {
	return await axiosInstance.patch(`/table/${tableId}/update-log`, data);
};

interface UseCallWaiterOptions {
	config?: MutationConfig<typeof callWaiter>;
}

export const useCallWaiter = ({ config }: UseCallWaiterOptions = {}) => {
	return useMutation({
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data.message}`);
		},
		onSuccess: () => {
			toast.success(`Waiter has been called`);
		},
		...config,
		mutationFn: callWaiter,
	});
};
