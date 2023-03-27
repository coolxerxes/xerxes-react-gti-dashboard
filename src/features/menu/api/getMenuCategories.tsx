import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuItemsParams, type GetMenuCategories } from './types';

export const getMenuCategories: GetMenuCategories = async (params) => {
	return await axiosInstance.get(`/menu-category`, {
		params: { ...params, pagination: false },
	});
};

type QueryFnType = typeof getMenuCategories;

interface UseMenuCategoriesOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetMenuItemsParams;
}

export const useGetMenuCategories = ({
	config,
	params,
}: UseMenuCategoriesOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-categories', params],
		queryFn: async () => await getMenuCategories(params),
		...config,
	});
};
