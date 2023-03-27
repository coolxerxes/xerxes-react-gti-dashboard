import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type Order, type GetTable, type GetTableParams } from './types';

export interface GetOrderResponse {
	data: {
		docs: Order;
	};
}

interface GetOrdersParams {
	id: string | undefined;
}
type GetOrder = (id?: GetOrdersParams | any) => Promise<GetOrderResponse>;

export const getOrderById: GetOrder = async (id) => {
	console.log(
		'🚀 ~ file: getOrderById.tsx:18 ~ constgetOrderById:GetOrder= ~ id:',
		id
	);
	return id
		? await axiosInstance
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				.get(`/order/${id}`)
				.then((res) => res.data)
		: null;
};

type QueryFnType = typeof getOrderById;

interface UseGetTableOptions {
	config?: QueryConfig<QueryFnType> | any;
	id: string | undefined;
}

export const useGetOrderById = ({ config, id }: UseGetTableOptions) => {
	console.log('🚀 ~ file: getOrderById.tsx:42 ~ useGetOrderById ~ !!id:', !!id);

	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['orderById', id],
		queryFn: async () => await getOrderById(id),
		enabled: !!id,
		...config,
	});
};
