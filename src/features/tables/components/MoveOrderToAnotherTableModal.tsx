import React, {
	useState,
	type Dispatch,
	type SetStateAction,
	useEffect,
} from 'react';
import { useUpdateTable } from '../api/updateTable';
import Input from 'components/Input';
import Select from 'components/Select';
import Modal from 'components/Modal';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { type GetTablesResponse } from 'features/cashier/api/types';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import { useGetList } from '../api/getList';
import { useSplitPayment } from '../api/splitPayment';
import { useGetTables } from 'features/cashier/api/getTables';
import { useUpdateOrder } from '../api/updateOrder';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTable: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	tableData: any;
	// checkedOrder: any;
	checkedOrders: any;
}
const MoveOrderToAnotherTableModal = ({
	isModalOpen,
	setIsModalOpen,
	tableData,
	refetchTable,
	// checkedOrder,
	checkedOrders,
}: Props) => {
	const { t, i18n } = useTranslation();
	const { register, handleSubmit, reset, watch, getValues } = useForm();
	const [table, setTable] = useState('');

	const {
		data: tableDataList,
		isLoading: isTableLoading,
		refetch: refetchTables,
	} = useGetTables({});

	const updateOrderMutation = useUpdateOrder({});

	const handleMoveOrderToAnotherTable = async (data: any) => {
		if (table === '') {
			toast.error('Please choose at least one table');
		} else {
			checkedOrders?.forEach(async (order: any) => {
				await updateOrderMutation
					.mutateAsync({
						orderId: order?._id,
						payload: {
							tableId: table,
						},
					})
					.then(async (res) => {
						await refetchTable();
					});
			});

			setIsModalOpen(false);
		}
	};

	const tableOptions = tableDataList?.data?.docs?.map((table: any) => ({
		value: table._id,
		label: table.name,
	}));
	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl'>
					{t('tables.movetoothertable')}
				</h1>

				<form
					className='flex flex-col gap-6'
					onSubmit={handleSubmit(handleMoveOrderToAnotherTable)}
				>
					<div className='flex flex-col grow mt-2.5'>
						<p className='text-left text-base'>
							{t('tables.selectavailabletomove')}
						</p>
						<Select
							className='h-[50px]'
							options={tableOptions ?? []}
							selected={table}
							onChange={async (values) => {
								setTable(values);
							}}
						/>
					</div>

					<div className='flex items-center gap-x-2.5 grow mt-6'>
						<Button
							className='grow py-[25px]'
							variant='ghost'
							onClick={() => {
								setIsModalOpen(false);
							}}
						>
							{t('common.cancel')}
						</Button>
						<Button className='grow py-6' type='submit'>
							{t('tables.moveorder')}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default MoveOrderToAnotherTableModal;
