import React, { useEffect } from 'react';
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
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { useUpdateZone } from '../api/updateZone';
import CheckBox from 'components/CheckBox';
import { useDeleteZone } from '../api/removeZone';
import { useAddZone } from '../api/addZone';
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
	selectedZone: any;
}
const AddZoneModal = ({
	options,
	listOptions,
	isModalOpen,
	setIsModalOpen,
	refetchList,
	refetchTables,
	selectedZone,
}: Props) => {
	const { t, i18n } = useTranslation();

	const [selected, setSelected] = useState<string[]>([]);
	const [selectedList, setSelectedList] = useState<string[]>([]);
	const { register, handleSubmit, reset } = useForm();
	const [isDeleteZone, setIsDeleteZone] = useState(false);

	const updateZoneMutation = useUpdateZone({});
	const deleteZoneMutation = useDeleteZone({});

	const addZoneMutation = useAddZone({});

	const handleAddZone = async (data: any) => {
		await addZoneMutation.mutateAsync({
			payload: {
				name: data.zoneName,
				type: 'Table Region',
			},
		});
		await refetchTables();
		await refetchList();

		setIsModalOpen(false);
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<form
				onSubmit={handleSubmit(handleAddZone)}
				className='flex flex-col grow'
			>
				<div className='px-[25px] flex flex-col grow gap-2.5'>
					<h1 className='text-primary font-bold text-xl'>{t('tables.addzone')}</h1>
					<div className='flex items-center justify-between gap-2.5'>
						<div className=' flex flex-col grow'>
							<p className='text-left text-base '>{t('tables.zonename')}</p>
							<Input
								required
								name='zoneName'
								register={register}
								placeholder={t('tables.zonename')}
							/>
						</div>
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
						{t('common.add')}
						</Button>
					</div>
				</div>
			</form>
		</Modal>
	);
};

export default AddZoneModal;
