import { useQuery } from 'react-query';

import { toast } from 'react-toastify';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { axiosInstance } from 'config/axios';

export const searchCustomer = async ({
	phoneNumber,
}: {
	phoneNumber: string;
}): Promise<any> => {
	return await axiosInstance.get(`/customer`, {
		params: {
			phoneNumber,
		},
	});
};

type QueryFnType = typeof searchCustomer;

interface UseSearchByCodeOptions {
	config?: QueryConfig<QueryFnType>;
	phoneNumber: string;
}

export const useSearchCusomter = ({
	config,
	phoneNumber,
}: UseSearchByCodeOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['search-customer', phoneNumber],
		queryFn: async () => await searchCustomer({ phoneNumber }),
		onError: (error: any) => {
			toast.error(
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				`${error?.response?.data.message}`
			);
		},
		...config,
	});
};
