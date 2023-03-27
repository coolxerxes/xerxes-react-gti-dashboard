import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetRestaurants } from './types';

export const getRestaurants: GetRestaurants = async () => {
	return await axiosInstance.get('/restaurant');
};

type QueryFnType = typeof getRestaurants;

interface UseGetRestaurantOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetRestaurants = ({ config }: UseGetRestaurantOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-restaurants'],
		queryFn: getRestaurants,
		...config,
	});
};
