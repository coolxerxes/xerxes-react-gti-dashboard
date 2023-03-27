import Button from 'components/Button';
import Modal from 'components/Modal';
import { type GetTablesResponse } from 'features/cashier/api/types';
import CartItem from 'features/order/components/CartItem';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { useAppSelector } from 'redux/hooks';
import { useUpdateOrder } from '../api/updateOrder';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	refetchTable: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	orderItems: any;
	orderNumber: number;
	restaurantId: string;
	orderId: string;
}

const OrderEditModal = ({
	isModalOpen,
	setIsModalOpen,
	refetchTable,
	orderNumber,
	orderItems,
	restaurantId,
	orderId,
}: Props) => {
	const cartData = useAppSelector((state) => state.data.cartReducer.cart);
	const [cartItems, setCartItems] = useState(orderItems);
	const updateOrderMutation = useUpdateOrder({});
	const items = useAppSelector((state) => state.data.cartReducer.items);

	useEffect(() => {
		setCartItems(cartData?.items);
	}, [cartData]);

	useEffect(() => {
		if (cartData === null) {
			setCartItems(orderItems);
		}
	}, []);

	const handleUpdateOrder = async (e: any) => {
		e.preventDefault();
		await updateOrderMutation.mutateAsync({
			orderId,
			payload: {
				items,
			},
		});
		await refetchTable();
		setIsModalOpen(false);
	};
	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] '>
				<h1 className='text-primary font-bold text-xl mb-1.5'>
					Edit Orders <span className='text-black'>(Order #{orderNumber})</span>
				</h1>
				<form onSubmit={handleUpdateOrder}>
					<div className='flex flex-col gap-2.5 mt-2.5'>
						{cartItems?.map((item: any, index: number) => {
							return (
								<CartItem
									restaurantIdFromTableRow={restaurantId}
									isOrderEditModal={true}
									key={index}
									index={index}
									item={item}
								/>
							);
						})}
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
							Save
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default OrderEditModal;
