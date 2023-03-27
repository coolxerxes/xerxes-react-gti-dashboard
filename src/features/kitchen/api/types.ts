import { type AxiosPromise } from 'axios';
import { type CallWaiterBody } from './callWaiter';

export type StartOrder = (body: StartOrderRequestBody) => AxiosPromise<void>;
export interface StartOrderRequestBody {
	orderId: string;
	orderItemId?: string;
	preparationStatus: string;
}

export type CallWaiter = (id: CallWaiterBody | any) => AxiosPromise<void>;

export type ChangeItemStatus = (
	body: StartOrderRequestBody
) => AxiosPromise<void>;
