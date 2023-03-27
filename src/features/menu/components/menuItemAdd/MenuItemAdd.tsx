import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useEnumSelector, useGetEnums } from 'hooks';
import { Controller, useForm } from 'react-hook-form';
import ArrowIcon from '../../../../assets/images/arrow.svg';
import Input from 'components/Input';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import CustomSwitch from 'components/Switch';
import ImagePreview from 'components/ImagePreview';
import { type Menu } from 'features/menu/api/types';
import Tag from 'components/Tag/Tag';
import MultiSelect from 'components/MultiSelect';
import Upload from 'components/Upload';
import Banner from 'components/Banner';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import { useGetMenuCategories } from 'features/menu/api/getMenuCategories';
import { useGetMenuAdditions } from 'features/menu/api/getMenuAdditions';
import Button from 'components/Button';
import { useGetRestaurants } from 'features/settings/api/getRestaurants';
import Spinner from 'components/Spinner';
import Textarea from 'components/Textarea';
import { useCreateMenuItem } from 'features/menu/api/createMenuItem';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const MenuAddUpdate: React.FC = () => {
	const navigate = useNavigate();
	const { enums } = useEnumSelector();
	const { t, i18n } = useTranslation();
	const getEnums = useGetEnums();
	const { data: menuData } = useGetMenuItems({ params: {} });
	const { data: restaurantData } = useGetRestaurants({});
	const { data: categoryData } = useGetMenuCategories({});
	const { data: menuAdditionData } = useGetMenuAdditions({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createMenuItem = useCreateMenuItem();
	const restaurants = restaurantData?.data.docs;

	const menuItems = menuData?.data.docs;
	const menuCategories = categoryData?.data.docs;
	const menuAdditions = menuAdditionData?.data.docs;

	const { handleSubmit, control, watch, register, setValue } = useForm<Menu>({
		defaultValues: {
			order: 1,
			preparationTime: 10,
			stickerStyle: [],
			additions: [],
			quantities: [],
			manageQuantity: false,
		},
	});

	const onSubmit = async (data: Menu): Promise<void> => {
		try {
			setIsLoading(true);
			const quantities = data.quantities
				.map((qItem) => ({ ...qItem, quantity: Number(qItem.quantity) }))
				.filter((qItem) => qItem.quantity && qItem.restaurantId);
			if (!data.sticker) {
				delete data.sticker;
			}
			await createMenuItem.mutateAsync({
				...data,
				image: data?.image
					? data?.image
					: 'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png',
				calories: Number(data?.calories),
				price: Number(data?.price),
				cost: Number(data?.cost),
				priceInStar: Number(data?.priceInStar),
				starGain: Number(data?.starGain),
				quantities,
				preparationTime: Number(data?.preparationTime),
			});
			toast.success('Successfully created!');
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getEnums({ enums: 'MenuSticker' });
		getEnums({ enums: 'MenuStickerStyle' });
		getEnums({ enums: 'Alergies' });
	}, [getEnums]);

	const StickersEnum = enums.find(
		(enumItem) => enumItem.name === 'MenuSticker'
	)?.values;

	const MenuStickerStyleEnum = enums.find(
		(enumItem) => enumItem.name === 'MenuStickerStyle'
	)?.values;

	const allergiesEnum = enums.find(
		(enumItem) => enumItem.name === 'Alergies'
	)?.values;

	return (
		<div>
			<div className='w-full  h-[60px] flex items-center rounded-lg sticky top-[11%] z-[100] my-5'>
				<Banner>
					<div
						className={classNames({
							'font-bold flex text-2xl xl:text-[25px] items-center ml-4 gap-2 flex-row w-full ':
								true,
							'text-end flex-row-reverse justify-start mr-4':
								i18n.resolvedLanguage === 'ar',
						})}
					>
						<img
							src={ArrowIcon}
							height='20px'
							width='20px'
							className={classNames({
								'cursor-pointer transform rotate-0': true,
								' rotate-180': i18n.resolvedLanguage === 'ar',
							})}
							onClick={() => {
								navigate(-1);
							}}
						/>
						<span>{t('menu.addNewItem')}</span>
					</div>
				</Banner>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full z-0 relative min-h-[35px] bg-white flex rounded-lg items-center mt-5 xl:text-base'
			>
				<div className='bg-white min-h-[60vh] mt-5 w-full'>
					<div className='grid grid-cols-2  gap-4 px-4 items-center'>
						<div>
							<Input
								name='nameAr'
								placeholder={t('menu.nameInAr')}
								label={<p>{t('menu.nameInAr')}</p>}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='name'
								placeholder={t('menu.nameInEn')}
								label={<p>{t('menu.nameInEn')}</p>}
								register={register}
							/>
						</div>

						<div>
							<Textarea
								name='descriptionAr'
								register={register}
								placeholder={t('menu.descriptionAr')}
								label={<p>{t('menu.descriptionAr')}</p>}
								resize='resize-none'
							/>
						</div>
						<div>
							<Textarea
								name='description'
								placeholder={t('menu.descriptionEn')}
								label={<p>{t('menu.descriptionEn')}</p>}
								register={register}
								resize='resize-none'
							/>
						</div>

						<div>
							<Input
								type='number'
								name='price'
								placeholder={t('menu.price')}
								label={<p>{t('menu.price')}</p>}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='number'
								name='calories'
								placeholder={t('menu.calories')}
								label={<p>{t('menu.calories')}</p>}
								register={register}
							/>
						</div>
						<div>
							<Input
								type='number'
								name='preparationTime'
								placeholder={t('menu.preparationTime')}
								label={<p>{t('menu.preparationTime')}</p>}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='number'
								name='priceInStar'
								placeholder={t('menu.priceInStar')}
								label={<p>{t('menu.priceInStar')}</p>}
								register={register}
							/>
						</div>
						<div>
							<CheckBox
								name='taxEnabled'
								checked={watch('taxEnabled')}
								onChange={(value: any) => {
									setValue('taxEnabled', value);
								}}
								label={t('menu.tax')}
								className='mt-8 ml-1'
							/>
						</div>

						<div>
							<Input
								type='text'
								name='waiterCode'
								placeholder={t('menu.privateWaiterChiefCode')}
								label={<p>{t('menu.privateWaiterChiefCode')}</p>}
								register={register}
							/>
						</div>
						<div>
							<Input
								type='number'
								name='cost'
								placeholder={t('menu.cost')}
								label={<p>{t('menu.cost')}</p>}
								register={register}
							/>
						</div>
						<div className='z-10'>
							<p
								className={classNames({
									'mb-3 text-start font-bold': true,
									'text-end': i18n.resolvedLanguage === 'ar',
								})}
							>
								{t('menu.categories')}
							</p>
							<Controller
								name='categoryId'
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										selected={watch('categoryId')}
										className='!h-[50px]'
										options={
											menuCategories?.map((item) => {
												return {
													value: item?.id,
													label:
														i18n.resolvedLanguage === 'ar'
															? item?.nameAr
															: item?.name,
												};
											}) ?? []
										}
									/>
								)}
							/>
						</div>
						<div className=''>
							<div
								className={classNames({
									'mb-3 text-start font-bold': true,
									'text-end': i18n.resolvedLanguage === 'ar',
								})}
							>
								{t('menu.foodAllergies')}
							</div>
							<MultiSelect
								selected={watch('alergies')}
								options={
									allergiesEnum?.map((item) => {
										return {
											value: item?.key,
											label:
												i18n.resolvedLanguage === 'ar' ? item?.ar : item?.en,
										};
									}) ?? []
								}
								variant='white'
								onChange={(values) => {
									setValue('alergies', values);
								}}
							/>
						</div>
					</div>

					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.quantity')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div
						className={classNames({
							'flex justify-start  gap-4 px-4': true,
							'justify-end': i18n.resolvedLanguage === 'ar',
						})}
					>
						<Controller
							name='canBuyWithStars'
							control={control}
							render={({ field }) => (
								<div
									className={classNames({
										'flex items-center': true,
										'flex-row-reverse': i18n.resolvedLanguage === 'ar',
									})}
								>
									<label
										className={`${
											i18n.resolvedLanguage === 'ar' ? 'ml-3' : 'mr-3'
										}`}
										htmlFor=''
									>
										{t('menu.activeQuantity')}
									</label>
									<CustomSwitch
										onChange={(value) => {
											if (!value) {
												setValue('quantities', []);
											} else {
												setValue('quantities', [
													{ restaurantId: '', quantity: 0 },
												]);
											}
										}}
										checked={watch('quantities').length > 0}
									/>
								</div>
							)}
						/>
					</div>

					<div
						className={classNames({
							'grid grid-cols-3 text-start mt-4 items-center  gap-4 px-4': true,
							'text-end': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div>{t('menu.restaurantName')}</div>
						<div>{t('menu.quantity')}</div>
						<div> {t('menu.status')}</div>
						{restaurants?.map(({ _id, name, nameAr }, indx) => {
							const index = watch('quantities')?.findIndex(
								(item) => item.restaurantId === _id
							);
							const inputtedQuantity = watch('quantities')?.[index]?.quantity;

							return (
								<>
									<div>
										<CheckBox
											name={`quantities.${indx}.restaurantId`}
											checked={index >= 0}
											onChange={(value: any) => {
												if (value) {
													const quantity = {
														restaurantId: _id,
														quantity: 0,
													};
													const tempQuantities = [...watch('quantities')];
													tempQuantities[indx] = quantity;
													setValue(`quantities`, tempQuantities);
												} else {
													const tempQuantities = [...watch('quantities')];
													tempQuantities.splice(index, 1);
													setValue(`quantities`, tempQuantities);
												}
											}}
											label={i18n.resolvedLanguage === 'ar' ? nameAr : name}
										/>
									</div>
									<div>
										<Input
											type='number'
											name={`quantities.${indx}.quantity`}
											placeholder={t('menu.quantity')}
											register={() => {
												return register<any>('quantities', {
													value: [],
												});
											}}
											disabled={!watch('quantities')?.length}
										/>
									</div>
									<div className='mt-[8px]'>
										{Number(inputtedQuantity) > 0 ? (
											<Tag
												isShowSuffix={false}
												variant='success'
												label={t('menu.inStock')}
											/>
										) : (
											<Tag
												isShowSuffix={false}
												className='!border-primary'
												variant='primary'
												label={t('menu.outOfStock')}
											/>
										)}
									</div>
								</>
							);
						})}
					</div>
					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.menuEngineeringTechniques')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div
						className={classNames({
							'text-start px-4': true,
							'text-end': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div className='my-2'>
							<span> {t('menu.suggestedFoods')}</span>{' '}
							<span className='text-[#0000004e]'>
								{t('menu.suggestedItems')}
							</span>
						</div>
						<div>
							<MultiSelect
								selected={watch('suggestedItems')}
								variant='success'
								options={
									menuItems?.map((item) => {
										return {
											value: item?._id,
											label:
												i18n.resolvedLanguage === 'ar'
													? item?.nameAr
													: item?.name,
										};
									}) ?? []
								}
								onChange={(values) => {
									setValue('suggestedItems', values);
								}}
							/>
						</div>
					</div>
					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.stickersOnFood')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div className='flex mx-4 justify-between'>
						{StickersEnum?.map((item: any) => {
							return (
								<div key={item?.key}>
									<input
										type='radio'
										id='sticker'
										value={item?.en}
										{...register('sticker')}
									/>
									<label className='ml-2' htmlFor='javascript'>
										{i18n.resolvedLanguage === 'ar' ? item?.ar : item?.en}
									</label>
								</div>
							);
						})}
					</div>

					<div className='flex justify-between mx-4 mt-4'>
						{MenuStickerStyleEnum?.map((item, index) => {
							const isPresent = watch('stickerStyle')?.includes(
								item.en || item.ar
							);
							return (
								<>
									<CheckBox
										name={`stickerStyle.${index}`}
										checked={isPresent}
										onChange={(value: any) => {
											const stickerStyles = [...watch('stickerStyle')];
											if (isPresent) {
												const index = stickerStyles.indexOf(item.en || item.ar);
												stickerStyles.splice(index, 1);
											} else {
												stickerStyles.push(item.en || item.ar);
											}
											setValue('stickerStyle', stickerStyles);
										}}
										label={i18n.resolvedLanguage === 'ar' ? item?.ar : item?.en}
									/>
								</>
							);
						})}
					</div>

					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.theFoodIsNotInTheseBranches')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div className='mx-4'>
						<p
							className={classNames({
								'mb-3 text-start ': true,
								'text-end': i18n.resolvedLanguage === 'ar',
							})}
						>
							{t('menu.theFoodIsNotInTheseBranches')}
						</p>
						<Controller
							name='hideFromMenu'
							control={control}
							render={({ field }) => (
								<MultiSelect
									{...field}
									selected={watch('hideFromMenu')}
									className='!h-[50px]'
									variant='primary'
									options={
										restaurants?.map((item) => {
											return {
												value: item?._id,
												label:
													i18n.resolvedLanguage === 'ar'
														? item?.nameAr
														: item?.name,
											};
										}) ?? []
									}
								/>
							)}
						/>
					</div>

					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.modifiers')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div className='flex justify-start flex-wrap mx-4 gap-3'>
						{menuAdditions?.map((item, index) => {
							const isPresent = watch('additions').includes(item._id);
							return (
								<div key={index} className='my-1'>
									<Tag
										className='!bg-inputBg'
										label={
											i18n.resolvedLanguage === 'ar' ? item?.nameAr : item?.name
										}
										selected={isPresent}
										variant='ghost'
										onClick={() => {
											const additions = [...watch('additions')];
											if (isPresent) {
												const index = additions.indexOf(item._id);
												additions.splice(index, 1);
											} else {
												additions.push(item._id);
											}
											setValue('additions', additions);
										}}
									/>
								</div>
							);
						})}
					</div>

					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('menu.photosAndVideos')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div className='mx-4 pt-2 pb-4 '>
						<Upload
							onChange={(url) => {
								setValue('image', url);
							}}
						/>

						{watch('image') && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: watch('image'),
									}}
									onRemove={() => {
										setValue('image', '');
									}}
									progress={100}
								/>
							</div>
						)}
					</div>
					<div
						className={classNames({
							'flex justify-end gap-2 pb-5 mr-4': true,
							'': i18n.resolvedLanguage === 'ar',
						})}
					>
						<Button
							height={40}
							width={225}
							className='!text-normalBlack border-zinc-400 border bg-slate-50 hover:!border-zinc-400 hover:text-normalBlack'
							variant='default'
							type='button'
							onClick={() => {
								navigate(-1);
							}}
						>
							{t('common.cancel')}
						</Button>
						<Button type='submit' height={40} width={225}>
							{isLoading ? <Spinner color='white' /> : `${t('common.add')}`}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default MenuAddUpdate;
