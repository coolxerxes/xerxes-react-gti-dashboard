import { type Dispatch, type SetStateAction } from 'react';
import { type currentLogData } from '../api/interfaces';

export interface balanceInput {
	Balance: string | number | undefined;
	BalanceValue: string | number | undefined;
	setBalance: Dispatch<SetStateAction<string | number | undefined>>;
}
