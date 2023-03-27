import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';

export const getKitchenCalls: any = async () => {
	return await axiosInstance.get(`/order?chefRequestedClarification=true`);
};
type QueryFnType = typeof getKitchenCalls;

interface UseGetKitchenCalls {
	config?: QueryConfig<QueryFnType>;
}

export const useGetKitchenCalls = ({ config }: UseGetKitchenCalls) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-kitchen-calls'],
		queryFn: async () => getKitchenCalls(),
		...config,
	});
};
