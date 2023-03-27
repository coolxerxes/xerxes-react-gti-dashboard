import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { type DeleteTableResponse } from '../types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const deleteZone: any = async ({ listId }) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return await axiosInstance.delete(`/list/${listId}`);
};

interface UseDeleteZone {
	config?: MutationConfig<typeof deleteZone>;
}

export const useDeleteZone = ({ config }: UseDeleteZone) => {
	return useMutation({
		onSuccess: () => {
			toast.success('Deleted successfully');
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: deleteZone,
	});
};
