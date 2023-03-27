import { type RootState } from 'redux/Store';
import { type STATUS } from 'types';
import { type Enum } from 'utils/enumApi/types';

export const selectEnumStatus = (state: RootState): STATUS =>
	state.resources.enum.status;

export const selectEnums = (state: RootState): Enum[] =>
	state.resources.enum.enums;
