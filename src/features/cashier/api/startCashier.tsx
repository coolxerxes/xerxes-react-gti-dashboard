import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import type { Order } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const startCahier: any = async (body: Order) => {
	return await axiosInstance.post('/cashier/start', body);
};

type QueryFnType = typeof startCahier;

interface UseStartCashierOptions {
	config?: MutationConfig<QueryFnType>;
	selectedCashier: string;
}

export const useStartCashier = ({
	config = {},
	selectedCashier,
}: UseStartCashierOptions) => {
	const navigate: any = useNavigate();

	const onSuccess = () => {
		navigate('/cashier', { state: { id: selectedCashier } });
	};
	return useMutation({
		...config,
		mutationFn: startCahier,
		onSuccess: onSuccess,
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
