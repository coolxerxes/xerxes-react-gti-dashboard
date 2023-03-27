import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuItemById } from './types';

export const getMenuItemById: GetMenuItemById = async (id) => {
	return await axiosInstance.get(`/menu-item/${id}`);
};

type QueryFnType = typeof getMenuItemById;

interface UseMenuItemsOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetMenuItemById = ({ config, id }: UseMenuItemsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-items', id],
		queryFn: async () => await getMenuItemById(id),
		...config,
	});
};
