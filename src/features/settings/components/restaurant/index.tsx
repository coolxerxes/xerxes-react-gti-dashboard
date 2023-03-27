import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import Banner from 'components/Banner';
import Input from 'components/Input';
import { type RestaurantInput } from 'features/settings/types';
import Switch from 'components/Switch';
import Button from 'components/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import Select from 'components/Select';
import Flag from 'assets/images/flag.svg';
import { HiChevronDown } from 'react-icons/hi';
import { FiMapPin } from 'react-icons/fi';
import { MdOutlineAttachment } from 'react-icons/md';
import { BsQuestionCircle } from 'react-icons/bs';
import CheckBox from 'components/CheckBox';
import TextEditor from 'components/TextEditor';
import { useEnumSelector, useGetEnums } from 'hooks';

import { week } from './constants';
import LocationModal from 'components/LocationModal/Index';
import Spinner from 'components/Spinner';
import { useUpdateRestaurant } from 'features/settings/api/updateRestaurant';
import { useCreateRestaurant } from 'features/settings/api/createResturant';
import { useDeleteRestaurant } from 'features/settings/api/deleteRestaurant';
import { useGetRestaurants } from 'features/settings/api/getRestaurants';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'redux/hooks';

const Restaurant: React.FC = () => {
	const [loadingType, setLoadingType] = useState<'delete' | 'save'>('save');
	const { t, i18n } = useTranslation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const updateRestaurant = useUpdateRestaurant({});
	const createRestaurant = useCreateRestaurant({});
	const deleteRestaurant = useDeleteRestaurant({});
	const { data: restaurantData, refetch } = useGetRestaurants({});
	const restaurants = restaurantData?.data.docs;
	const isCashier = useAppSelector(
		(state) => state.resources.auth.user?.cashier
	);

	const [isOpen, setIsOpen] = useState(false);
	const [zoom, setZoom] = useState(4);
	const getEnums = useGetEnums();
	const { enums } = useEnumSelector();
	const { handleSubmit, control, watch, register, setValue, reset } =
		useForm<RestaurantInput>({
			defaultValues: {
				// TODO: move below codes to constants
				enableWhatsappCommunication: false,
				isDefaultWorkingHours: true,
				isAppOrderEnabled: true,
				isPickupOrderEnabled: true,
				isDeliveryEnabled: true,
				isScheduledOrderEnabled: true,
				isMenuBrowsingEnabled: true,
				name: '',
				nameAr: '',
				city: '',
				id: '',
				beforeConfirmOrderMessage: { ar: '', en: '' },
				enableTermsAndConditionsForOrders: true,
				isDeliveryToCarEnabled: false,
				isReservationEnabled: false,
				isWaitingEnabled: false,
				location: {},
				minimumDeliveryOrderValue: 100,
				whatsappNumber: '',
				terms: undefined,
				overrideWorkingHours: [],
				defaultWorkingHours: {
					start: '09:00',
					end: '17:00',
				},
			},
		});

	const onSubmit: SubmitHandler<RestaurantInput> = async (data) => {
		// TODO: data modification should go to a separate helper files
		const overrideWorkingHours = data?.overrideWorkingHours?.filter(
			(item) => item.start !== '' && item.start !== undefined
		);
		const tempData = {
			...data,
			overrideWorkingHours,
			city: data.location?.city ?? '',
			minimumDeliveryOrderValue: Number(data.minimumDeliveryOrderValue),
			location: {
				...data?.location,
				zipCode: Number(data.location?.zipCode ?? 0),
			},
		};
		setLoadingType('save');
		setIsLoading(true);
		if (watch('id')) {
			await updateRestaurant.mutateAsync({
				id: watch('id'),
				payload: tempData,
			});
			void refetch();
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setIsLoading(false);
			return;
		}
		await createRestaurant.mutateAsync(tempData);
		void refetch();
		reset({ ...restaurants?.[0] });
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setIsLoading(false);
	};

	const deleteHandler = async (): Promise<void> => {
		setIsLoading(true);
		await deleteRestaurant.mutateAsync(watch('id'));
		void refetch();
		reset({ ...restaurants?.[0] });
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setIsLoading(false);
	};

	useEffect(() => {
		getEnums({ enums: 'OrderTypes' });
	}, [getEnums]);

	const overrideWorkingHours = watch('overrideWorkingHours');
	const orderTypesEnums = enums.find(
		(enumItem) => enumItem.name === 'OrderTypes'
	)?.values;

	const latitude = watch('location.latitude') ?? '24.808556072323725';
	const longitude = watch('location.longitude') ?? '46.70356750488282';

	useEffect(() => {
		const firstResturant = restaurants?.[0];

		reset({ ...firstResturant });
	}, [restaurants]);

	// TODO: we can move to multiple files based on section
	return (
		<div>
			<div className='w-full bg-white h-[60px] flex items-center rounded-lg justify-between my-5 sticky top-[11%] z-[100]'>
				<Banner>
					<span className='font-dinBold xl:text-[21px] text-xl space-[-0.38px] ml-3'>
						{t('restaurant.restaurant')}
					</span>
					<Button
						className='mr-10 xl:text-base'
						height={40}
						width={160}
						type='button'
						onClick={() => {
							const defaultValues = {
								// TODO: move below codes to constants
								enableWhatsappCommunication: false,
								isDefaultWorkingHours: false,
								isAppOrderEnabled: false,
								isPickupOrderEnabled: false,
								isDeliveryEnabled: false,
								isScheduledOrderEnabled: false,
								isMenuBrowsingEnabled: false,
								name: '',
								nameAr: '',
								city: '',
								id: '',
								beforeConfirmOrderMessage: { ar: '', en: '' },
								enableTermsAndConditionsForOrders: false,
								isDeliveryToCarEnabled: false,
								isReservationEnabled: false,
								isWaitingEnabled: false,
								location: {
									city: '',
									country: '',
									address: '',
									district: '',
									state: '',
								},
								minimumDeliveryOrderValue: 100,
								whatsappNumber: '',
								terms: undefined,
								overrideWorkingHours: [],
								defaultWorkingHours: {
									start: '09:00',
									end: '17:00',
								},
							};
							reset({ ...defaultValues });
						}}
					>
						{t('restaurant.addrestaurant')}
					</Button>
				</Banner>
			</div>
			<div className='w-full sticky top-[20%] z-[100]  flex items-center 5 bg-white'>
				<div className='flex items-center justify-evenly'>
					{restaurants?.map((item, index) => {
						return (
							<div
								className='cursor-pointer py-1 font-bold  mx-1 xl:text-base'
								onClick={() => {
									reset({ ...item });
								}}
								key={index}
							>
								{watch('id') === item._id ? (
									<Button className='!w-max'>{item.name}</Button>
								) : (
									<span className='min-h-fit rounded-small text-[#ABA5A2] py-2 px-2 bg-[#F5F5F5]'>
										{item.name}
									</span>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className='z-0 relative'>
				<form
					className='bg-white mt-5 pt-5 font-bold lg:pr-[89px] xl:text-base'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-2  gap-y-4 gap-x-5 px-4 pt-5'>
						<div>
							<Input
								name='nameAr'
								register={register}
								placeholder='Type Name In Arabic'
								label={t('common.nameinarabic')}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='name'
								placeholder='Type Name in English'
								register={register}
								label={t('common.nameinenglish')}
							/>
						</div>
					</div>
					<br />
					<div className='grid grid-cols-2  gap-4 px-4'>
						<div>
							<Input
								type='text'
								name='location.country'
								placeholder='Enter your country'
								label={t('restaurant.country')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='location.address'
								placeholder='Enter your address'
								label={t('restaurant.address')}
								register={register}
							/>
						</div>
					</div>
					<br />
					<div className='grid grid-cols-2  gap-4 px-4'>
						<div>
							<Input
								name='location.city'
								placeholder='City Name'
								label={t('restaurant.city')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='location.state'
								placeholder='Enter your state'
								label={t('restaurant.state')}
								register={register}
							/>
						</div>
					</div>
					<br />

					<div className='grid grid-cols-2  gap-4 px-4'>
						<div>
							<Input
								type='text'
								name='location.district'
								placeholder='District Name'
								label={t('restaurant.district')}
								register={register}
							/>
						</div>

						<div>
							<Input
								type='number'
								name='location.zipCode'
								placeholder='Enter zip code'
								label={t('restaurant.zipcode')}
								register={register}
							/>
						</div>
					</div>
					<br />

					<div className='grid grid-cols-2  gap-4 px-4'>
						<div>
							<Input
								type='number'
								name='minimumDeliveryOrderValue'
								placeholder='Minimum Price For Delivery Orders'
								label={t('restaurant.minimumpricefordelivery')}
								register={register}
							/>
						</div>

						<div className='w-full flex justify-between items-end text-left mt-2'>
							<div className='flex items-center'>
								<div>
									<p className='text-base'>{t('restaurant.location')}</p>
									<Button
										onClick={() => {
											setIsOpen(!isOpen);
										}}
										className='w-52 mt-2'
										height={35}
										width={210}
									>
										<div className='flex items-center'>
											<AiOutlinePlus className='-ml-3' />
											<span className='ml-2'>
												{t('restaurant.choosebranchlocation')}
											</span>
										</div>
									</Button>
								</div>
								<div className='flex h-fit items-center bg-primary text-white p-2 rounded-lg mt-8 ml-3'>
									<span>
										{watch('location.latitude')
											? Number(watch('location.latitude')).toFixed(2)
											: Number(latitude).toFixed(2)}
										N,{' '}
										{watch('location.longitude')
											? Number(watch('location.longitude')).toFixed(2)
											: Number(longitude).toFixed(2)}
										W
									</span>{' '}
									<span className='ml-2'>
										<FiMapPin />
									</span>
								</div>
							</div>
							<LocationModal
								values={{ longitude, latitude }}
								isModalOpen={isOpen}
								setIsModalOpen={setIsOpen}
								onSelect={(marker, zoom) => {
									setValue('location.latitude', marker?.lng?.toString());
									setValue('location.longitude', marker?.lng?.toString());
									setZoom(zoom);
								}}
								zoom={zoom}
							/>
						</div>
					</div>
					<br />
					<div className='grid grid-cols-2  gap-4 px-4'>
						<div className='bg-red relative z-10 text-start'>
							<p className='mb-3'>
								{t('restaurant.sendnotficationonwhatsapp')}
							</p>
							<Controller
								name='enableWhatsappCommunication'
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										selected={watch('enableWhatsappCommunication')}
										className='!h-[50px]'
										options={[
											{ value: true, label: 'Active' },
											{ value: false, label: 'Inactive' },
										]}
									/>
								)}
							/>
						</div>
						<div className='bg-red relative z-10 text-start'>
							<Input
								type='number'
								prefix={
									<>
										<img
											src={Flag}
											alt='flag'
											className='w-[32px] h-[22px] cursor-pointer'
										/>
										<span className='ml-2 text-normalBlack'>+996</span>
										<HiChevronDown
											className='h-5 w-5 text-gray-400 ml-2'
											aria-hidden='true'
										/>
									</>
								}
								name='whatsappNumber'
								placeholder='Enter your whats app number'
								label={t('common.branchphone')}
								register={register}
							/>
						</div>
					</div>
					<br />
					<div className='flex items-center  justify-between'>
						<span className='text-primary font-dinBold xl:text-[17px] text-base w-1/2'>
							{t('restaurant.cartmessagedisplaytocustomers')}
						</span>
						<div className='h-[.5px] w-[83%] bg-gray ml-2 mt-1 mr-5'></div>
					</div>
					<br />
					<div className='grid grid-cols-2  gap-4 px-4'>
						<div>
							<Input
								type='text'
								name='beforeConfirmOrderMessage.ar'
								placeholder='Text Message (Arabic)'
								label={t('restaurant.textmsgar')}
								register={register}
							/>
						</div>

						<div className='w-full flex flex-col text-left mt-2'>
							<Input
								type='text'
								name='beforeConfirmOrderMessage.en'
								placeholder='Text Message (English)'
								label={t('restaurant.textmsgen')}
								register={register}
							/>
						</div>
					</div>

					<br />
					<div className='flex items-center w-full '>
						<span className='text-primary font-dinBold w-40 xl:text-base'>
							{t('restaurant.workhours')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1 mr-5'></div>
					</div>
					<br />

					<div className='flex ml-2 w-[50%] xl:text-[17px]'>
						<div className='w-[100px] mt-5 ml-4'>
							<CheckBox
								name='isDefaultWorkingHours'
								checked={watch('isDefaultWorkingHours')}
								onChange={(value: any) => {
									setValue('isDefaultWorkingHours', value as boolean);
								}}
								label='Everyday'
							/>
						</div>

						<div className='w-full flex flex-col text-left mt-2'>
							<div className='w-[200px] ml-4'>
								<Input
									type='time'
									name='defaultWorkingHours.start'
									label={t('restaurant.from')}
									register={register}
									disabled={!watch('isDefaultWorkingHours')}
								/>
							</div>
						</div>
						<div className='w-full flex flex-col text-left mt-2'>
							<div className='w-[200px] ml-4'>
								<Input
									type='time'
									name='defaultWorkingHours.end'
									label={t('restaurant.to')}
									disabled={!watch('isDefaultWorkingHours')}
									register={register}
								/>
							</div>
						</div>
					</div>

					{week.map((item, index) => {
						const isFind = overrideWorkingHours?.find(
							(oItem) => oItem.day === item.day
						);

						return (
							<div
								key={index}
								className='flex ml-2 my-1 w-[50%] xl:text-[17px]'
							>
								<div className='w-[100px] mt-5 ml-4 '>
									<CheckBox
										name='isDefaultWorkingHours'
										checked={!!isFind?.isActive}
										onChange={(value: any) => {
											const newData = [...overrideWorkingHours];
											if (value) {
												newData.push({
													day: item.day,
													start: '00:00 AM',
													end: '00:00 AM',
													isActive: true,
												});
												setValue('overrideWorkingHours', newData);
											} else {
												const restData = newData.filter(
													(nData) => nData?.day !== item?.day
												);
												setValue('overrideWorkingHours', restData);
											}
										}}
										label={item.day}
									/>
								</div>

								<div className='w-full flex flex-col text-left mt-2'>
									<div className='w-[200px] ml-4'>
										<Input
											type='time'
											name={`overrideWorkingHours.${index}.start`}
											label={t('restaurant.from')}
											register={register}
											disabled={!isFind?.isActive}
										/>
									</div>
								</div>
								<div className='w-full flex flex-col text-left mt-2'>
									<div className='w-[200px] ml-4'>
										<Input
											type='time'
											name={`overrideWorkingHours.${index}.end`}
											label={t('restaurant.to')}
											register={register}
											disabled={!isFind?.isActive}
										/>
									</div>
								</div>
							</div>
						);
					})}
					<br />

					<div className='flex items-center pr-8'>
						<span className='text-primary min-w-[100px] font-dinBold xl:text-[17px]'>
							{t('restaurant.branchinfo')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>

					<div className='grid grid-cols-3  gap-4 px-4 xl:text-[17px]'>
						<Button className='!w-fit mt-2' height={35}>
							<div className='flex items-center'>
								<span className='ml-2'>{t('restaurant.tables')}</span>
							</div>
						</Button>
						<Button className='!w-fit mt-2' height={35}>
							<div className='flex items-center'>
								<span className='ml-2'>{t('restaurant.waitingareas')}</span>
							</div>
						</Button>
						<Button className='!w-fit mt-2' height={35}>
							<div className='flex items-center'>
								<span className='ml-2'>{t('restaurant.reservations')}</span>
							</div>
						</Button>
						<div className='mt-2'>
							<Controller
								name='isDeliveryEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.branchstatus')}
										</label>
										<Switch checked={true} type='Success' {...field} />
									</div>
								)}
							/>
						</div>
						<div className='mt-2'>
							<Controller
								name='isPickupOrderEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.pickuporders')}
										</label>
										<Switch
											checked={watch('isPickupOrderEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
						<div className='mt-2'>
							<Controller
								name='isDeliveryEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.deliveryorders')}
										</label>
										<Switch
											checked={watch('isDeliveryEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>

						<div className='mt-2'>
							<Controller
								name='isDeliveryToCarEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.deliverytocar')}
										</label>
										<Switch
											checked={watch('isDeliveryToCarEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
						<div className='mt-2'>
							<Controller
								name='isMenuBrowsingEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.showrestaurantmenu')}
										</label>
										<Switch
											checked={watch('isMenuBrowsingEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
						<div className='mt-2'>
							<Controller
								name='isScheduledOrderEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.scheduledorders')}
										</label>
										<Switch
											checked={watch('isScheduledOrderEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
					</div>

					<div className='flex items-center my-4 pl-4 pr-8'>
						<span className='text-primary !min-w-fit text-left font-dinBold xl:text-[17px]'>
							{t('restaurant.ordertermsandcondition')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>

					<div className='grid grid-cols-2 my-4  gap-4 px-4 xl:text-[17px]'>
						<div>
							<Controller
								name='enableTermsAndConditionsForOrders'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.enabletermsfororders')}
										</label>
										<Switch
											checked={watch('enableTermsAndConditionsForOrders')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>

						<div className='z-10'>
							<p className='mb-3 text-start'>
								{t('restaurant.customersnotelanguage')}
							</p>
							<Controller
								name='terms.0.type'
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										selected={watch('terms.0.type')}
										className='!h-[50px]'
										options={
											orderTypesEnums?.map((item) => ({
												value: item.en,
												label: item.en,
											})) ?? []
										}
									/>
								)}
							/>
						</div>
					</div>

					<div className='grid grid-cols-2 my-4  gap-4 px-4 xl:text-[17px]'>
						<div>
							<p className='mb-3 text-start'>
								{t('restaurant.termsandconditionsar')}
							</p>

							<TextEditor
								value={watch('terms.0.termsAr')}
								onChange={(e: any) => {
									setValue('terms.0.termsAr', e);
								}}
							/>
						</div>

						<div>
							<p className='mb-3 text-start'>
								{t('restaurant.termsandconditionsen')}
							</p>
							<TextEditor
								value={watch('terms.0.termsEn')}
								onChange={(e: any) => {
									setValue('terms.0.termsEn', e);
								}}
							/>
						</div>
					</div>
					<br />

					<div className='flex items-center my-4 pl-4 pr-8'>
						<span className='text-primary text-left !min-w-fit font-dinBold xl:text-[17px]'>
							{t('restaurant.app')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>

					<div className='grid grid-cols-3 my-4  gap-4 px-4 xl:text-[17px]'>
						<div>
							<Controller
								name='isAppOrderEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.pickupstatusapp')}
										</label>
										<Switch
											checked={watch('isAppOrderEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
						<div>
							<Controller
								name='isWaitingEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.waitingstatusapp')}
										</label>
										<Switch
											checked={watch('isWaitingEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>

						<div>
							<Controller
								name='isReservationEnabled'
								control={control}
								render={({ field }) => (
									<div className='flex items-center'>
										<label className='mr-3' htmlFor=''>
											{t('restaurant.reservationstatusapp')}
										</label>
										<Switch
											checked={watch('isReservationEnabled')}
											type='Success'
											{...field}
										/>
									</div>
								)}
							/>
						</div>
					</div>

					<div className='flex items-center pl-4 my-4 pr-8'>
						<span className='text-primary text-left !min-w-fit font-dinBold xl:text-[17px]'>
							{t('restaurant.googlemaplinksforbranch')}
						</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
					</div>

					<div className='grid grid-cols-3 my-4  gap-4 px-4'>
						<div className='font-bold'>
							<Input
								suffix={
									<>
										<MdOutlineAttachment className='w-7 h-7 text-[#AAAAAA]' />
									</>
								}
								prefix={<span className='text-[#B1ABAA]'>https://</span>}
								name='vatNumber'
								placeholder='Main Branch'
								register={register}
								label={
									<div className='flex items-center xl:text-[17px]'>
										<span className='mr-2'>{t('restaurant.mainbranch')}</span>{' '}
										<BsQuestionCircle />{' '}
									</div>
								}
							/>
						</div>
					</div>

					<div className='flex justify-end mr-4'>
						<Button
							variant='ghost'
							className='mr-4 mt-2 rounded-small '
							height={50}
							width={200}
							onClick={async () => {
								setLoadingType('delete');
								await deleteHandler();
							}}
							disable={isLoading}
							type='button'
						>
							{isLoading && loadingType === 'delete' ? (
								<Spinner />
							) : (
								`${t('common.deletebranch')}`
							)}
						</Button>
						<Button
							type='submit'
							className=' mt-2 !rounded-small '
							height={50}
							width={200}
							disable={isLoading}
						>
							{isLoading && loadingType === 'save' ? (
								<Spinner color='white' />
							) : (
								`${t('common.save')}`
							)}
						</Button>
					</div>
					<br />
					<br />
				</form>
			</div>
		</div>
	);
};

export default Restaurant;
