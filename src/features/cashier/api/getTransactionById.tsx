import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getTransactionById: any = async (id: string) => {
	return id ? await axiosInstance.get(`/transactions/${id}`) : null;
};

type QueryFnType = typeof getTransactionById;

interface UseMenuCategoryOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetTransactionById = ({
	config,
	id,
}: UseMenuCategoryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['transaction-single', id],
		queryFn: async () => getTransactionById(id),
		...config,
	});
};
