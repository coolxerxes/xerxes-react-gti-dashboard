import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_URL, TOKEN } from './constants';
import { type Error } from './types';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const axiosInstance = axios.create({
	baseURL: API_ENDPOINT || BASE_URL,
});

axiosInstance.interceptors.request.use(
	function (request) {
		const accessToken = localStorage.getItem(TOKEN);

		if (accessToken != null && request?.headers) {
			request.headers.Authorization = `Bearer ${accessToken}`;
		}
		return request;
	},
	async function (error) {
		return await Promise.reject(error);
	}
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleToastErrors = (error: Error) => {
	if (error?.response?.data?.message) {
		Array.isArray(error?.response?.data?.message)
			? error?.response?.data?.message.map((msg) => {
					return toast.error(msg);
			  })
			: toast.error(error?.response?.data?.message || error.message);

		return error?.response.data?.message;
	}
};

axiosInstance.interceptors.response.use(
	function (response) {
		return response.data;
	},
	async function (error) {
		handleToastErrors(error);
		return await Promise.reject(error);
	}
);
