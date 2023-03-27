import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetPaymentSetupById } from './types';

export const getPaymentSetupById: GetPaymentSetupById = async (id) => {
	return await axiosInstance.get(`/payment-setup/${id}`);
};
type QueryFnType = typeof getPaymentSetupById;

interface UseGetPaymentSetupByIdOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetPaymentSetupById = ({
	config,
	id,
}: UseGetPaymentSetupByIdOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-payment-setup', id],
		queryFn: async () => await getPaymentSetupById(id),
		...config,
	});
};
