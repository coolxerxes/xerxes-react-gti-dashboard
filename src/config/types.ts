import { type AxiosResponse, type AxiosError } from 'axios';

export interface Error extends AxiosError {
	response: Response;
}

export interface Response extends AxiosResponse {
	data: {
		message: string | string;
	};
}
