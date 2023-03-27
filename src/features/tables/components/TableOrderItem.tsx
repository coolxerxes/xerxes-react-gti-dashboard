import CheckBox from 'components/CheckBox';
import { useState } from 'react';

import { FiCopy } from 'react-icons/fi';
import MoveOrderItemModal from './MoveOrderItemModal';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const TableOrderItem = ({
	item,
	refetchTable,
	orders,
	orderId,
}: {
	item: any;
	refetchTable: any;
	orders: any;
	orderId: string;
}) => {
	const location = useLocation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { i18n } = useTranslation();
	return (
		<div key={item?._id} className='mb-[5px] flex items-start'>
			<div>
				<CheckBox
					className='mr-0 gap-0'
					label=''
					onChange={() => {}}
					checked={false}
				/>
			</div>

			<div className='basis-full'>
				<div className='flex items-start gap-2.5 mb-1'>
					<div>
						<img
							src={
								item?.menuItem.image ??
								'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
							}
							alt='icon'
							width='34'
							height='34'
						/>
					</div>

					<div className=' basis-full'>
						<div className='flex justify-between'>
							<p className='text-gray3 text-[13px]'>
								{i18n.resolvedLanguage === 'ar'
									? item?.menuItem.nameAr
									: item?.menuItem.name}
							</p>
						</div>
						<div
							className={classNames({
								'flex justify-start': true,
								'justify-start': i18n.resolvedLanguage === 'ar',
							})}
						>
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

						<div
							className={classNames({
								'flex justify-between items-center': true,
								'flex-row-reverse': i18n.resolvedLanguage === 'ar',
							})}
						>
							<p className='text-gray1 text-xs'>x {item?.quantity}</p>
							<p className='text-normalBlack text-xs'>
								{item?.menuItem?.amountAfterDiscount} SAR
							</p>
						</div>
					</div>
				</div>
				<div className='flex  gap-1.5'>
					<div
						className='bg-primary my-auto p-[5px] rounded-small cursor-pointer'
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						<FiCopy />
					</div>
					{item?.notes?.length > 0 && (
						<span className='bg-[#F5F5F5] w-max px-2 pb-1 border-[1px] rounded-md border-[#D9D9D9] text-fadedBlack text-[11px]'>
							{item?.notes}
						</span>
					)}
				</div>
			</div>
			{isModalOpen && (
				<MoveOrderItemModal
					orderId={orderId}
					item={item}
					orders={orders}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					refetchTable={refetchTable}
				/>
			)}
		</div>
	);
};

export default TableOrderItem;
