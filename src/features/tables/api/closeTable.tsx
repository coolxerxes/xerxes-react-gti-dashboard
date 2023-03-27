import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const closeTable: any = async ({ tableId }: { tableId: any }) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(`/table/${tableId}/close-table`);
};

interface UseCloseTable {
	config?: MutationConfig<typeof closeTable>;
}

export const useCloseTable = ({ config }: UseCloseTable) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Table closed');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error?.response?.data?.message || error.message}`);
		},
		...config,
		mutationFn: closeTable,
	});
};
