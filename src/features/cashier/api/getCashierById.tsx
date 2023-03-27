import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getCashierById: any = async (id: string) => {
	return await axiosInstance.get(`/cashier/${id}`);
};

type QueryFnType = typeof getCashierById;

interface UseMenuCategoryOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetCashieById = ({ config, id }: UseMenuCategoryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['cashier-single', id],
		queryFn: async () => getCashierById(id),
		...config,
	});
};
