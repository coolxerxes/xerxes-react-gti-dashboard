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
import { useAddTable } from '../api/addTable';
import Select from 'components/Select';
import { useGetRestaurants } from 'features/settings/api/getRestaurants';
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

const AddTableModal = ({
	options,
	isModalOpen,
	setIsModalOpen,
	refetchTables,
	listOptions,
	refetchList,
}: Props) => {
	const { t, i18n } = useTranslation();
	const [selected, setSelected] = useState<string[]>([]);
	const [selectedList, setSelectedList] = useState('');
	const [tableShape, setTableShape] = useState('');
	const { register, handleSubmit } = useForm();
	const [restaurant, setRestaurant] = useState('');
	const { data: restaurantsData } = useGetRestaurants({});

	const restaurantsOptions = restaurantsData?.data.docs.map((restaurant) => ({
		label: restaurant.name,
		value: restaurant.id,
	}));

	const addTableMutation = useAddTable({});
	const handleAddTables = async (data: any) => {
		if (selectedList === '') {
			toast.error('Please add a zone');
		} else if (restaurant === '') {
			toast.error('Please select a restaurant');
		} else {
			for (let i = 1; i <= data?.newTablesNumber; i++) {
				await addTableMutation.mutateAsync({
					payload: {
						tableRegionId: selectedList,
						restaurantId: restaurant,
						name: data?.enName,
						nameAr: data?.arName,
						totalChairs: parseInt(data?.chairsNumber),
						shape: tableShape,
						minimumOrderValue: parseInt(data?.minumumOrderValue),
						fees: parseInt(data?.fees),
					},
				});
			}

			await refetchTables();
			await refetchList();

			setIsModalOpen(false);
		}
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl mb-6'>{t('tables.addtable')}</h1>

				<form
					className='flex flex-col gap-2.5'
					onSubmit={handleSubmit(handleAddTables)}
				>
					<div className='flex items-center justify-between gap-2.5 '>
						<div className='flex flex-col grow'>
							<p className='text-left text-base'>{t('tables.numberofnewtables')}</p>
							<Input
								required
								name='newTablesNumber'
								register={register}
								placeholder={t('tables.numberofnewtables')}
								type='number'
							/>
						</div>
						<div className='flex flex-col grow'>
							<p className='text-left text-base'>{t('tables.fees')}</p>
							<Input
								name='fees'
								register={register}
								placeholder={t('tables.fees')}
								type='number'
							/>
						</div>
					</div>
					<div className='flex items-center justify-between gap-2.5 '>
						<div className='flex flex-col grow'>
							<p className='text-left text-base'>{t('common.nameinarabic')}</p>
							<Input
								required
								name='arName'
								register={register}
								placeholder={t('common.nameinarabic')}
							/>
						</div>
						<div className=' flex flex-col grow'>
							<p className='text-left text-base'>{t('common.nameinarabic')}</p>
							<Input
								name='enName'
								register={register}
								placeholder={t('common.nameinenglish')}
							/>
						</div>
					</div>
					<div className='flex items-start justify-between gap-2.5'>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left text-base'>{t('tables.numberofchairs')}</p>
							<Input
								name='chairsNumber'
								register={register}
								placeholder={t('tables.numberofchairs')}
								type='number'
							/>
						</div>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left text-base'>{t('tables.tableshape')}</p>
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
					<div className='flex flex-col grow '>
						<p className='text-left text-base'>{t('restaurant.restaurant')}</p>
						<Select
							className='h-[50px]'
							options={restaurantsOptions ?? []}
							selected={restaurant}
							onChange={async (values) => {
								setRestaurant(values);
							}}
						/>
					</div>
					<div className='flex items-start justify-between gap-2.5 '>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left text-base'>{t('tables.minimumorder')}</p>
							<Input
								name='minumumOrderValue'
								register={register}
								placeholder={t('tables.minimumorder')}
								type='number'
							/>
						</div>
						<div className='flex flex-col grow w-1/2'>
							<p className='text-left text-base'>{t('tables.zone')}</p>
							<Select
								className='h-[50px]'
								options={listOptions ?? []}
								selected={selectedList}
								onChange={async (values) => {
									setSelectedList(values);
								}}
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
						{t('tables.addtable')}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default AddTableModal;
