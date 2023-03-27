import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetPaymentSetups } from './types';

export const getPaymentSetups: GetPaymentSetups = async () => {
	return await axiosInstance.get(`/payment-setup`);
};

type QueryFnType = typeof getPaymentSetups;

interface UseGetPaymentSetupsOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetPaymentSetups = ({ config }: UseGetPaymentSetupsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-payment-setups'],
		queryFn: getPaymentSetups,
		...config,
	});
};
