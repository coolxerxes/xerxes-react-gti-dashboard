import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuItemsParams } from 'features/menu/api/types';
import { LIMIT_PER_PAGE } from 'config/constants';
import { useEffect, useState } from 'react';
import { type Package } from '../types';

export const getPackages = async (): Promise<Package[]> => {
	return await axiosInstance.get('/package');
};

type QueryFnType = typeof getPackages;

interface UseGetPackagesOptions {
	config?: QueryConfig<QueryFnType>;
}

export const useGetPackages = ({ config }: UseGetPackagesOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-packages'],
		queryFn: getPackages,
		...config,
	});
};
