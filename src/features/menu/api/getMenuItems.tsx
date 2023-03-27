import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuItems, type GetMenuItemsParams } from './types';

export const getMenuItems: GetMenuItems = async (params) => {
	return await axiosInstance.get('/menu-item', {
		params,
	});
};

type QueryFnType = typeof getMenuItems;

interface UseMenuItemsOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetMenuItemsParams;
}

export const useGetMenuItems = ({ config, params }: UseMenuItemsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-items', params],
		queryFn: async () => await getMenuItems(params),
		...config,
	});
};
