import { axiosInstance } from 'config/axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { type currentLogData } from './interfaces';

export const useGetCurrentLog = (cashierId: string) => {
	const [response, setResponse] = useState<currentLogData>();
	const getCurrentLog = async () => {
		await axiosInstance
			.get(`cashier/${cashierId}/current-log`)
			.then((res) => {
				setResponse(res?.data);
			})
			.catch((err) => toast(err.message));
	};
	useEffect(() => {
		void getCurrentLog();
	}, []);
	return { response };
};
