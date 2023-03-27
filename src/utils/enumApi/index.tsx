import { axiosInstance } from 'config/axios';
import { type GetEnums } from './types';

export const getEnums: GetEnums = async (params) => {
	return await axiosInstance.get('/enum', { params });
};
