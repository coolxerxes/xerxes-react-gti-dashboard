import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuAdditionById } from './types';

export const getMenuAdditionById: GetMenuAdditionById = async (id) => {
	return await axiosInstance.get(`/menu-addition/${id}`);
};

type QueryFnType = typeof getMenuAdditionById;

interface UseMenuAdditionsOptions {
	config?: QueryConfig<QueryFnType>;
	id: string;
}

export const useGetMenuAdditionById = ({
	config,
	id,
}: UseMenuAdditionsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-additions', id],
		queryFn: async () => await getMenuAdditionById(id),
		...config,
	});
};
