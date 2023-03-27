import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEnums } from 'utils/enumApi';
import { type GetEnumsParams } from 'utils/enumApi/types';

export const getEnumsMeAsync = createAsyncThunk(
	'enums/get',
	async (params: GetEnumsParams) => {
		return await getEnums(params);
	}
);
