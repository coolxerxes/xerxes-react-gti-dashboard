import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { UpdateTablePayload, type UpdateTableResponse } from '../types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const updateZone: any = async ({ listId, payload }) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.patch(`/list/${listId}`, payload);
};

interface UseUpdateZone {
	config?: MutationConfig<typeof updateZone>;
}

export const useUpdateZone = ({ config }: UseUpdateZone) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Updated successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: updateZone,
	});
};
