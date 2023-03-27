import Banner from 'components/Banner';
import Spinner from 'components/Spinner';
import { useGetMenuCategories } from 'features/menu/api/getMenuCategories';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import { toast } from 'react-toastify';
import MenuCarousel from '../components/MenuCarousel';
import { useEffect, useState } from 'react';
import { type MenuCategory } from 'features/menu/api/types';
import MenuItem from '../components/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useTakePayment } from 'features/tables/api/takePayment';
import { usePostOrder } from '../api/postOrder';
import {
	resetItems,
	setCart,
	setCustomerData,
	setItems,
} from '../slices/CartSlice';
import { useDispatch } from 'react-redux';
import { useGetOrderById } from 'features/cashier/api/getOrderById';
import { usePostOrderPreview } from '../api/postOrderPreview';
import { useUpdateOrder } from 'features/tables/api/updateOrder';
import { useCreateInvoice } from 'features/cashier/api/createInvoice';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const NewOrder = () => {
	const { data, error, isLoading } = useGetMenuCategories({
		params: { pagination: false },
	});
	const [searchInputValue, setSearchInputValue] = useState('');
	const { t, i18n } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<
		MenuCategory | undefined
	>(undefined);
	const orderType = useAppSelector((state) => state.data.cartReducer.orderType);
	const customerId = useAppSelector(
		(state) => state.data.cartReducer.customerData?._id
	);
	const cartItems = useAppSelector((state) => state.data.cartReducer.items);
	const cartData = useAppSelector((state) => state.data.cartReducer.cart);
	const createInvoiceMutation = useCreateInvoice({});
	const postOrderMutation = usePostOrder();
	const updateOrderMutation = useUpdateOrder({});
	const dispatch = useDispatch();
	const takePayment = useTakePayment();
	const { tableId, restaurantId, orderId } = useParams();
	const {
		data: menuItemData,
		error: menuItemError,
		isLoading: isMenuItemLoading,
	} = useGetMenuItems({
		params: { pagination: false, search: searchInputValue },
	});
	const { data: orderData, isLoading: isOrderLoading } = useGetOrderById({
		id: orderId,
	});
	const navigate = useNavigate();
	const postOrderPreview = usePostOrderPreview();

	useEffect(() => {
		if (!isLoading) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			setActiveCategory({
				_id: 'all',
				name: 'All',
			});
		}
	}, [isLoading]);

	useEffect(() => {
		if (orderId) {
			void postOrderPreview
				.mutateAsync({
					data: {
						restaurantId: restaurantId as string,
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,

						items: cartItems,
						// notes: deliveryAddress?.addressDesc,

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
		}
	}, [cartItems, tableId]);

	if (isLoading || isOrderLoading) {
		return (
			<div className='flex h-[calc(100vh-85px)] grow items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	if (error || menuItemError) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		toast.error(`${error || menuItemError}`);
	}

	const categroyObj: any = {};

	data?.data.docs.map((category) =>
		// eslint-disable-next-line array-callback-return
		menuItemData?.data.docs.map((menuItem) => {
			if (menuItem.categoryId === category.id) {
				categroyObj[category.name] = 1;
			}
		})
	);

	// eslint-disable-next-line array-callback-return
	const menuItems = menuItemData?.data.docs.filter((menuItem) => {
		if (menuItem.categoryId === activeCategory?._id) {
			return menuItem.categoryId === activeCategory?._id;
		} else if (activeCategory?._id === 'all') {
			return menuItem.categoryId;
		}
	});

	const handlePaymentComplete = async () => {
		try {
			const postOrderData = await postOrderMutation.mutateAsync({
				data: {
					restaurantId: restaurantId as string,
					source: 'Website',
					orderType: orderType !== '' ? (orderType as any) : 'Dine In',
					tableId: tableId ?? undefined,
					items: cartItems,
					customerId,
					// kitchenQueueId:
					// 	kitechQueueData?.data?.docs?.[
					// 		kitechQueueData.data.docs.length - 1
					// 	]?.id,
					// couponCode: discountValue as string,

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
			});

			if (postOrderData.data._id) {
				// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
				const takePayment2 = await takePayment
					.mutateAsync({
						data: {
							orderId: postOrderData.data._id,
							paymentMethod: 'Cash',
						},
					})
					.then(async () => {
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						await createInvoiceMutation.mutateAsync({
							orderId: postOrderData.data._id,
							type: 'Invoice',
						});
						dispatch(resetItems([]));
						dispatch(setCustomerData(null));
						dispatch(setCart(null));
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						navigate(-1);
					});
			}
		} catch (err: any) {
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			toast.error(`${err.message}`);
		}
	};

	const handleAddOrder = async () => {
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		if (orderId) {
			await updateOrderMutation
				.mutateAsync({
					orderId: orderId,
					payload: {
						restaurantId: restaurantId as string,
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: cartItems,
						customerId,
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
				.then(() => {
					dispatch(resetItems([]));
					dispatch(setCustomerData(null));
					dispatch(setCart(null));
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					navigate(-1);
				});
		} else {
			await postOrderMutation
				.mutateAsync({
					data: {
						restaurantId: restaurantId as string,
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: cartItems,
						customerId,
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
				.then(async (res) => {
					dispatch(resetItems([]));
					dispatch(setCustomerData(null));
					dispatch(setCart(null));
					navigate(-1);
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					// navigate(-1);
				});
		}
	};

	return (
		<div>
			<div className='bg-[#F6F6F6] sticky top-[8%] z-[100] h-[30px]'></div>
			<div className='w-full bg-white h-[60px] flex flex-col items-center rounded-lg justify-between mb-5  sticky top-[11%] z-[100] '>
				<Banner>
					<div className='flex items-center gap-2.5 ml-3'>
						<span
							className='cursor-pointer'
							onClick={() => {
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								navigate(-1);
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='20'
								height='13'
								viewBox='0 0 20 13'
							>
								<g
									id='Arrow_-_Right'
									data-name='Arrow - Right'
									transform='translate(5 -13)'
								>
									<path
										id='Arrow_-_Right-2'
										data-name='Arrow - Right'
										d='M11.176,0h0a2.279,2.279,0,0,0-1.011.238,2.056,2.056,0,0,0-.9.979,10.6,10.6,0,0,0-.29,1.153A23.3,23.3,0,0,0,8.708,6.11l0,.383a29.2,29.2,0,0,0,.24,4l.126.589a3.97,3.97,0,0,0,.259.849A2.016,2.016,0,0,0,11.112,13h.064a5.557,5.557,0,0,0,1.492-.441,25.023,25.023,0,0,0,6.215-4.105l.421-.43a3.9,3.9,0,0,0,.311-.362A1.892,1.892,0,0,0,20,6.508a1.975,1.975,0,0,0-.417-1.232l-.432-.455-.1-.1A24.552,24.552,0,0,0,12.508.364l-.271-.1A4.851,4.851,0,0,0,11.176,0Zm-9.5,4.857h0a1.645,1.645,0,1,0,0,3.289l4.11-.355a1.29,1.29,0,1,0,0-2.58Z'
										transform='translate(15 26) rotate(180)'
										fill='#585858'
									/>
								</g>
							</svg>
						</span>
						<span className='font-dinBold text-xl space-[-0.38px]  capitalize'>
							{t('order.addNewOrder')}
						</span>
					</div>
				</Banner>
			</div>
			<div
				className={classNames({
					'min-h-[50px] bg-white flex items-center pl-5 rounded-3xl  pr-5 w-fit mt-5 mb-5':
						true,
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

			<div className='grid grid-flow-col grid-cols-12'>
				<div className='col-span-8 grid-flow-col'>
					<div>
						{' '}
						<div className='p-2.5 bg-white w-full rounded-lg'>
							<MenuCarousel
								activeCategory={activeCategory}
								categroyObj={categroyObj}
								categories={data?.data?.docs}
								setActiveCategory={setActiveCategory}
							/>
						</div>
					</div>
					<div> </div>
					{!isMenuItemLoading && (
						<div className='p-2.5 mt-5 bg-white w-full rounded-lg grid lg:grid-cols-3 xl:grid-cols-4  gap-5 max-h-[500px] overflow-y-auto'>
							{menuItems?.map((menuItem) => (
								<MenuItem key={menuItem._id} menuItemAllData={menuItem} />
							))}
						</div>
					)}
				</div>
				<div className='col-span-4 ml-5'>
					<div className='p-2.5 h-full bg-white w-full rounded-lg flex flex-col items-start'>
						<span className='font-dinBold w-full pb-2.5 text-xl space-[-0.38px] text-start  capitalize border-b-2 border-[#F5F5F5]'>
							{t('order.orderList')}
						</span>
						{cartData?.items?.length > 0 && (
							<>
								<div className=' flex w-full grow flex-col py-2.5 '>
									<div className='flex  flex-col gap-y-2.5'>
										{cartData?.items?.map((item: any, index: number) => {
											return <CartItem key={index} index={index} item={item} />;
										})}
									</div>
								</div>
								<div className='flex flex-col grow w-full bg-white shadow bottom-0 sticky'>
									<CartSummary cartSummay={cartData?.summary} />
									{!orderId && (
										<div className=' flex gap-2.5 items-center w-full  bg-white  px-2.5 shadow-0'>
											<button
												onClick={handleAddOrder}
												className={`flex  w-full items-center justify-center rounded-5px bg-[#FAFAFA] px-5 py-[14px]  text-[17px] text-black border border-[#ABA5A2]`}
											>
												<span>+ Add order</span>
											</button>
											<button
												onClick={handlePaymentComplete}
												className={`flex  w-full items-center justify-center rounded-5px bg-primary px-5 py-[14px]  text-[17px] text-white`}
											>
												<span>Pay now</span>
											</button>
										</div>
									)}
									{orderId && (
										<button
											onClick={handleAddOrder}
											className={`flex  w-full items-center justify-center rounded-5px bg-primary px-5 py-[14px]  text-[17px] text-white`}
										>
											<span>Edit order</span>
										</button>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewOrder;
