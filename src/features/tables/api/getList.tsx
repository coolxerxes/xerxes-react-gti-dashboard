import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetList } from '../types';

export const getList: GetList = async () => {
	return await axiosInstance.get('/list');
};

type QueryFnType = typeof getList;

interface UseGetListOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetList = ({ config }: UseGetListOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-list'],
		queryFn: getList,
		...config,
	});
};
