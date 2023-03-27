import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
export interface AssignPackagePayload {
	supplierId: string;
	data: {
		packageId: string;
		startTrial?: boolean;
		startDate?: string;
	};
}

export const assignPackage = async ({
	supplierId,
	data,
}: AssignPackagePayload): Promise<any> => {
	return await axiosInstance.post(
		`/supplier/${supplierId}/assign-ackage`,
		data
	);
};

interface UseAssignPackageOptions {
	config?: MutationConfig<typeof assignPackage>;
}

export const useAssignPackage = ({ config }: UseAssignPackageOptions = {}) => {
	const navigate = useNavigate();
	return useMutation({
		...config,
		mutationFn: assignPackage,
		onSuccess: () => {
			toast.success('Package Added');
			navigate('/login');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
