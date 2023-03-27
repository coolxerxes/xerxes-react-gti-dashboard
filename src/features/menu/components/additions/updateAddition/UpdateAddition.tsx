import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { type MenuAddition } from 'features/menu/api/types';
import Banner from 'components/Banner';
import Input from 'components/Input';
import CheckBox from 'components/CheckBox';
import { Switch } from '@headlessui/react';
import DeleteIcon from 'assets/icons/deleteIcon';
import Button from 'components/Button';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import MultiSelect from 'components/MultiSelect';
import { useEffect, useState } from 'react';
import Spinner from 'components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMenuAdditionById } from 'features/menu/api/getMenuAdditionById';
import { useUpdateAddition } from 'features/menu/api/updateMenuAddition';
import ArrowIcon from 'assets/images/arrow.svg';
import { useUpdateMenuItem } from 'features/menu/api/updateMenuItem';
import { useTranslation } from 'react-i18next';

const UpdateAddition: React.FC = () => {
	const { additionId } = useParams<{ additionId: string }>();
	const updateMenuItem = useUpdateMenuItem({});
	const navigate = useNavigate();
	const { t, i18n } = useTranslation();
	const [selected, setSelected] = useState<string[]>([]);

	const { data: menuAdditionData } = useGetMenuAdditionById({
		id: additionId as string,
	});
	const updateMenuAddition = useUpdateAddition({});
	const { data: menuItems } = useGetMenuItems({ params: {} });
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const defaultOption = {
		name: '',
		nameAr: '',
		price: 0,
		order: 0,
		calory: 0,
	};

	const { handleSubmit, register, watch, setValue, reset } =
		useForm<MenuAddition>({
			defaultValues: {
				options: [defaultOption],
			},
		});

	useEffect(() => {
		reset({ ...menuAdditionData?.data });
		if (menuAdditionData?.data) {
			const additions = menuItems?.data.docs
				.filter((item) => item.additions.includes(menuAdditionData.data._id))
				.map((item) => item._id);
			setSelected(additions ?? []);
		}
	}, [menuAdditionData, reset, menuItems]);

	const onSubmit = async (data: MenuAddition): Promise<void> => {
		setIsLoading(true);
		const tempData: MenuAddition = {
			...data,
			maxOptions: Number(data.maxOptions),
			minOptions: Number(data.minOptions),
			freeOptions: Number(data.minOptions),
			order: Number(data.order),
			options: data.options.map((item) => ({
				...item,
				calory: Number(item.calory),
				price: Number(item.price),
				order: Number(item.order),
			})),
		};
		try {
			await updateMenuAddition.mutateAsync({
				id: additionId as string,
				payload: tempData,
			});
			// which menus are selected update all those menu item adding current menu addition id
			if (typeof additionId === 'string')
				for await (const item of selected) {
					const oldAdditions = menuItems?.data.docs.find(
						(mItem) => mItem._id === item
					)?.additions;
					const additions = oldAdditions?.length
						? [...oldAdditions, additionId]
						: [item];
					void updateMenuItem.mutateAsync({
						id: item,
						payload: {
							additions: [...new Set(additions)],
						},
					});
				}
			toast.success('Successfully updated!');
			setIsLoading(false);
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const menuItemOptions = menuItems?.data.docs.map((item) => ({
		value: item._id,
		label: item.name,
	}));

	if (!menuAdditionData?.data) {
		return <Spinner />;
	}

	return (
		<div>
			<div className='w-full z-0 h-[60px] flex items-center rounded-lg'>
				<Banner>
					<div className='font-dinBold flex text-2xl xl:text-[25px] items-center ml-4 gap-2'>
						<img
							src={ArrowIcon}
							height='20px'
							width='20px'
							className='cursor-pointer'
							onClick={() => {
								navigate(-1);
							}}
						/>
						<span>{t('modifiers.updatemodifier')}</span>
					</div>
				</Banner>
			</div>
			<div className='z-0 relative'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full z-10 min-h-[35px] bg-white rounded-lg  mt-5 py-10 xl:text-base '
				>
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1'>
						<div>
							<Input
								name='nameAr'
								placeholder='Name In Arabic'
								label={t('common.nameinarabic')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='name'
								placeholder='Name In English'
								label={t('common.nameinenglish')}
								register={register}
							/>
						</div>
					</div>
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1'>
						<div>
							<CheckBox
								name='isMultipleAllowed'
								checked={watch('isMultipleAllowed')}
								onChange={(value: any) => {
									setValue('isMultipleAllowed', value);
								}}
								label={t('modifiers.customersmultipleoptions')}
								className='mt-8 ml-1'
							/>
						</div>
						<div>
							<CheckBox
								name='isMultipleAllowed'
								checked={!watch('isMultipleAllowed')}
								onChange={(value: any) => {
									setValue('isMultipleAllowed', !value);
								}}
								label={t('modifiers.customerschoostonlyone')}
								className='mt-8 ml-1'
							/>
						</div>
					</div>
					<br />
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1'>
						<div>
							<Input
								type='number'
								name='maxOptions'
								placeholder='Max options'
								label={t('modifiers.maximumChoices')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='number'
								name='minOptions'
								placeholder='Min options'
								label={t('modifiers.minimumChoices')}
								register={register}
							/>
						</div>
						<div>
							<Input
								type='number'
								name='freeOptions'
								placeholder='Free options'
								label={t('modifiers.numberOfFreeChoices')}
								register={register}
							/>
						</div>
						<div>
							<CheckBox
								name='taxEnabled'
								label={t('modifiers.tax')}
								checked={!watch('taxEnabled')}
								onChange={(value: any) => {
									setValue('taxEnabled', !value);
								}}
							/>
						</div>
						<div>
							<Input
								type='number'
								name='order'
								placeholder='Sort'
								label={t('modifiers.sort')}
								register={register}
							/>
						</div>
					</div>
					<div className='flex items-center my-4 pl-4 pr-4'>
						<span className='text-primary !min-w-fit text-left font-dinBold xl:text-[17px]'>
						{t('modifiers.options')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>
					{watch('options')?.map(
						({ calory, name, nameAr, order, price, active, _id }, index) => {
							return (
								<div
									key={index}
									className='flex justify-between mx-2 px-3 items-center mb-5 xl:text-[17px]'
								>
									<div className='max-w-[100px]'>
										<Input
											type='number'
											name={`options.${index}.order`}
											placeholder='Sort'
											label={t('modifiers.sort')}
											register={register}
										/>
									</div>
									<div>
										<Input
											type='text'
											name={`options.${index}.name`}
											placeholder='Max options'
											label={t('modifiers.name')}
											register={register}
										/>
									</div>

									<div>
										<Input
											type='text'
											name={`options.${index}.nameAr`}
											placeholder='Name Arabic'
											label={t('common.nameinarabic')}
											register={register}
										/>
									</div>
									<div className='max-w-[100px]'>
										<Input
											type='number'
											name={`options.${index}.calory`}
											placeholder='Calories'
											label={t('modifiers.calories')}
											register={register}
										/>
									</div>
									<div className='max-w-[100px]'>
										<Input
											type='number'
											name={`options.${index}.price`}
											placeholder='Calories'
											label={t('modifiers.price')}
											register={register}
										/>
									</div>
									<div>
										<Switch
											name={`options.${index}.active`}
											checked={watch(`options.${index}.active`)}
											onChange={(value: boolean) => {
												setValue(`options.${index}.active`, value);
											}}
										/>
									</div>
									<div
										onClick={() => {
											const options = [...watch('options')];
											setValue(
												'options',
												options.filter((oItem) => oItem._id !== _id)
											);
										}}
										className='cursor-pointer'
									>
										<DeleteIcon />
									</div>
								</div>
							);
						}
					)}
					{/* TODO: change the button width design */}
					<div className='mx-5 lg:mx-[110px]'>
					<Button
						height={50}
						className='m-auto !rounded-3xl mb-5 mt-2 xl:text-base w-full'
						variant='dashed'
						onClick={() => {
							setValue('options', [...watch('options'), defaultOption]);
						}}
					>
						{t('modifiers.addoption')}
					</Button>
					</div>
					<div className='mx-4'>
						<p className='text-left mb-2 xl:text-[17px]'>This Modifier is in these foods</p>
						<MultiSelect
							options={menuItemOptions ?? []}
							selected={selected}
							onChange={async (values) => {
								setSelected(values);
							}}
							variant='ghost'
						/>
					</div>
					<div className='flex justify-end mt-3 mr-4'>
						<Button
							variant='default'
							height={50}
							width={220}
							className='border-gray !hover:border-gray xl:text-[17px]'
							onClick={() => {
								navigate(-1);
							}}
						>
							{t('common.cancel')}
						</Button>
						<Button type='submit' height={50} width={220} className='ml-4 xl:text-[17px]'>
							{isLoading ? <Spinner color='white' /> : `${t('common.save')}`}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateAddition;
