import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuCategoryById } from './types';

export const getMenuCategoryById: GetMenuCategoryById = async (id) => {
	return await axiosInstance.get(`/menu-category/${id}`);
};

type QueryFnType = typeof getMenuCategoryById;

interface UseMenuCategoryOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetMenuCategoryById = ({
	config,
	id,
}: UseMenuCategoryOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-category', id],
		queryFn: async () => await getMenuCategoryById(id),
		...config,
	});
};
