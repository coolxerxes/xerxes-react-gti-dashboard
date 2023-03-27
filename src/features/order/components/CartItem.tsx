import { useEffect, useState } from 'react';

import { BsPlus } from 'react-icons/bs';
import {
	decreaseQuantity,
	editQuantity,
	removeItem,
	setCart,
} from '../slices/CartSlice';

import { AiOutlineMinus } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { usePostOrderPreview } from '../api/postOrderPreview';
import { useParams } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import MenuItemModal from './MenuItemModal';
import { useTranslation } from 'react-i18next';

interface CartItemProps {
	item: any;
	index: number;
	restaurantIdFromTableRow?: string;
	isOrderEditModal?: boolean;
}

const CartItem = ({
	item,
	index,
	restaurantIdFromTableRow,
	isOrderEditModal = false,
}: CartItemProps) => {
	const cartItems = useAppSelector((state) => state.data.cartReducer.items);
	const cartData = useAppSelector((state) => state.data.cartReducer.cart);
	const [itemOrderId, setItemOrderId] = useState<string | null>(null);
	const orderType = useAppSelector((state) => state.data.cartReducer.orderType);
	const dispatch = useAppDispatch();
	const { i18n } = useTranslation();
	const { tableId, restaurantId } = useParams();
	const postOrderPreview = usePostOrderPreview();
	const handleRemoveItem = (index: number) => {
		dispatch(removeItem(index));
	};
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleIncraseQuantity = (itemIndex: number) => {
		dispatch(editQuantity(itemIndex));
	};

	const handleEditItem = (itemId: string) => {
		setItemOrderId(itemId);
		setIsModalOpen(true);
	};

	useEffect(() => {
		void postOrderPreview
			.mutateAsync({
				data: {
					restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
					source: 'Website',
					orderType: orderType !== '' ? (orderType as any) : 'Dine In',
					tableId: tableId ?? undefined,

					items: cartItems,
					deliveryAddress: {
						address: 'a',
						latitude: `22`,
						longitude: `22`,
						city: 'a',
						country: 'a',
						district: 'a',
						state: 'a',
						zipCode: 123,
					},
				},
			})
			.then((res) => {
				dispatch(setCart(res.data));
			});
	}, [cartItems, tableId, restaurantIdFromTableRow]);

	function handleDecreaseQuantity(itemId: number) {
		dispatch(decreaseQuantity(itemId));
	}

	return (
		<>
			<div className='bg-white flex p-[15px] border border-[#F5F5F5] rounded-lg shadow'>
				<div className='flex  grow items-center gap-2.5'>
					<div className='relative'>
						<div className='relative rounded-[10px]'>
							<img
								className='min-h-[93px] min-w[93px]'
								width={93}
								height={93}
								src={
									item?.menuItem?.image
										? item?.menuItem?.image
										: 'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
								}
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions

								style={{
									borderRadius: 10,
									objectFit: 'cover',
								}}
							/>
						</div>
					</div>
					<div className='flex items-start  flex-col grow'>
						<div className='flex items-center w-full justify-between'>
							<h1 className={`text-[17px] text-[#1E3A56] font-semibold`}>
								{i18n.resolvedLanguage === 'ar'
									? item?.menuItem?.nameAr
									: item?.menuItem?.name}
							</h1>
							{isOrderEditModal && (
								<div
									className='cursor-pointer'
									onClick={() => {
										handleEditItem(item?.menuItem?.menuItemId);
									}}
								>
									<FaRegEdit className='w-5 h-5' />
								</div>
							)}
						</div>
						<div>
							{item?.additions?.map((addition: any) => {
								return addition?.options?.map((option: any, index: number) => (
									<span
										key={index}
										className='text-xs font-normal text-[#ABA5A2]'
									>
										{i18n.resolvedLanguage === 'ar'
											? option?.nameAr
											: option?.name}
									</span>
								));
							})}
						</div>
						<span
							key={index}
							className='text-xs font-normal text-[#ABA5A2] my-2.5'
						>
							{item?.notes}
						</span>
						<div className='flex w-full justify-between items-center'>
							<div className='flex items-center gap-x-2.5'>
								{item?.quantity === 1 && (
									<div
										className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-2xl bg-[#EBEBEB] p-2'
										onClick={() => {
											handleRemoveItem(index);
										}}
									>
										{' '}
										<svg
											id='Group_39022'
											data-name='Group 39022'
											xmlns='http://www.w3.org/2000/svg'
											width='13.749'
											height='15'
											viewBox='0 0 13.749 15'
										>
											<path
												id='Path_4118'
												data-name='Path 4118'
												d='M10,13.625v7.657A1.718,1.718,0,0,0,11.718,23h7.812a1.718,1.718,0,0,0,1.719-1.718V13.625Zm3.75,6.25a.625.625,0,1,1-1.251,0v-3.75a.625.625,0,1,1,1.251,0Zm2.5,0a.625.625,0,1,1-1.251,0v-3.75a.625.625,0,1,1,1.251,0Zm2.5,0a.625.625,0,1,1-1.251,0v-3.75a.626.626,0,0,1,1.252,0v3.75Zm-5-10.626H17.5v.625h1.25V9.25A1.254,1.254,0,0,0,17.5,8H13.75A1.254,1.254,0,0,0,12.5,9.25v.625h1.25Z'
												transform='translate(-8.75 -8)'
												fill='#fe646f'
											/>
											<path
												id='Path_4119'
												data-name='Path 4119'
												d='M22.416,11.718v1.563a.473.473,0,0,1-.469.469H9.136a.473.473,0,0,1-.469-.469V11.718A1.718,1.718,0,0,1,10.385,10H20.7A1.718,1.718,0,0,1,22.416,11.718Z'
												transform='translate(-8.667 -8.125)'
												fill='#fe646f'
												opacity='0.5'
											/>
										</svg>
									</div>
								)}
								{item?.quantity > 1 && (
									<div
										className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-2xl bg-[#EBEBEB] p-2'
										onClick={() => {
											handleDecreaseQuantity(index);
										}}
									>
										{' '}
										<AiOutlineMinus className=' fill-primary' />
									</div>
								)}{' '}
								<span className='text-17px text-xl font-bold text-red'>
									{item?.quantity}
								</span>
								<div
									className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-2xl bg-[#EBEBEB] p-2'
									onClick={() => {
										handleIncraseQuantity(index);
									}}
								>
									<BsPlus className=' fill-primary' />
								</div>
							</div>
							<div className={`flex  items-center justify-between pb-2.5 pt-2`}>
								<span className='text-[17px] font-bold text-primary'>
									{item?.amountAfterDiscount} SAR
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isModalOpen && isOrderEditModal && (
				<MenuItemModal
					isOrderEditModal={isOrderEditModal}
					menuItemId={itemOrderId as string}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					restaurantIdFromTableRow={restaurantIdFromTableRow}
				/>
			)}
		</>
	);
};

export default CartItem;
