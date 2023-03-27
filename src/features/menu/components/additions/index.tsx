import { createColumnHelper } from '@tanstack/react-table';
import Banner from 'components/Banner';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Table from 'components/Table';
import { useGetMenuAdditions } from 'features/menu/api/getMenuAdditions';
import { type MenuAddition } from 'features/menu/api/types';
import { type NavigateFunction, useNavigate } from 'react-router-dom';
import { ADMIN } from 'routes/constants';
import { AiOutlineMenu } from 'react-icons/ai';
import EditIcon from 'assets/icons/editIcon';
import DeleteIcon from 'assets/icons/deleteIcon';
import { useDeleteMenuAddition } from 'features/menu/api/deleteMenuAddition';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const columnHelper = createColumnHelper<MenuAddition>();

const Additions = () => {
	const { t, i18n } = useTranslation();
	const columns = (
		navigate: NavigateFunction,
		onDelete: (id: string) => void,
		deleteInProgressFor: string[]
	) => [
		columnHelper.accessor('_id', {
			cell: (info) => <AiOutlineMenu />,
			header: () => (
				<span className='font-dinBold text-base xl:text-[17px]'> {t('additions.sort')}</span>
			),
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor((row) => row.name, {
			id: 'Name',
			cell: (info) => <span>{info.getValue()}</span>,
			header: () => (
				<span className='font-dinBold text-base xl:text-[17px]'> {t('additions.name')}</span>
			),
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('maxOptions', {
			header: () => (
				<span className='font-dinBold text-base xl:text-[17px]'>
					{' '}
					{t('additions.maximumChoices')}
				</span>
			),
			cell: (info) => info.renderValue(),
			footer: (info) => info.column.id,
		}),
		columnHelper.accessor('minOptions', {
			header: () => (
				<span className='font-dinBold text-base xl:text-[17px]'>
					{' '}
					{t('additions.minimumChoices')}
				</span>
			),
		}),
		columnHelper.accessor('freeOptions', {
			header: () => (
				<span className='font-dinBold text-base xl:text-[17px]'>
					{' '}
					{t('additions.numberOfFreeChoices')}
				</span>
			),
			cell: (info) => info.renderValue(),
		}),
		columnHelper.accessor((row) => row._id, {
			id: 'actions',
			header: '',
			cell: (info) => (
				<>
					<div className=' py-2 flex justify-center'>
						{!deleteInProgressFor.includes(info.getValue()) ? (
							<span
								onClick={() => {
									navigate(
										`${ADMIN.PATHS.MENU_ADDITIONS_EDIT}/${info.getValue()}`
									);
								}}
								className='mr-2 p-2 cursor-pointer rounded-lg bg-editIconBg text-editIconColor'
							>
								<EditIcon />
							</span>
						) : null}
						{!deleteInProgressFor.includes(info.getValue()) ? (
							<span
								onClick={() => {
									onDelete(info.getValue());
								}}
								className='cursor-pointer rounded-lg bg-deleteIconBg text-deleteIconColor p-2'
							>
								<DeleteIcon />
							</span>
						) : (
							<Spinner />
						)}
					</div>
				</>
			),
		}),
	];

	const {
		data: menuAdditionData,
		isLoading,
		refetch,
	} = useGetMenuAdditions({});
	const [deleteInProgressFor, setDeleteInProgressFor] = useState<string[]>([]);

	const deleteMenuAddition = useDeleteMenuAddition({});
	const navigate = useNavigate();

	const menuAdditions = menuAdditionData?.data.docs;

	if (isLoading) {
		return <Spinner />;
	}

	if (!menuAdditions) {
		return null;
	}

	const onDeleteHandler = async (id: string) => {
		setDeleteInProgressFor([...deleteInProgressFor, id]);
		try {
			await deleteMenuAddition.mutateAsync(id);
			await refetch();
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setDeleteInProgressFor([
				...deleteInProgressFor.filter((item) => item !== id),
			]);
		}
	};

	return (
		<div className='w-full'>
			<div className='rounded-small min-h-[60px] sticky top-[11%] z-[100] my-5'>
				<Banner className="">
					<div
						className={classNames({
							'flex items-center mx-3 justify-between lg:flex-nowrap flex-wrap gap-y-2  py-3': true,
							' flex-row-reverse  mr-4': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='font-dinBold inline text-xl xl:text-[21px] !w-fit space-[-0.38px]'>
							{t('common.modifires')}
						</span>
						<p
							className={`text-xs xl:text-[13px] text-gray ${
								i18n.resolvedLanguage === 'ar' ? 'mr-3' : ' ml-3'
							}`}
						>
							{t('additions.inThisSection')}
						</p>

						<div
							className={classNames({
								'flex gap-2 flex-row w-full justify-end  xl:text-base': true,
								'!justify-start ml-3': i18n.resolvedLanguage === 'ar',
							})}
						>
							<Button className='font-semibold'>
								{' '}
								{t('additions.saveSort')}
							</Button>
							<Button
								className='font-semibold'
								onClick={() => {
									navigate(ADMIN.PATHS.MENU_ADDITIONS_ADD);
								}}
							>
								{t('additions.addNewModifier')}
							</Button>
						</div>
					</div>
				</Banner>
			</div>
			<div className='bg-white w-[100%] rounded-small relative z-[0] min-h-[600px] mt-5'>
				<Table
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					columns={columns(navigate, onDeleteHandler, deleteInProgressFor)}
					data={menuAdditions}
					className='additionTable'
				/>
			</div>
		</div>
	);
};

export default Additions;
