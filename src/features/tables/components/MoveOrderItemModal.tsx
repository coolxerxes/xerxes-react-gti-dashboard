import Button from 'components/Button';
import Modal from 'components/Modal';
import MultiSelect from 'components/MultiSelect';
import { type Dispatch, type SetStateAction, useState } from 'react';
import { useUpdateTable } from '../api/updateTable';
import { toast } from 'react-toastify';
import {
	type QueryObserverResult,
	type RefetchOptions,
	type RefetchQueryFilters,
} from 'react-query';
import { type GetListResponse } from '../types';
import { type GetTablesResponse } from 'features/cashier/api/types';
import classNames from 'classnames';
import { useMoveOrderItem } from 'features/order/api/moveOrderItem';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import Select from 'components/Select';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;

	refetchTable: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<GetTablesResponse, unknown>>;
	orders: any;
	item: any;
	orderId: string;
}

const MoveOrderItemModal = ({
	isModalOpen,
	setIsModalOpen,
	item,
	refetchTable,
	orders,
	orderId,
}: Props) => {
	const [selected, setSelected] = useState<string>('');
	const { register, handleSubmit } = useForm();
	const moveItemMutation = useMoveOrderItem({});

	const handleMoveItem = async (data: any) => {
		if (selected === '') {
			toast.error('Please add at least one table');
		} else {
			await moveItemMutation.mutateAsync({
				data: {
					sourceOrderId: orderId,
					targetOrderId: selected,
					items: [
						{
							quantity: parseInt(data?.quantity),
							itemId: item?._id,
						},
					],
				},
			});

			void refetchTable();
			setIsModalOpen(false);
		}
	};

	const ordersOptions = orders?.map((order: any) => ({
		label: parseInt(order?.orderNumber),
		value: order?._id,
	}));

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] '>
				<h1 className='text-primary font-bold text-xl mb-1.5'>Move Item</h1>
				<form onSubmit={handleSubmit(handleMoveItem)}>
					<div>
						<p className='text-left mb-2.5 text-base'>Select Order Number</p>
						<Select
							options={ordersOptions ?? []}
							className='h-[50px]'
							selected={selected}
							onChange={async (values) => {
								setSelected(values);
							}}
						/>
					</div>

					<div className='mt-6'>
						<p className='text-left mb-2.5 text-base'>Quantity To Move</p>
						<Input
							defaultValue='1'
							name='quantity'
							register={register}
							placeholder='Add Quantity'
							type='number'
							min={1}
							max={item?.quantity}
						/>
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
							Move
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default MoveOrderItemModal;
