import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import {
	type AddTableResponse,
	UpdateTablePayload,
	type UpdateTableResponse,
} from '../types';

export const addZone: AddTableResponse = async ({ payload }) => {
	return await axiosInstance.post(`/list`, payload);
};

interface UseAddZone {
	config?: MutationConfig<typeof addZone>;
}

export const useAddZone = ({ config }: UseAddZone) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Added successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: addZone,
	});
};
