import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getOrders = async () => {
	return await axiosInstance.get(`/order`);
};

type QueryFnType = typeof getOrders;

interface UseMenuAdditionsOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetMenuAdditionById = ({
	config,
	id,
}: UseMenuAdditionsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-additions', id],
		queryFn: async () => await getOrders(),
		...config,
	});
};
