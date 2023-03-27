import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuAdditions } from './types';

export const getMenuAdditions: GetMenuAdditions = async () => {
	return await axiosInstance.get('/menu-addition');
};

type QueryFnType = typeof getMenuAdditions;

interface UseMenuAdditionsOptions {
	config?: QueryConfig<QueryFnType>;
	id?: string;
}

export const useGetMenuAdditions = ({
	config,
	id,
}: UseMenuAdditionsOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['menu-additions', id],
		queryFn: getMenuAdditions,
		...config,
	});
};
