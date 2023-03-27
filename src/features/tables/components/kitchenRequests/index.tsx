// apimenudev.talabatmenu.com/order?status=New%2CProcessing&chefRequestedClarification=true
import Kitchen from 'assets/images/chefs-hat.svg';
import { useCallWaiter } from 'features/kitchen/api/callWaiter';
import { useGetKitchenCalls } from 'features/tables/api/kitchenCalls';
import { useEffect, useState } from 'react';

const KitchenReqs = () => {
	const [open, setOpen] = useState(false);
	const toggle = () => {
		setOpen(!open);
	};
	const { data, refetch } = useGetKitchenCalls({});
	const [kitchenCalls, setKitchenCalls] = useState<any>([]);
	const { mutateAsync } = useCallWaiter({
		setIsModalOpen: setOpen,
		noToast: true,
	});

	useEffect(() => {
		if (data?.data?.docs) {
			setKitchenCalls(
				data?.data?.docs.reduce((acc: any, item: any) => {
					// eslint-disable-next-line array-callback-return
					item.chefInquiry.map((call: any) => {
						acc.push({
							orderNumber: item.orderNumber,
							// tableNumber:item.tableNumber,
							comment: call.comment,
							orderId: item._id,
						});
					});

					return acc;
				}, [])
			);
		}
	}, [data]);

	if (!kitchenCalls.length) return null;
	return (
		<div className='fixed bottom-12 right-12'>
			{open && (
				<div className='bg-white rounded-lg shadow-lg w-64 h-[330px]  '>
					<div className=' bg-red-600 rounded-t-lg text-center py-2 relative '>
						<span
							className='absolute cursor-pointer right-2 -top-4 bg-white rounded-full w-7 h-7 text-gray text-md shadow-lg'
							onClick={toggle}
						>
							x
						</span>
						<span className='text-white  text-lg'>Kitchen Call</span>
					</div>

					<div className='overflow-auto h-[250px]'>
						{kitchenCalls.map((call: any, i: number) => (
							<div
								key={i}
								className={'border-b border-[#E2E2E2] pb-2 cursor-pointer'}
								onClick={async () => {
									await mutateAsync({
										id: call.orderId,
										chefRequestedClarification: false,
										comment: call.comment,
									});
									await refetch();
								}}
							>
								<div className='flex justify-between px-4 py-2 border-b-2 border-dashed border-[#E2E2E2]'>
									<div className='flex flex-col'>
										<span className='text-sm text-gray-500'>
											Order #{parseInt(call.orderNumber)}
										</span>
									</div>
									{/* <span className='text-sm text-gray-500'>{call.comment}</span> */}
								</div>
								<span className='text-sm text-red-600'>{call.comment}</span>
							</div>
						))}
					</div>
				</div>
			)}

			<div
				className=' bg-red-600 p-3 cursor-pointer rounded-full w-12 ml-auto relative '
				onClick={toggle}
			>
				<span
					className='absolute cursor-pointer right-0 -top-2  bg-red-600 border-2 border-solid border-white rounded-full p-0 leading-none w-5 h-5 text-white text-sm shadow-lg'
					onClick={toggle}
				>
					{kitchenCalls.length}
				</span>
				<img src={Kitchen} alt='kitchen' className='w-7' />
			</div>
		</div>
	);
};

export default KitchenReqs;
