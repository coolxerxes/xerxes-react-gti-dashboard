import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import ImagePreview from 'components/ImagePreview';
import { type MenuCategory } from 'features/menu/api/types';
import Upload from 'components/Upload';
import Banner from 'components/Banner';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import { useCreateMenuCategory } from 'features/menu/api/createMenuCategory';

import ArrowIcon from '../../../../../assets/images/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'components/Spinner';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const CategoryAdd: React.FC = () => {
	const createMenuCategory = useCreateMenuCategory();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { t, i18n } = useTranslation();
	const { handleSubmit, watch, register, setValue } = useForm<MenuCategory>({});

	const onSubmit = async (data: MenuCategory): Promise<void> => {
		try {
			setIsLoading(true);
			await createMenuCategory.mutateAsync({ ...data });
			toast.success('Successfully created!');
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className='w-full  h-[60px] flex items-center rounded-lg sticky top-[11%] z-[100] my-5'>
				<Banner>
					<div
						className={classNames({
							'font-bold flex text-2xl items-center ml-4 gap-2 flex-row w-full ':
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
						<span>{t('menu.addNewCategory')}</span>
					</div>
				</Banner>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full z-1 min-h-[35px] bg-white rounded-lg  mt-5'
			>
				<div className='bg-white min-h-[60vh] mt-5'>
					<div className='grid grid-cols-2 mt-4 pt-4  gap-4 px-4'>
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
					</div>
					<div
						className={classNames({
							'flex items-center my-4 pl-4 pr-4': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<span className='text-primary !min-w-fit text-left font-bold'>
							{t('common.pictures')}
						</span>
						<div
							className={classNames({
								'h-[.5px] w-full bg-gray ml-2 mt-1': true,
								'mr-2': i18n.resolvedLanguage === 'ar',
							})}
						></div>
					</div>

					<div className='mx-4 pt-2 pb-4'>
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

					<div className='mx-4'>
						<CheckBox
							name='taxEnabled'
							checked={true}
							onChange={(value: any) => {
								setValue('image', '');
							}}
							label={'Custom Time'}
						/>
					</div>
					{i18n.resolvedLanguage === 'ar' ? (
						<div className='grid grid-cols-2 mt-4 pt-4  gap-4 px-4'>
							<div>
								<Input
									type='time'
									name='defaultWorkingHours.end'
									label={t('common.to')}
									register={register}
								/>
							</div>
							<div>
								<Input
									type='time'
									name='defaultWorkingHours.start'
									label={t('common.from')}
									register={register}
								/>
							</div>
						</div>
					) : (
						<div className='grid grid-cols-2 mt-4 pt-4  gap-4 px-4'>
							<div>
								<Input
									type='time'
									name='defaultWorkingHours.start'
									label={t('common.from')}
									register={register}
								/>
							</div>

							<div>
								<Input
									type='time'
									name='defaultWorkingHours.end'
									label={t('common.to')}
									register={register}
								/>
							</div>
						</div>
					)}

					<div className='flex justify-end py-4  mx-4'>
						<Button
							onClick={() => {
								navigate(-1);
							}}
							height={45}
							width={208}
							variant='ghost'
						>
							{t('common.cancel')}
						</Button>
						<Button className='ml-4' height={45} width={208} type='submit'>
							{isLoading ? <Spinner color='white' /> : `${t('common.add')}`}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CategoryAdd;
