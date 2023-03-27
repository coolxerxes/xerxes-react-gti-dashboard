export interface List {
	_id: string;
	name: string;
	nameAr: string;
}

export interface GetListResponse {
	data: {
		docs: List[];
	};
	statusCode: number;
	timestamp: string;
}

export type GetList = () => Promise<GetListResponse>;

export type GetTableById = (tableId: string | undefined) => Promise<any>;

export interface UpdateTablePayload {
	restaurantId?: string;
	tableRegionId?: string;
	fees?: number;
	minimumOrderValue?: number;
	name?: string;
	nameAr?: string;
	totalChairs?: number;
	shape?: string;
}

export type UpdateTableResponse = (data: {
	tableId: string;
	payload: UpdateTablePayload;
}) => Promise<any>;
export type AddTableResponse = (data: { payload: any }) => Promise<any>;

export type DeleteTableResponse = (data: { tableId: string }) => Promise<any>;
