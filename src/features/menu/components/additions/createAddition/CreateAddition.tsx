import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { type MenuAddition } from 'features/menu/api/types';
import Banner from 'components/Banner';
import Input from 'components/Input';
import { useCreateMenuAddition } from 'features/menu/api/createMenuIAddition';
import CheckBox from 'components/CheckBox';
import { Switch } from '@headlessui/react';
import DeleteIcon from 'assets/icons/deleteIcon';
import Button from 'components/Button';
import { useState } from 'react';
import Spinner from 'components/Spinner';
import ArrowIcon from '../../../../../assets/images/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const CreateAddition: React.FC = () => {
	const { t, i18n } = useTranslation();
	const crateMenuAddition = useCreateMenuAddition();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const defaultOption = {
		name: '',
		nameAr: '',
		price: 0,
		order: 0,
		calory: 0,
	};

	const { handleSubmit, register, watch, setValue } = useForm<MenuAddition>({
		defaultValues: {
			options: [defaultOption],
		},
	});

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
			await crateMenuAddition.mutateAsync(tempData);
			toast.success('Successfully created!');
			setIsLoading(false);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full'>
			<div className='h-[80px] rounded-small -z-10'>
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
						<span>{t('modifiers.addmodifier')}</span>
					</div>
				</Banner>
			</div>

			<div className='z-0 relative'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full min-h-[35px] bg-white rounded-lg  mt-5 py-10'
				>
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1 xl:text-base'>
						<div>
							<Input
								name='nameAr'
								placeholder={t('common.nameinarabic')}
								label={t('common.nameinarabic')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='name'
								placeholder={t('common.nameinenglish')}
								label={t('common.nameinenglish')}
								register={register}
							/>
						</div>
					</div>
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1 xl:text-base'>
						<div>
							<CheckBox
								name='isMultipleAllowed'
								checked={watch('isMultipleAllowed')}
								onChange={(value: any) => {
									setValue('isMultipleAllowed', value as boolean);
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
					<div className='grid grid-cols-2  gap-4 px-4 items-center w-full mx-1 xl:text-base'>
						<div>
							<Input
								type='number'
								name='maxOptions'
								placeholder={t('modifiers.maximumChoices')}
								label={t('modifiers.maximumChoices')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='number'
								name='minOptions'
								placeholder={t('modifiers.minimumChoices')}
								label={t('modifiers.minimumChoices')}
								register={register}
							/>
						</div>
						<div>
							<Input
								type='number'
								name='freeOptions'
								placeholder={t('modifiers.numberOfFreeChoices')}
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
								placeholder={t('modifiers.sort')}
								label={t('modifiers.sort')}
								register={register}
							/>
						</div>
					</div>
					<div className='flex items-center my-4 pl-4 pr-4'>
						<span className='text-primary !min-w-fit text-left font-dinBold xl:text-base'>
						{t('modifiers.options')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>
					{watch('options').map(
						({ calory, name, nameAr, order, price, active, _id }, index) => {
							return (
								<div
									key={index}
									className='flex justify-between mx-2 px-3 items-center mb-5 xl:text-base'
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
											placeholder={t('modifiers.name')}
											label={t('modifiers.name')}
											register={register}
										/>
									</div>

									<div>
										<Input
											type='text'
											name={`options.${index}.nameAr`}
											placeholder={t('common.nameinarabic')}
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
											placeholder='Price'
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
					<div className='flex justify-end mt-3 mr-4 xl:text-base'>
						<Button
							variant='default'
							height={50}
							width={220}
							className='border-gray !hover:border-gray'
						>
							{t('common.cancel')}
						</Button>
						<Button type='submit' height={50} width={220} className='ml-4'>
							{isLoading ? <Spinner color='white' /> : `${t('common.save')}`}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateAddition;
