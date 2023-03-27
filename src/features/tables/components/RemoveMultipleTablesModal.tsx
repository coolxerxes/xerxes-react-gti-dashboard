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
import { useDeleteTable } from '../api/removeTable';
import { useTranslation } from 'react-i18next';

interface Props {
	options: Array<{ label: string; value: string }> | undefined;

	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTables: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
}

const RemoveMultipleTablesModal = ({
	options,
	isModalOpen,
	setIsModalOpen,
	refetchTables,
}: Props) => {
	const [selected, setSelected] = useState<string[]>([]);
	const { t, i18n } = useTranslation();
	const deleteTableMutation = useDeleteTable({});
	const handleDeleteTables = () => {
		if (selected.length === 0) {
			toast.error('Please choose at least one table');
		} else {
			selected.map(async (table) => {
				await deleteTableMutation.mutateAsync({
					tableId: table,
				});
				await refetchTables();
			});

			setIsModalOpen(false);
		}
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] '>
				<h1 className='text-primary font-bold text-xl mb-1.5'>
					{t('tables.removetables')}
				</h1>
				<p className='text-gray pb-6 text-base'>
				{t('tables.removeselectedtables')}
				</p>
				<div>
					<p className='text-left mb-2.5 text-base'>{t('tables.selecttablestodelete')}</p>
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
				<h1 className='text-primary font-bold  mt-3 text-base'>
				{t('tables.ifyoudeletethistable')}				
				</h1>

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
					<Button className='grow py-6' onClick={handleDeleteTables}>
					{t('common.delete')}
										</Button>
				</div>
			</div>
		</Modal>
	);
};

export default RemoveMultipleTablesModal;
