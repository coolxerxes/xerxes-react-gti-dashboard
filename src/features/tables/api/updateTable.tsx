import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';

export const updateTable: UpdateTableResponse = async ({
	tableId,
	payload,
}) => {
	return await axiosInstance.patch(`/table/${tableId}`, payload);
};

interface UseUpdateTable {
	config?: MutationConfig<typeof updateTable>;
}

export const useUpdateTable = ({ config }: UseUpdateTable) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Updated successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: updateTable,
	});
};
