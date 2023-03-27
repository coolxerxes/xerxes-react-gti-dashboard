import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { type DeleteTableResponse } from '../types';

export const deleteTable: DeleteTableResponse = async ({ tableId }) => {
	return await axiosInstance.delete(`/table/${tableId}`);
};

interface UseDeleteTable {
	config?: MutationConfig<typeof deleteTable>;
}

export const useDeleteTable = ({ config }: UseDeleteTable) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Deleted successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: deleteTable,
	});
};
