import React, {
	type ChangeEvent,
	type SyntheticEvent,
	useEffect,
	useState,
} from 'react';

import { toast } from 'react-toastify';
import { useGetMenuItemById } from 'features/menu/api/getMenuItemById';
import Spinner from 'components/Spinner';
import {
	type AdditionOptionDTO,
	type MenuAdditionDTO,
	type PostOrderPreviewData,
} from '../types';
import Modal from 'components/Modal';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { usePostOrderPreview } from '../api/postOrderPreview';
import { useParams } from 'react-router-dom';
import Button from 'components/Button';
import { useAppSelector } from 'redux/hooks';
import { useDispatch } from 'react-redux';
import { resetItems, setCart, setItems } from '../slices/CartSlice';

const MenuItemModal = ({
	menuItemId,
	isModalOpen,
	setIsModalOpen,
	restaurantIdFromTableRow,
	isOrderEditModal,
}: {
	menuItemId: string;
	isModalOpen: boolean;
	setIsModalOpen: any;
	restaurantIdFromTableRow?: string;
	isOrderEditModal?: boolean;
}) => {
	const [itemData, setItemData] = useState<null | PostOrderPreviewData | any>(
		null
	);
	const orderType = useAppSelector((state) => state.data.cartReducer.orderType);
	const { tableId, restaurantId } = useParams();
	const items = useAppSelector((state) => state.data.cartReducer.items);
	// const items = useCartStore((state) => state.items);
	const dispatch = useDispatch();
	// const setItems = useAppSelector((state) => state.data.cartReducer.items);
	const [allAdditions, setAllAdditions] = useState<any | []>([]);
	const postOrderPreview = usePostOrderPreview();

	const { data: menuItemData, isLoading } = useGetMenuItemById({
		id: menuItemId,
	});

	const [notes, setNotes] = useState('');

	const [quantity, setQuantity] = useState(1);

	const [radioButtonValue, setRadioButtonValue] = useState<{
		menuAdditionId: string;
		options: { optionId: string | undefined };
	} | null>(null);

	const data: any = menuItemData?.data;

	// const resturantId = useBranchStore((state) => state.resturantId);
	// const inputRef = useRef(null);
	// const orderType = useBranchStore((state) =>
	// 	capitalizeFirstLetter(state.type)
	// );
	// const deliveryAddress = useBranchStore((state) => state.customerLocation);
	// const { t, lang } = useTranslation('product');

	useEffect(() => {
		if (data?._id && (restaurantId ?? restaurantIdFromTableRow)) {
			void postOrderPreview
				.mutateAsync({
					data: {
						restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: [
							{
								menuItem: {
									menuItemId: data?._id,
								},
								additions: allAdditions,
								notes,
								quantity,
							},
						],
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
					setItemData(res.data);
				});
		}
	}, [allAdditions]);

	useEffect(() => {
		if (!isLoading && (restaurantId ?? restaurantIdFromTableRow) && data?._id) {
			void postOrderPreview
				.mutateAsync({
					data: {
						restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: [
							{
								menuItem: {
									menuItemId: data?._id,
								},
								additions: [],
								notes,
								quantity,
							},
						],
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
				.then((res: any) => {
					setItemData(res.data);
					setQuantity(res?.data?.items?.[0].quantity);
				});
		}
	}, [isLoading, data, restaurantId]);

	if (isLoading) {
		return (
			<div className='flex h-[calc(100vh-85px)] grow items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	function incrementCounter() {
		setQuantity(quantity + 1);

		void postOrderPreview
			.mutateAsync({
				data: {
					restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
					source: 'Website',
					orderType: orderType !== '' ? (orderType as any) : 'Dine In',
					tableId: tableId ?? undefined,
					items: [
						{
							menuItem: {
								menuItemId: data?._id,
							},
							additions: allAdditions,
							notes,
							quantity: quantity + 1,
						},
					],
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
				setItemData(res.data);
			});
	}

	function decrementCounter() {
		if (quantity > 1) {
			setQuantity(quantity - 1);
			void postOrderPreview
				.mutateAsync({
					data: {
						restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: [
							{
								menuItem: {
									menuItemId: data?._id,
								},
								additions: allAdditions,
								notes,
								quantity: quantity - 1,
							},
						],
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
					setItemData(res.data);
				});
		}
	}

	const handleSubmit = (e: SyntheticEvent) => {
		let increment = 0;
		e.preventDefault();
		const chx = document.getElementsByTagName('input');
		for (let i = 0; i < chx.length; i++) {
			// If you have more than one radio group, also check the name attribute
			// for the one you want as in && chx[i].name == 'choose'
			// Return true from the function on first match of a checked item
			// eslint-disable-next-line eqeqeq
			if (chx[i].type == 'radio' && chx[i].checked) {
				increment++;
			}
		}
		// End of the loop, return false
		const radioAdditions = data?.additions?.filter(
			(addition: MenuAdditionDTO) => !addition.isMultipleAllowed
		);
		if (radioAdditions?.length === increment) {
			dispatch(
				setItems({
					menuItem: {
						menuItemId: data?._id,
					},
					additions: allAdditions,
					notes: notes,
					quantity: quantity,
				})
			);

			const filteredItems = isOrderEditModal
				? items?.filter((item) => item?.menuItem?.menuItemId !== data?._id)
				: items;

			void postOrderPreview
				.mutateAsync({
					data: {
						restaurantId: restaurantId ?? (restaurantIdFromTableRow as string),
						source: 'Website',
						orderType: orderType !== '' ? (orderType as any) : 'Dine In',
						tableId: tableId ?? undefined,
						items: [
							...filteredItems,
							{
								menuItem: {
									menuItemId: data?._id,
								},
								additions: allAdditions,
								notes,
								quantity,
							},
						],
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
					setItemData(res.data);

					dispatch(setCart(res.data));
					// router.push(
					// 	`${
					// 		router.query.tableId
					// 			? `${window.location.origin}/${router.query.tableId}/${router.query.restaurantId}`
					// 			: '/menu'
					// 	}`
					// );
					toast.success('Item added to the cart');
					setIsModalOpen(false);
				});
		} else {
			toast.error("'Please select all the required additions'");
		}
	};

	const handleAddAddition = (
		e: ChangeEvent<HTMLInputElement>,
		addition: any
	) => {
		if (e.target.checked && e.target.type === 'checkbox') {
			setAllAdditions((prevAddition: any) => [
				...prevAddition,
				formatAddition(addition, e.target.value),
			]);
		} else if (e.target.checked && e.target.type === 'radio') {
			const removeAddition = formatAddition(
				radioButtonValue ?? addition,
				e.target.value
			);
			const newFilteredAdditions = allAdditions.filter(
				(addition: any) =>
					addition.menuAdditionId !== removeAddition.menuAdditionId
			);
			setAllAdditions(newFilteredAdditions);
			setRadioButtonValue(addition);
			setAllAdditions((prevAddition: any) => [
				...prevAddition,
				formatAddition(addition, e.target.value),
			]);
		} else if (!e.target.checked) {
			const removeAddition = formatAddition(addition, e.target.value);
			const newFilteredAdditions = allAdditions.filter(
				(addition: any) =>
					addition.menuAdditionId !== removeAddition.menuAdditionId
			);
			setAllAdditions(newFilteredAdditions);
		}
	};

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			{itemData && (
				<div className='px-[25px]'>
					<h1 className='text-primary font-bold text-xl mb-6 pb-5 border-b-2 border-[#F5F5F5]'>
						Add Item To Order
					</h1>
					<div className='mt-2.5 flex grow flex-col'>
						<div className='bg-white flex p-[15px] border border-[#F5F5F5] rounded-lg shadow'>
							<div className=' flex grow items-center gap-2.5'>
								<div className='relative'>
									<div className='relative rounded-[10px]'>
										<img
											className='min-h-[93px] min-w[93px]'
											width={93}
											height={93}
											src={
												data?.image
													? data?.image
													: 'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
											}
											// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
											alt={`${data?.name}-image`}
											style={{
												borderRadius: 10,
												objectFit: 'cover',
											}}
										/>
									</div>
								</div>
								<div className='flex flex-col grow'>
									<h1 className={`text-[15px] text-[#1E3A56] font-semibold`}>
										{data?.name}
									</h1>
									<p className='text-[15px] text-[#ABA5A2]'>
										{data?.description}
									</p>
									{data?.calories > 0 && (
										<span className={`text-[15px] text-black`}>
											{data?.calories} CAL
										</span>
									)}
									<div className='flex justify-between items-center'>
										<div className='flex items-center gap-x-2.5'>
											<div
												className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-2xl bg-[#EBEBEB] p-2'
												onClick={decrementCounter}
											>
												{' '}
												<AiOutlineMinus className=' fill-primary' />
											</div>{' '}
											<span className='text-17px text-xl font-bold text-red'>
												{quantity}
											</span>
											<div
												className='flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-2xl bg-[#EBEBEB] p-2'
												onClick={incrementCounter}
											>
												<BsPlus className=' fill-primary' />
											</div>
										</div>
										<div
											className={`flex  items-center justify-between pb-2.5 pt-2`}
										>
											<div>
												<>
													<>
														{' '}
														{itemData.items?.[0]?.amountBeforeDiscount !==
															itemData.items?.[0]?.amountAfterDiscount && (
															<p className='text-15px text-gray-500 line-through'>
																{' '}
																{itemData.items?.[0].amountAfterDiscount} SAR
															</p>
														)}
													</>
												</>

												<span className='text-[17px] font-bold text-primary'>
													{itemData.items?.[0].amountAfterDiscount} SAR
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<form onSubmit={handleSubmit}>
							{data?.additions && data?.additions?.length > 0 && (
								<div className='mt-2.5 flex flex-col  gap-2.5 bg-white py-[15px] border border-[#F5F5F5] rounded-lg shadow'>
									{data?.additions?.map((addition: MenuAdditionDTO) => {
										return (
											<div key={addition._id} className=''>
												<span
													className={`mb-2.5 flex items-end text-[17px] font-bold capitalize redBlock`}
												>
													{addition.name}
													{'  '}
													{!addition.isMultipleAllowed && (
														<span className='pl-2 text-[17px] font-medium text-[#ABA5A2]'>
															Select one
														</span>
													)}
												</span>
												<div
													className='flex flex-col gap-2.5 px-[22px]'
													id={!addition.isMultipleAllowed ? 'radio-group' : ''}
												>
													{addition?.options?.map(
														(option: AdditionOptionDTO) => {
															return (
																<div
																	key={option._id}
																	className={`flex  items-center gap-x-2.5`}
																>
																	<input
																		id='red-checkbox'
																		name={addition.name}
																		type={
																			addition.isMultipleAllowed
																				? 'checkbox'
																				: 'radio'
																		}
																		onChange={(e) => {
																			handleAddAddition(e, addition);
																		}}
																		value={option?.name}
																		className='h-4 w-4 rounded border-2 border-[#DBDBDB] accent-red'
																	/>
																	<label
																		htmlFor='red-checkbox'
																		className=' text-[15px] text-[#2E2E2E] '
																	>
																		{option?.name}{' '}
																		{option.price > 0 && (
																			<span className='ml-2 text-primary'>
																				({option.price} SAR)
																			</span>
																		)}
																	</label>
																</div>
															);
														}
													)}
												</div>
											</div>
										);
									})}
								</div>
							)}

							<div className='mb-5 mt-2.5 bg-white py-[15px] border border-[#F5F5F5] rounded-lg shadow '>
								<span
									className={`mb-2.5 flex items-end text-17px font-bold capitalize redBlock`}
								>
									Write Note
									<span className='pl-2 text-17px font-medium text-[#ABA5A2] focus-visible:outline-none'>
										In Arabic
									</span>
								</span>
								<div className='container px-[22px]'>
									<textarea
										onChange={(e) => {
											setNotes(e.target.value);
										}}
										rows={4}
										className={`w-full rounded-lg border border-[#E2E2E2] px-2 text-17px font-medium text-[#ABA5A2] py-2.5`}
										placeholder='Type your comment'
									/>
								</div>
							</div>

							<div className='flex items-center gap-x-2.5 grow mt-6'>
								<Button
									className='grow py-[25px]'
									variant='ghost'
									onClick={() => {
										setIsModalOpen(false);
									}}
								>
									Cancel
								</Button>
								<Button className='grow py-6' type='submit'>
									Add
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default MenuItemModal;

export function formatAddition(data: MenuAdditionDTO, optionValue: string) {
	const selectedOption = data.options?.find(
		(additionChild: AdditionOptionDTO) => optionValue === additionChild.name
	);
	const addition = {
		menuAdditionId: data._id,
		options: [{ optionId: selectedOption?._id }],
	};
	return addition;
}
