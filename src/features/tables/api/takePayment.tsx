import { useMutation } from 'react-query';

import { toast } from 'react-toastify';
import { type MutationConfig } from 'config/react-query';
import { axiosInstance } from 'config/axios';
export const takePayment = async ({ data }: { data: any }): Promise<any> => {
	return await axiosInstance.post(`/payments/take-payment`, data);
};

interface UseTakePayment {
	config?: MutationConfig<typeof takePayment>;
	setIsModalOpen?: () => void;
	onSuccessSplitCashPayment?: () => void;
	setSuccessPaymentOpen?: () => void;
}

export const useTakePayment = ({
	config,
	setIsModalOpen,
	onSuccessSplitCashPayment,
	setSuccessPaymentOpen,
}: UseTakePayment = {}) => {
	return useMutation({
		onMutate: async (data) => {},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		onSuccess: (data) => {
			if (onSuccessSplitCashPayment && setSuccessPaymentOpen) {
				onSuccessSplitCashPayment();
				setSuccessPaymentOpen();
			}
			if (setIsModalOpen) {
				setIsModalOpen();
			}
			toast.success('Payment paid successfully');
		},
		...config,
		mutationFn: takePayment,
	});
};
