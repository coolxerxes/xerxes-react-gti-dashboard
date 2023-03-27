import { type ENUM_TYPE } from 'types';

export interface Value {
	key: string;
	en: string;
	ar: string;
}

export interface Enum {
	name: ENUM_TYPE;
	values: Value[];
}

export interface EnumResponse {
	data: Enum[];
}

export interface GetEnumsParams {
	enums: ENUM_TYPE;
}

export type GetEnums = (params: GetEnumsParams) => Promise<EnumResponse>;
