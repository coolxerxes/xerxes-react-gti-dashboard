import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Input from 'components/Input';
import ImagePreview from 'components/ImagePreview';
import { type MenuCategory } from 'features/menu/api/types';
import Upload from 'components/Upload';
import Banner from 'components/Banner';
import Button from 'components/Button';
import CheckBox from 'components/CheckBox';
import { useGetMenuCategoryById } from 'features/menu/api/getMenuCategoryById';
import { useEffect, useState } from 'react';
import { useUpdateMenuCategory } from 'features/menu/api/updateMenuCategory';
import ArrowIcon from 'assets/images/arrow.svg';
import Spinner from 'components/Spinner';
import { useDeleteMenuCategory } from 'features/menu/api/deleteMenuCategory';

const CategoryUpdate: React.FC = () => {
	const { categoryId } = useParams<{ categoryId: string }>();
	const [loadingType, setLoadingType] = useState<
		'delete' | 'update' | undefined
	>(undefined);
	const navigate = useNavigate();
	const updateMenuCategory = useUpdateMenuCategory({});
	const deleteCategory = useDeleteMenuCategory({});
	const { data: menuCategoryData } = useGetMenuCategoryById({
		id: categoryId as string,
	});

	const { handleSubmit, watch, register, reset, setValue } =
		useForm<MenuCategory>({});

	const onSubmit = async (data: MenuCategory): Promise<void> => {
		try {
			setLoadingType('update');
			await updateMenuCategory.mutateAsync({ ...data, id: data?.id });
			toast.success('Successfully Updated!');
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setLoadingType(undefined);
		}
	};

	const deleteCategoryHandler = async () => {
		try {
			setLoadingType('delete');
			await deleteCategory.mutateAsync(categoryId as string);
			toast.error('Delete successfully, redirecting back!');
			navigate(-1);
		} catch (error: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${error.message}`);
		} finally {
			setLoadingType(undefined);
		}
	};

	useEffect(() => {
		reset({ ...menuCategoryData?.data });
	}, [menuCategoryData?.data, reset]);

	return (
		<div>
			<div className='w-full z-0 h-[60px] bg-white flex items-center rounded-lg sticky top-[11%] z-[100] my-5'>
				<Banner>
					<span className='font-bold flex items-center text-2xl space-[-0.38px] ml-6'>
						<img
							src={ArrowIcon}
							height='20px'
							width='20px'
							className='cursor-pointer mx-2'
							onClick={() => {
								navigate(-1);
							}}
						/>
						<span>Update Category</span>
					</span>
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
								placeholder='Name In Arabic'
								label='Name In Arabic'
								register={register}
							/>
						</div>

						<div>
							<Input
								type='text'
								name='name'
								placeholder='Name In English'
								label='Name In English'
								register={register}
							/>
						</div>
					</div>

					<div className='flex items-center my-4 pl-4 pr-4'>
						<span className='text-primary !min-w-fit text-left '>Pictures</span>
						<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
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
							onChange={(value: any) => {}}
							label={'Custom Time'}
						/>
					</div>

					<div className='grid grid-cols-2 mt-4 pt-4  gap-4 px-4'>
						<div>
							<Input
								type='time'
								name='defaultWorkingHours.start'
								label='From'
								register={register}
							/>
						</div>

						<div>
							<Input
								type='time'
								name='defaultWorkingHours.end'
								label='To'
								// disabled={!watch('name')}
								register={register}
							/>
						</div>
					</div>

					<div className='flex justify-end py-4  mx-4'>
						<Button
							onClick={deleteCategoryHandler}
							height={45}
							width={208}
							variant='ghost'
						>
							{loadingType === 'delete' ? <Spinner /> : 'Delete'}
						</Button>
						<Button className='ml-4' height={45} width={208} type='submit'>
							{loadingType === 'update' ? <Spinner color='white' /> : 'Update'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CategoryUpdate;
