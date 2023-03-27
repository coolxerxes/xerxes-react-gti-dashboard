import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetSupplier } from './types';

export const getSupplierSelf: GetSupplier = async () => {
	return await axiosInstance.get('/supplier/self');
};

type QueryFnType = typeof getSupplierSelf;

interface UseMenuItemsOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetSupplierSelf = ({ config }: UseMenuItemsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-supplier'],
		queryFn: getSupplierSelf,
		...config,
	});
};
