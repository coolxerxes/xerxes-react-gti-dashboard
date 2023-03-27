import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetSupplier } from './types';

export const getSupplier: GetSupplier = async () => {
	return await axiosInstance.get('/supplier');
};

type QueryFnType = typeof getSupplier;

interface UsegetSupplierOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetSupplier = ({ config }: UsegetSupplierOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-suppliers'],
		queryFn: getSupplier,
		...config,
	});
};
