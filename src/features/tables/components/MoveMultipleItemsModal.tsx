import Button from 'components/Button';
import Modal from 'components/Modal';
import MultiSelect from 'components/MultiSelect';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useUpdateTable } from '../api/updateTable';
import { toast } from 'react-toastify';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { type GetListResponse } from '../types';
import { type GetTablesResponse } from 'features/cashier/api/types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
	options: Array<{ label: string; value: string }> | undefined;
	listOptions: Array<{ label: string; value: string }> | undefined;
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	refetchList: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetListResponse, unknown>>;
	refetchTables: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
}

const MoveMultipleItemsModal = ({
	options,
	listOptions,
	isModalOpen,
	setIsModalOpen,
	refetchList,
	refetchTables,
}: Props) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [selectedList, setSelectedList] = useState<string[]>([]);
	const updateTableMutation = useUpdateTable({});
	const { t, i18n } = useTranslation();
	const handleMoveTables = () => {
		if (selected.length === 0) {
			toast.error('Please add at least one table');
		} else if (selectedList.length === 0) {
			toast.error('Please add a zone');
		} else {
			selectedList.map((zone) => {
				return selected.map(async (table) => {
					await updateTableMutation.mutateAsync({
						tableId: table,
						payload: {
							tableRegionId: zone,
						},
					});
					await refetchTables();
					await refetchList();
				});
			});

			setIsModalOpen(false);
		}
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] '>
				<h1 className='text-primary font-bold text-xl mb-1.5'>
					{t('tables.movetables')}
				</h1>
				<p className='text-gray pb-6 text-base'>
					{t('tables.moveSelectedTablesTo')}
				</p>
				<div>
					<p className='text-left mb-2.5 text-base'>{t('tables.tables')}</p>
					<MultiSelect
						options={options ?? []}
						selected={selected}
						onChange={async (values) => {
							setSelected(values);
						}}
						setSelected={setSelected}
						variant='ghost'
					/>
				</div>

				<div className='mt-2.5'>
					<p className='text-left mb-2 text-base'>
						{t('tables.zone')} <span className='text-primary'>*</span>
					</p>
					<MultiSelect
						options={listOptions ?? []}
						multi={false}
						selected={selectedList}
						setSelected={setSelectedList}
						onChange={async (values) => {
							setSelectedList(values);
						}}
						variant='ghost'
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
					<Button className='grow py-6' onClick={handleMoveTables}>
						{t('tables.movetables')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default MoveMultipleItemsModal;
