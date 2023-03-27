import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PutSupplier } from './types';
import { toast } from 'react-toastify';

export const putSupplier: PutSupplier = async (data) => {
	return await axiosInstance.put('/supplier/self-update', data);
};

interface UseUpdateMenuItem {
	config?: MutationConfig<typeof putSupplier>;
}

export const useUpdateSupplier = ({ config }: UseUpdateMenuItem) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Updated');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: putSupplier,
	});
};
