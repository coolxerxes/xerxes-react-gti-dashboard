import { useCallback, useEffect } from 'react';
import { getProfileMeAsync, signOut } from '../features/auth/stores/actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	selectUser,
	selectIsLoggedIn,
	selectAuthStatus,
} from '../features/auth/stores/selectors';
import { type AuthState } from '../features/auth/stores/types';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from '../routes/constants';
import { axiosInstance } from 'config/axios';
import { getEnumsMeAsync } from 'stores/thunk';
import { type GetEnumsParams } from 'utils/enumApi/types';
import { type EnumState } from 'stores/types';
import { selectEnumStatus, selectEnums } from 'stores/selectors';
// import { getToken } from 'utils/cacheService';
import { useEffectOnce } from '../utils/useEffectOnce';
import { getToken, rmCache } from 'utils/cacheService';
import { getProfileMe } from 'features/auth/api';
import { TOKEN } from 'config/constants';

export const useProfileMe = (): void => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { status } = useAuthSelector();
	const token = getToken();
	const signOut = useSignOut();

	useEffectOnce(() => {
		if (token) {
			getProfileMe()
				.then((res) => {})
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.error(err);
					rmCache(TOKEN);
					dispatch(signOut());
					navigate('/login');
				});
		}
	}, [dispatch, token]);

	useEffect(() => {
		if (status === 'FAILED') {
			navigate(ADMIN.PATHS.LOGIN);
		}
	}, [status, navigate]);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetEnums = () => {
	const dispatch = useAppDispatch();
	return useCallback(
		(params: GetEnumsParams) => {
			void dispatch(getEnumsMeAsync(params));
		},
		[dispatch]
	);
};

export const useSignOut = (): any => {
	const dispatch = useAppDispatch();

	return useCallback(() => {
		dispatch(signOut());
	}, [dispatch]);
};

export const useAuthSelector = (): AuthState => {
	return useAppSelector((state) => {
		return {
			user: selectUser(state),
			isLogin: selectIsLoggedIn(state),
			status: selectAuthStatus(state),
		};
	});
};

export const useEnumSelector = (): EnumState => {
	return useAppSelector((state) => {
		return {
			status: selectEnumStatus(state),
			enums: selectEnums(state),
		};
	});
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUploadFile = () => {
	const upload = async (images: any[]): Promise<string[]> => {
		const formData = new FormData();
		images.forEach((file) => {
			formData.append('files', file);
		});
		formData.append('type', 'Images');
		const response = await axiosInstance.post(
			'/file-uploader/images',
			formData
		);
		return response.data;
	};
	const uploadImage = async (image: any): Promise<string | undefined> => {
		return (await upload([image]))[0];
	};

	return {
		uploadImage,
	};
};
