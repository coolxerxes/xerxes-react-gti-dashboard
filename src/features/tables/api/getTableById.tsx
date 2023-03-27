import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getTableById: any = async (tableId: string) => {
	if (tableId) {
		return await axiosInstance.get(`/table/${tableId}`);
	}
};
type QueryFnType = typeof getTableById;

interface UseGetTableById {
	tableId: string | undefined;
	config?: QueryConfig<QueryFnType>;
}

export const useGetTableById = ({ tableId, config }: UseGetTableById) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-table-by-id', tableId],
		queryFn: async () => getTableById(tableId),
		enabled: !!tableId,
		...config,
	});
};
