import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetTables, type GetTablesParams } from './types';

export const getListCashier: GetTables = async (params) => {
	return await axiosInstance.get('/cashier', { params });
};

type QueryFnType = typeof getListCashier;

interface UseGetCashierOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetTablesParams;
}

export const useGetListCashiers = ({
	config,
	params,
}: UseGetCashierOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['cashiers', params],
		queryFn: async () => await getListCashier(params),
		...config,
	});
};
