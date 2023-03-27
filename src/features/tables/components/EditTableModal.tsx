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
import { useTranslation } from 'react-i18next';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTable: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	tableData: any;
}

const tableShapes = [
	{
		label: 'Square',
		value: 'Square',
	},
	{
		label: 'Circle',
		value: 'Circle',
	},
	{
		label: 'Rectangular',
		value: 'Rectangular',
	},
];

const EditTableModal = ({
	isModalOpen,
	setIsModalOpen,
	tableData,
	refetchTable,
}: Props) => {
	const { t, i18n } = useTranslation();
	const updateTableMutation = useUpdateTable({});
	const { register, handleSubmit, reset } = useForm();

	const [tableShape, setTableShape] = useState('');

	const handleUpdateTables = async (data: any) => {
		await updateTableMutation.mutateAsync({
			tableId: tableData?._id,
			payload: {
				fees: parseFloat(data?.fees),
				minimumOrderValue: parseFloat(data?.minimumOrder),
				name: data?.enName,
				nameAr: data?.arName,
				totalChairs: parseInt(data?.chairsNumber),
				shape: tableShape,
			},
		});
		await refetchTable();

		setIsModalOpen(false);
	};

	useEffect(() => {
		reset({
			fees: tableData?.fees,
			arName: tableData?.nameAr,
			enName: tableData?.name,
			chairsNumber: tableData?.totalChairs,
			minumumOrderValue: tableData?.minimumOrderValue,
		});
		setTableShape(tableData?.shape);
	}, [tableData]);
	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl mb-6'>
				{t('tables.edittableinformation')}
				</h1>

				<form
					className='flex flex-col gap-2.5 text-base'
					onSubmit={handleSubmit(handleUpdateTables)}
				>
					<div className='flex items-center justify-between gap-2.5'>
						<div className='flex flex-col grow'>
							<p className='text-left '>
							{t('common.nameinarabic')} <span className='text-primary'>*</span>
							</p>
							<Input
								required
								name='arName'
								register={register}
								placeholder={t('common.nameinarabic')}
							/>
						</div>
						<div className=' flex flex-col grow'>
							<p className='text-left '>
							{t('common.nameinenglish')} <span className='text-primary'>*</span>
							</p>
							<Input
								name='enName'
								register={register}
								placeholder={t('common.nameinenglish')}
							/>
						</div>
					</div>
					<div className='flex items-center justify-between gap-2.5'>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left '>{t('tables.chairsnumber')}</p>
							<Input
								name='chairsNumber'
								register={register}
								placeholder={t('tables.chairsnumber')}
								type='number'
							/>
						</div>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left '>{t('tables.tableshape')}</p>
							<Select
								className='h-[50px]'
								options={tableShapes ?? []}
								selected={tableShape}
								onChange={async (values) => {
									setTableShape(values);
								}}
							/>
						</div>
					</div>

					<div className='flex items-center justify-between gap-2.5'>
						<div className='flex flex-col grow w-1/2 mt-2.5'>
							<p className='text-left '>{t('tables.minimumorder')}</p>
							<Input
								name='minumumOrderValue'
								register={register}
								placeholder={t('tables.minimumorder')}
								type='number'
							/>
						</div>
						<div className='mt-2.5 flex flex-col grow w-1/2'>
							<p className='text-left '>{t('tables.fees')}</p>
							<Input
								name='fees'
								register={register}
								placeholder={t('tables.fees')}
								type='number'
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
						{t('common.save')}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default EditTableModal;
