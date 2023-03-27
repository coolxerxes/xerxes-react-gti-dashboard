import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type { Order } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const createInvoice: any = async (body: any) => {
	return await axiosInstance.post('/invoice', body);
};

type QueryFnType = typeof createInvoice;

interface UseCreateInvoiceOptions {
	config?: MutationConfig<QueryFnType>;
}

export const useCreateInvoice = ({ config = {} }: UseCreateInvoiceOptions) => {
	return useMutation({
		...config,
		mutationFn: createInvoice,
		onSuccess: () => {},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
