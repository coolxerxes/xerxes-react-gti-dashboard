import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetDashboard } from './types';

export const getDashbordData: GetDashboard = async (cashierId) => {
	return await axiosInstance
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		.get(`/cashier/${cashierId}/dashboard`)
		.then((res) => res.data);
};

type QueryFnType = typeof getDashbordData;

interface UseGetDashboardOptions {
	config?: QueryConfig<QueryFnType>;
	cashierId: string;
}

export const useGetCashierDashboard = ({
	config,
	cashierId,
}: UseGetDashboardOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['cashierDashboard', cashierId],
		queryFn: async () => await getDashbordData(cashierId),
		enabled: !!cashierId,
		...config,
	});
};
