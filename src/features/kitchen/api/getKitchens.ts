import { useQuery } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type ExtractFnReturnType, type QueryConfig } from 'config/react-query';
import { type GetKitchens } from '../../cashier/api/types';

export const getKitchens: GetKitchens = async (id) => {
	return await axiosInstance.get(
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		`/kitchen-queue?restaurantId=${id}`
	);
};

type QueryFnType = typeof getKitchens;

interface UseGetKitchensOptions {
	config?: QueryConfig<QueryFnType>;
	id?: string | undefined;
}

export const useGetKitchens = ({ config, id }: UseGetKitchensOptions) => {
	return useQuery<ExtractFnReturnType<QueryFnType>>({
		queryKey: ['kitchens', id],
		queryFn: async () => await getKitchens(id),
		...config,
	});
};
