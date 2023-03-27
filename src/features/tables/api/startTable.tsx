import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const startTable: any = async ({ tableId }: { tableId: any }) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(`/table/${tableId}/start-table`);
};

interface UseStartTable {
	config?: MutationConfig<typeof startTable>;
}

export const useStartTable = ({ config }: UseStartTable) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Table started');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: startTable,
	});
};
