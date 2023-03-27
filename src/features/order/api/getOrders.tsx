import { axiosInstance } from 'config/axios';
import { useQuery } from 'react-query';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetMenuItemsParams } from 'features/menu/api/types';
import { LIMIT_PER_PAGE } from 'config/constants';
import { useEffect, useState } from 'react';

export const getOrders: any = async (params: { params: any }) => {
	return await axiosInstance.get('/order', {
		params: { limit: LIMIT_PER_PAGE, ...params },
	});
};

type QueryFnType = typeof getOrders;

interface UseGetListOptions {
	config?: QueryConfig<QueryFnType>;
	params?: GetMenuItemsParams;
}

export const useGetOrders = ({ config, params }: UseGetListOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-orders', params],
		// eslint-disable-next-line @typescript-eslint/return-await
		queryFn: async () => await getOrders(params),
		...config,
	});
};

export const useGetInfinteOrders = ({ config, params }: UseGetListOptions) => {
	const [data, setData] = useState<any>([]);
	const [page, setPage] = useState(1);

	const { ...rest } = useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['get-orders', { ...params }],
		enabled: false,
		// eslint-disable-next-line @typescript-eslint/return-await
		queryFn: async () => await getOrders({ ...params, page }),
		...config,
		// onSuccess(data) {
		// 	console.log('🚀 ~ file: getOrders.tsx:40 ~ onSuccess ~ data:', data);
		// 	setData((prev: any) => [...prev, ...data.data.docs]);
		// },
	});

	// const { ...rest } = useGetOrders({
	// 	config: {
	// 		...config,
	// 		enabled: false,
	// 	},
	// 	params: { ...params, page },
	// });

	useEffect(() => {
		console.log(
			'🚀 ~ file: getOrders.tsx:63 ~ useGetInfinteOrders ~ page:',
			page
		);

		// if (page === 1) return;
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		rest.refetch().then(({ data: newData }) => {
			console.log(
				'🚀 ~ file: getOrders.tsx:61 ~ rest.refetch ~ newData:',
				newData
			);

			setData(page === 1 ? newData.data.docs : [...data, ...newData.data.docs]);
		});
	}, [page]);

	const fetchMore = async () => {
		if (data.length < LIMIT_PER_PAGE || rest.isLoading || rest.isFetching)
			return;

		setPage((prev) => prev + 1);
		// await rest.refetch();
	};

	const refetch = async () => {
		setPage(1);
		setData([]);
		// await rest.refetch();
	};

	return {
		...rest,
		orders: data,
		fetchMore,
		refetch,
		hasNextPage: rest?.data?.data?.hasNextPage,
	};
};
