import { useForm, type SubmitHandler, Controller } from 'react-hook-form';

import Input from 'components/Input';
import { type SettingInput } from 'features/settings/types';
import Switch from 'components/Switch';

import Flag from 'assets/images/flag.svg';
import { HiChevronDown } from 'react-icons/hi';
import { AiFillTwitterSquare, AiOutlineCopy } from 'react-icons/ai';
import { FaSnapchatSquare, FaWhatsappSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import ImagePreview from 'components/ImagePreview';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import Upload from 'components/Upload';
import Textarea from 'components/Textarea';
import Spinner from 'components/Spinner';
import { useGetSupplierSelf } from 'features/settings/api/getSupplierSelf';
import { useUpdateSupplier } from 'features/settings/api/updateSupplier';
import { copyToClipboard } from 'utils/copyToClipBoard';
import { toast } from 'react-toastify';
import Banner from 'components/Banner';
import { useTranslation } from 'react-i18next';

const suffixDomain = '.talabatmenu.com';

const General: React.FC = () => {
	const { data: supplierData } = useGetSupplierSelf({});
	const { t, i18n } = useTranslation();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const supplierUpdate = useUpdateSupplier({});
	const supplier = supplierData?.data;
	const { handleSubmit, control, watch, register, reset, setValue } =
		useForm<SettingInput>({});

	const onSubmit: SubmitHandler<SettingInput> = async (data) => {
		setIsLoading(true);
		try {
			await supplierUpdate
				.mutateAsync({
					...data,

					reservationFee: Number(data?.reservationFee),
					domain: data.domain + suffixDomain,
				})
				.then((res) => {
					toast.success('Settings updated successfully');
				});
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		reset({ ...supplier, domain: supplier?.domain.replace(suffixDomain, '') });
	}, [supplier, reset]);

	return (
		<div>
			<div className='w-full bg-white h-[60px] flex items-center rounded-lg justify-between my-5 sticky top-[11%] z-[100]'>
				<Banner>
					<span className='font-dinBold text-xl xl:text-[21px] space-[-0.38px] ml-3'>
						{t('general.generalsettings')}
					</span>
				</Banner>
			</div>
			<form
				className='bg-white relative rounded-lg lg:pr-[89px]'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-y-4 gap-x-5 px-4 pt-5 xl:text-base'>
					<div className='font-bold'>
						<Input
							name='nameAr'
							register={register}
							placeholder='Type Name In Arabic'
							label={`${t('common.nameinarabic')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							name='name'
							placeholder='Type Name in English'
							register={register}
							label={`${t('common.nameinenglish')}`}
						/>
					</div>

					<div className='font-bold'>
						<Textarea
							name='aboutAr'
							placeholder='Type simple overview in Arabic'
							register={register}
							label={`${t('general.simpleoverviewar')}`}
							resize='resize-none'
						/>
					</div>

					<div className='font-bold'>
						<Textarea
							name='about'
							placeholder='Type simple overview in English'
							register={register}
							label={`${t('general.simpleoverviewen')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							name='vatNumber'
							placeholder='Type VAT number'
							register={register}
							label={`${t('general.vat')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							name='email'
							placeholder='Email'
							register={register}
							label={`${t('general.email')}`}
						/>
					</div>
					<div className='bg-red font-bold relative text-start'>
						<Input
							type='text'
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
							name='phoneNumber'
							placeholder='Enter your whats app number'
							label={`${t('common.branchphone')}`}
							register={register}
						/>
					</div>
				</div>

				<div className='flex items-center mb-2.5 mt-4'>
					<span className='text-primary font-dinBold min-w-[200px] xl:text-[17px] text-base'>
						{t('general.taxandreservationsetup')}
					</span>
					<div className='h-[.5px] w-full   bg-gray ml-2 mt-1 mr-4'></div>
				</div>

				<div className='flex justify-between items-center  gap-4 px-4'>
					<div>
						<Controller
							name='taxEnabled'
							control={control}
							render={({ field }) => (
								<div className='flex items-center xl:text-base'>
									<label className='mr-3' htmlFor=''>
										{t('general.taxenabled')}
									</label>
									<Switch
										checked={watch('taxEnabled')}
										type='Success'
										{...field}
									/>
								</div>
							)}
						/>
					</div>
					<div>
						<Controller
							name='taxEnabledOnReservationFee'
							control={control}
							render={({ field }) => (
								<div className='flex items-center'>
									<label className='mr-3' htmlFor=''>
										{t('general.taxreservationfee')}
									</label>
									<Switch
										checked={watch('taxEnabledOnReservationFee')}
										type='Success'
										{...field}
									/>
								</div>
							)}
						/>
					</div>

					<div>
						<Controller
							name='taxEnabledOnTableFee'
							control={control}
							render={({ field }) => (
								<div className='flex items-center'>
									<label className='mr-3' htmlFor=''>
										{t('general.taxtablefee')}
									</label>
									<Switch
										checked={watch('taxEnabledOnTableFee')}
										type='Success'
										{...field}
									/>
								</div>
							)}
						/>
					</div>
				</div>

				<div className='grid grid-cols-2 mt-4  gap-4 px-4 xl:text-base'>
					<div className='font-bold'>
						<Input
							name='taxRate'
							type='number'
							placeholder='Tax Rate'
							register={register}
							label={`${t('general.taxrate')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							name='reservationFee'
							type='number'
							placeholder='Reservation Fee'
							register={register}
							label={`${t('general.reservationfee')}`}
						/>
					</div>
				</div>

				<div className='grid grid-cols-2 mt-4 gap-6 px-4 xl:text-base'>
					<div className='flex flex-col gap-y-3  w-full'>
						<div className='flex items-center w-full gap-x-3'>
							<p className='text-primary font-dinBold  text-left'>
								{t('general.logo')}
							</p>
							<hr
								className='w-full '
								style={{
									color: '#E2E2E2',
								}}
							/>
						</div>
						<div className='w-full h-[200px] flex justify-center items-center'>
							<Upload
								onChange={(url) => {
									setValue('logo', url);
								}}
							/>
						</div>

						{watch('logo') && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: watch('logo'),
									}}
									onRemove={() => {
										setValue('logo', '');
									}}
									progress={100}
								/>
							</div>
						)}
					</div>
					<div className='flex flex-col gap-y-3  w-full'>
						<div className='flex items-center w-full gap-x-3'>
							<p className='text-primary font-dinBold  text-left w-fit'>
								{' '}
								{t('general.cover')}
							</p>
							<hr
								className='grow'
								style={{
									color: '#E2E2E2',
								}}
							/>
						</div>

						<div className='w-full h-[200px] flex justify-center items-center'>
							<Upload
								onChange={(url) => {
									setValue('backgroundImage', url);
								}}
							/>
						</div>

						{watch('backgroundImage') && (
							<div className='w-full bg-lightRedBackground  mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: watch('backgroundImage'),
									}}
									onRemove={() => {
										setValue('backgroundImage', '');
									}}
									progress={100}
								/>
							</div>
						)}
					</div>
				</div>

				<div className='flex px-4 items-center mt-4 mb-2.5 xl:text-base'>
					<span className='text-primary font-dinBold min-w-[120px]'>
						{t('general.socialaccounts')}
					</span>
					<div className='h-[.5px] w-full bg-gray ml-2 mt-1 mr-4'></div>
				</div>

				<div className='grid grid-cols-2 mt-3  gap-4 px-4 xl:text-base'>
					<div className='font-bold'>
						<Input
							suffix={
								<>
									<AiFillTwitterSquare className='w-7 h-7 text-suffixDisableColor' />
								</>
							}
							prefix={<span className='text-prefixDisableColor'>https://</span>}
							name='twitter'
							placeholder='Twitter'
							register={register}
							label={`${t('general.twitter')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							suffix={
								<>
									<FaSnapchatSquare className='w-7 h-7 text-suffixDisableColor' />
								</>
							}
							prefix={<span className='text-prefixDisableColor'>https://</span>}
							name='instagram'
							placeholder='Instagram'
							register={register}
							label={`${t('general.instagram')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							suffix={
								<>
									<FiInstagram className='w-7 h-7 text-suffixDisableColor' />
								</>
							}
							prefix={<span className='text-prefixDisableColor'>https://</span>}
							name='snapchat'
							placeholder='Snapchat'
							register={register}
							label={`${t('general.snapchat')}`}
						/>
					</div>

					<div className='font-bold'>
						<Input
							suffix={
								<>
									<SiTiktok className='w-7 h-7 text-suffixDisableColor' />
								</>
							}
							prefix={<span className='text-prefixDisableColor'>https://</span>}
							name='tiktok'
							placeholder='Tiktok'
							register={register}
							label={`${t('general.tiktok')}`}
						/>
					</div>

					<div className='bg-red relative z-0 text-start font-bold'>
						<Input
							type='text'
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
							suffix={
								<>
									<FaWhatsappSquare className='w-7 h-7 text-suffixDisableColor' />
								</>
							}
							name='whatsapp'
							placeholder='Whatsapp'
							label={`${t('general.whatsapp')}`}
							register={register}
						/>
					</div>
				</div>

				<div className='flex items-center mt-4 mb-2.5 px-6'>
					<span className='text-primary font-dinBold min-w-[550px] xl:text-base'>
						{t('general.linktomainpage')}
					</span>
					<div className='h-[.5px] w-full   bg-gray ml-2 mt-1 mr-4'></div>
				</div>
				<div className='flex items-center w-full ml-2 mt-2 pl-3'>
					<Input
						name='domain'
						register={register}
						suffix={<span className='text-gray'>{suffixDomain}</span>}
					/>
					<AiOutlineCopy
						className='ml-1 cursor-pointer'
						onClick={() => {
							copyToClipboard(`${watch('domain')}${suffixDomain}`, true);
						}}
					/>
				</div>

				<div className='w-full flex justify-end p-5 xl:text-base'>
					<Button type='submit' width={200} height={45}>
						{isLoading ? <Spinner color='white' /> : `${t('common.save')}`}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default General;
