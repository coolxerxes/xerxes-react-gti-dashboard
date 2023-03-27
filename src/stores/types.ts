import { type STATUS } from 'types';
import { type Enum } from 'utils/enumApi/types';

export interface EnumState {
	enums: Enum[];
	status: STATUS;
}
