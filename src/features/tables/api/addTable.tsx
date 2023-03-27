import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import {
	type AddTableResponse,
	UpdateTablePayload,
	type UpdateTableResponse,
} from '../types';

export const addTable: AddTableResponse = async ({ payload }) => {
	return await axiosInstance.post(`/table`, payload);
};

interface UseAddTable {
	config?: MutationConfig<typeof addTable>;
}

export const useAddTable = ({ config }: UseAddTable) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Added successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: addTable,
	});
};
