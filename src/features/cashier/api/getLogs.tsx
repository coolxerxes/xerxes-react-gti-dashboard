import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getCashierLogsById: any = async (id: string) => {
	return await axiosInstance.get(`/cashier/${id}/current-log`);
};

type QueryFnType = typeof getCashierLogsById;

interface UseMenuCategoryOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetCashierLogsById = ({
	config,
	id,
}: UseMenuCategoryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['cashier-logs', id],
		queryFn: async () => getCashierLogsById(id),
		...config,
	});
};
