import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetTables, type GetTablesParams } from './types';

export const getInvoice: any = async (params: any) => {
	return await axiosInstance.get('/invoice', { params });
};

type QueryFnType = typeof getInvoice;

interface UseGetCashierOptions {
	config?: QueryConfig<QueryFnType>;
	params?: any;
}

export const useGetInvoice = ({ config, params }: UseGetCashierOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['invoice', params],
		queryFn: async () => getInvoice(params),
		...config,
	});
};
