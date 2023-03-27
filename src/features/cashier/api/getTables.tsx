import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetTables, type GetTablesParams } from './types';

export const getTables: GetTables = async (params) => {
	return await axiosInstance.get('/table', { params });
};

type QueryFnType = typeof getTables;

interface UseGetOrderOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetTablesParams;
}

export const useGetTables = ({ config, params }: UseGetOrderOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['tables', params],
		queryFn: async () => await getTables(params),
		...config,
	});
};
