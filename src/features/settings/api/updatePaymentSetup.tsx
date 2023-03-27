import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { type PatchPaymentSetup } from './types';
import { toast } from 'react-toastify';

export const patchPaymentSetup: PatchPaymentSetup = async ({ id, payload }) => {
	return await axiosInstance.patch(`/payment-setup/${id}`, payload);
};
interface UseUpdatePaymentSetupsOptions {
	config?: MutationConfig<typeof patchPaymentSetup>;
}

export const useUpdatePaymentSetups = ({
	config,
}: UseUpdatePaymentSetupsOptions) => {
	return useMutation({
		...config,
		onSuccess: (res) => {
			toast.success('Payment Updated');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
		mutationFn: patchPaymentSetup,
	});
};
