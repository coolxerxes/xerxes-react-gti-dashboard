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
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
	options: Array<{ label: string; value: string }> | undefined;

	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTables: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
}

const AddFeesForMultipleTablesModal = ({
	options,
	isModalOpen,
	setIsModalOpen,
	refetchTables,
}: Props) => {
	const { t, i18n } = useTranslation();
	const [selected, setSelected] = useState<string[]>([]);
	const { register, handleSubmit } = useForm();

	const updateTableMutation = useUpdateTable({});
	const handleAddFeesToTables = (data: any) => {
		if (selected.length === 0) {
			toast.error('Please choose at least one table');
		} else {
			selected.map(async (table) => {
				await updateTableMutation.mutateAsync({
					tableId: table,
					payload: {
						fees: parseFloat(data?.fees),
						minimumOrderValue: parseFloat(data?.minimumOrder),
					},
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
				{t('tables.addfeestables')}

				</h1>
				<p className='text-gray pb-6 text-base'>
				{t('tables.addfeetoselectedtable')} .
				</p>
				<form onSubmit={handleSubmit(handleAddFeesToTables)}>
					<div>
						<p className='text-left mb-2 text-base'>
						{t('tables.selecttable')}
						</p>
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
					<div className='mt-6'>
						<p className='text-left mb-2.5 text-base'>{t('tables.fees')}</p>
						<Input
							name='fees'
							register={register}
							placeholder={t('tables.addfees')}
							type='number'
						/>
					</div>
					<div className='mt-2.5'>
						<p className='text-left mb-2.5 text-base'>{t('tables.minimumorder')}</p>
						<Input
							name='minimumOrder'
							register={register}
							placeholder={t('tables.addfeestables')}
							type='number'
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
						{t('tables.addfees')}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default AddFeesForMultipleTablesModal;
