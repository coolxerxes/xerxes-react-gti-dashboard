import Banner from 'components/Banner';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from 'components/Button';
import AddItemcard from 'components/AddItemCard';
import ItemCard from 'components/ItemCard';
import React, { useEffect, useState } from 'react';
import { ADMIN } from 'routes/constants';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import { useGetMenuCategories } from 'features/menu/api/getMenuCategories';
import { useDeleteMenuItem } from 'features/menu/api/deleteMenuItem';
import { useUpdateMenuItem } from 'features/menu/api/updateMenuItem';
import Spinner from 'components/Spinner';
import Input from 'components/Input';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import MenuCarousel from 'features/order/components/MenuCarousel';
import { type MenuCategory } from 'features/menu/api/types';
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	const { search } = useLocation();
	console.log('🚀 ~ file: Menu.tsx:23 ~ useQuery ~ search:', search);

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Menu: React.FC = () => {
	const navigate = useNavigate();
	const category = useQuery();
	const { t, i18n } = useTranslation();

	const [activeCategory, setActiveCategory] = useState<
		MenuCategory | undefined
	>(undefined);
	const { data: menuCategoryData, isLoading: isMenuCategoryDataLoading } =
		useGetMenuCategories({
			params: {
				pagination: false,
			},
		});
	const updateMenuItem = useUpdateMenuItem({});
	const [categoryId, setCategoryId] = useState<string | undefined>(
		category.get('category') as string
	);
	const [loading, setLoading] = useState<string | undefined>();
	const [searchInputValue, setSearchInputValue] = useState('');
	const deleteMenuItem = useDeleteMenuItem({});
	const {
		data: menuData,
		refetch,
		isLoading,
	} = useGetMenuItems({
		params: { categoryId, pagination: false, search: searchInputValue },
	});

	const menuItems = menuData?.data.docs;

	return (
		<div>
			<div className=' bg-[#F6F6F6] sticky top-[8%] z-[100] h-[30px]'></div>
			<div className='w-full h-[60px] flex items-center rounded-lg sticky top-[11%] z-[100] mb-5 '>
				<Banner className=' '>
					<span className='font-dinBold text-2xl  space-[-0.38px] xl:text-[25px]'>
						{t('menu.menu')}
					</span>
					<Button
						onClick={() => {
							navigate(ADMIN.PATHS.MENU_FOODS_ADD);
						}}
						className=' xl:text-base'
						height={40}
						width={160}
					>
						{t('menu.addNewItem')}
					</Button>
				</Banner>
			</div>

			<div
				className='w-full min-h-[80px] flex items-center mt-5 -z-10  catgs
			'
			>
				<div
					className={classNames({
						'w-[100%] flex bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg ':
							true,
						'flex-row-reverse': i18n.resolvedLanguage === 'ar',
					})}
				>
					<div
						className={classNames({
							'items-center  overflow-y-hidden  xl:text-base flex flex-wrap':
								true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div className='cursor-pointer py-1 font-bold  mx-1 '>
							<div
								className='cursor-pointer py-1 font-bold  mx-1 '
								onClick={() => {
									setCategoryId(undefined);
									navigate(ADMIN.PATHS.MENU_FOODS);
								}}
							>
								{!categoryId ? (
									<Button className='w-full'>{t('menu.all')}</Button>
								) : (
									<span className='min-h-fit rounded-small text-[#ABA5A2] py-2 px-2 bg-[#F5F5F5] w-full block'>
										{t('menu.all')}
									</span>
								)}
							</div>
						</div>
						<div className='flex items-center'>
							{menuCategoryData?.data.docs?.map((item, index) => {
								return (
									<div
										className='cursor-pointer py-1 font-bold  mx-1 '
										onClick={() => {
											setCategoryId(item.id);
											navigate(ADMIN.PATHS.MENU_FOODS + `?category=${item.id}`);
										}}
										key={index}
									>
										{categoryId && categoryId === item.id ? (
											<Button className='whitespace-nowrap'>
												{i18n.resolvedLanguage === 'en'
													? item.name
													: item.nameAr}
											</Button>
										) : (
											<span className='min-h-fit whitespace-nowrap rounded-small text-[#ABA5A2] py-2 px-2 bg-[#F5F5F5] !min-w-fit'>
												{i18n.resolvedLanguage === 'en'
													? item.name
													: item.nameAr}
											</span>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<div className='mx-4 align-baseline'>
						<div className='flex gap-2 flex-row w-full justify-end right-5 xl:text-base '>
							{categoryId && (
								<Button
									height={35}
									variant='dashed'
									onClick={() => {
										navigate(
											`${ADMIN.PATHS.MENU_FOODS_EDIT_CATEGORY}/${categoryId}`
										);
									}}
									className='font-semibold whitespace-nowrap'
								>
									{t('menu.editCategory')}
								</Button>
							)}
							<Button
								height={35}
								variant='dashed'
								className='font-semibold whitespace-nowrap'
								onClick={() => {
									navigate(ADMIN.PATHS.MENU_FOODS_ADD_CATEGORY);
								}}
							>
								<span className='mr-1 text-primary whitespace-nowrap'>+</span>
								{t('menu.addCategory')}
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div
				className={classNames({
					'min-h-[50px] bg-white flex items-center pl-5 rounded-3xl  pr-5 w-fit mt-5':
						true,
					'ml-auto': i18n.resolvedLanguage === 'ar',
				})}
			>
				<input
					type='text'
					className={classNames({
						'bh-full w-full  bg-white rounded-3xl pl-2 focus-visible:outline-none xl:text-base':
							true,
						'text-end': i18n.resolvedLanguage === 'ar',
					})}
					onChange={(e) => {
						setSearchInputValue(e.target.value);
					}}
					placeholder={`${t('common.searchItem')}`}
				/>
			</div>
			<div className='bg-white  mt-5 z-0 relative'>
				{isLoading ? (
					<Spinner />
				) : (
					<div
						className={classNames({
							'flex flex-wrap justify-start ': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div
							className='cursor-pointer'
							onClick={() => {
								navigate(ADMIN.PATHS.MENU_FOODS_ADD);
							}}
						>
							<AddItemcard />
						</div>
						{menuItems?.map((menu, index) => (
							<ItemCard
								key={index}
								details={{
									_id: menu._id,
									active: menu.active,
									image: menu.image,
									name: menu.name,
									nameAr: menu.nameAr,
									soldOut: menu.soldOut,
									starGain: menu.starGain,
								}}
								editItem={() => {
									navigate(`${ADMIN.PATHS.MENU_FOODS_EDIT}/${menu._id}`);
								}}
								deleteItem={async () => {
									setLoading(menu._id);
									await deleteMenuItem.mutateAsync(menu._id);
									await refetch();
									setLoading(undefined);
								}}
								updateIsActive={async (value, id) => {
									setLoading(menu._id);

									await updateMenuItem.mutateAsync({
										id,
										payload: { active: value },
									});
									await refetch();
									setLoading(undefined);
								}}
								updateSoldOut={async (value, id) => {
									setLoading(menu._id);

									await updateMenuItem.mutateAsync({
										id,
										payload: { soldOut: value },
									});
									await refetch();
									setLoading(undefined);
								}}
								isLoading={loading === menu._id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Menu;
