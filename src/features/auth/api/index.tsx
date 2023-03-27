import { axiosInstance } from '../../../config/axios';
import { type GetProfileMe, type PostLogin } from './types';

export const postLogin: PostLogin = async (data) => {
	return await axiosInstance.post('/auth/login', data);
};

export const getProfileMe: GetProfileMe = async () => {
	return await axiosInstance.get('/profile/me');
};
