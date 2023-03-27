import Button from 'components/Button';
import { useChangeItemStatus } from 'features/kitchen/api/changeItemStatus';
import { useGetOrders } from 'features/kitchen/api/getOrders';
import { useMemo } from 'react';
import type { Item } from 'types/order';

interface Props {
	item: Item;
	oderId: string;
	isFullyVersion?: boolean;
}

const TicketItem: React.FC<Props> = ({ item, oderId, isFullyVersion }) => {
	const { menuItem, notes, quantity, additions } = item;
	const checkedValue = useMemo(() => {
		return item.preparationStatus === 'Done Preparing';
	}, [item]);

	const { refetch } = useGetOrders({});
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	const changeItemStatus = useChangeItemStatus({ refetch });

	const onChangeStatusItem = async () => {
		await changeItemStatus.mutateAsync({
			orderId: oderId,
			orderItemId: item._id,
			preparationStatus: 'Done Preparing',
		});
	};

	return (
		<div className='px-[9px]'>
			<div className='font-[600] flex content-center justify-between py-[15px] border-b-2 border-[#E2E2E2]'>
				<div className='grid content-center gap-[10px]'>
					<div className='flex content-center gap-[10px]'>
						{!isFullyVersion && (
							<img
								src={
									item.menuItem.image ??
									'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
								}
								alt='icon'
								width={34}
								height={34}
							/>
						)}

						<span className='text-center p-0'>x{quantity}</span>

						<span className='text-center'>{menuItem.name}</span>

						<div className='grid content-center'>
							<Button
								onClick={() => {}}
								className='p-0 text-[10px] text-center'
								height={17}
								width={22}
							>
								BK
							</Button>
						</div>
					</div>

					{notes && (
						<>
							<span className='bg-[#F5F5F5] w-max px-2 pb-1 border-[1px] rounded-md border-[#D9D9D9]'>
								{notes}
							</span>
						</>
					)}
					<div className='flex gap-[5px] flex-wrap'>
						{(additions || []).map((addition) => (
							<span
								className='bg-[#F5F5F5] w-max px-2 pb-1 border-[1px] rounded-md border-[#D9D9D9]'
								key={addition.menuAdditionId}
							>
								{addition.name}
							</span>
						))}
					</div>
				</div>

				<div className='grid content-center'>
					<label className='inline-flex items-center'>
						<input
							type='checkbox'
							className='w-[24px] h-[24px] peer relative appearance-none rounded-full border-2 border-[#DBDBDB] checked:bg-[#C02328]'
							onChange={onChangeStatusItem}
							checked={checkedValue}
						/>
					</label>
				</div>
			</div>
		</div>
	);
};

export default TicketItem;
