import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetOrders, type GetOrdersParams } from '../../cashier/api/types';

export const getOrders: GetOrders = async (params) => {
	return await axiosInstance.get(
		'/order?status=Sent To Kitchen,Started Preparing&pagination=false',
		{ params }
	);
};

type QueryFnType = typeof getOrders;

interface UseGetOrderOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetOrdersParams;
	skip?: boolean;
	// params?: any;
}

export const useGetOrders = ({ config, params, skip }: UseGetOrderOptions) => {
	const token = localStorage.token;
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['orders', params],
		queryFn: async () => await getOrders(params),
		...config,
		enabled: !!token && !skip,
	});
};
