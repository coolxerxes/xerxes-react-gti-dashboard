export interface currentLogData {
	_id: string;
	supplierId: string;
	cashierId: string;
	userId: string;
	startedAt: Date;
	closedAt: null;
	openingBalance: number;
	closingBalance: null;
	difference: null;
	overrideReason: null;
	transactions: [];
	overrideBy: null;
	pausedLogs: [];
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
