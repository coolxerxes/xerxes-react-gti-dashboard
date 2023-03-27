import { axiosInstance } from 'config/axios';
import { type MutationConfig } from 'config/react-query';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
export interface RegisterDTO {
	data: {
		supplier: {
			alias: string;
			name: string;
			nameAr?: string;
			about?: string;
			aboutAr?: string;
			email: string;
			phoneNumber?: string;
			vatNumber?: string;
			twitter?: string;
			instagram?: string;
			snapchat?: string;
			tiktok?: string;
			whatsapp?: string;
			domain?: string;
			taxEnabled?: boolean;
			taxRate?: number;
			reservationFee?: number;
		};
		email: string;
		password: string;
		name: string;
		phoneNumber?: string;
		whatsappNumber?: string;
	};
}

export const register = async ({ data }: RegisterDTO): Promise<any> => {
	return await axiosInstance.post('/auth/signup', data);
};

interface UseRegisterOptions {
	config?: MutationConfig<typeof register>;
}

export const useRegister = ({ config }: UseRegisterOptions = {}) => {
	const navigate = useNavigate();
	return useMutation({
		...config,
		mutationFn: register,
		onSuccess: () => {
			toast.success('Supplier Created');
			navigate('/assign-package');
		},
		onError: (err) => {
			toast.error(`${err.message}`);
		},
	});
};
