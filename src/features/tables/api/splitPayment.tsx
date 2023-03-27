import { useMutation } from 'react-query';
import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setTransaction } from 'redux/ordersReducer';

export const splitPayment: any = async ({ payload }: { payload: any }) => {
	return await axiosInstance.post(`/payments/split`, payload);
};

interface UseAddZone {
	config?: MutationConfig<typeof splitPayment>;
	toggleContinuePaymentModal?: () => void;
}

export const useSplitPayment = ({
	config,
	toggleContinuePaymentModal,
}: UseAddZone) => {
	const dispatch = useDispatch();
	return useMutation({
		onSuccess: (res) => {
			dispatch(setTransaction(res.data));
			toast.success('Payment splitted successfully');
			if (toggleContinuePaymentModal) {
				toggleContinuePaymentModal();
			}
		},
		onError: (error: any) => {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		},
		...config,
		mutationFn: splitPayment,
	});
};
