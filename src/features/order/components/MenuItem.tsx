import { type Menu } from 'components/Layout/types';
import React, { useState } from 'react';
import MenuItemModal from './MenuItemModal';
import { useTranslation } from 'react-i18next';

interface Props {
	menuItemAllData: any;
}

const MenuItem = ({ menuItemAllData }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { i18n } = useTranslation();
	function handleOpenModal(e: any) {
		setIsModalOpen(true);
	}
	return (
		<>
			<div
				onClick={handleOpenModal}
				className='flex flex-col gap-y-2.5  py-2 items-center justify-between h-full border-2 border-[#F5F5F5] rounded-lg  w-full cursor-pointer'
			>
				<img
					className='rounded-full border-2 border-primary'
					src={
						menuItemAllData?.image ??
						'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
					}
					alt={menuItemAllData?.name}
					width={67}
					height={67}
					style={{
						borderRadius: '50%',
						minWidth: '56px',
						minHeight: '56px',
						objectFit: 'cover',
						maxWidth: '56px',
						maxHeight: '56px',
					}}
				/>{' '}
				<span className=' text-[17px] font-bold text-[#1E3A56] px-2'>
					{i18n.resolvedLanguage === 'ar'
						? menuItemAllData.nameAr
						: menuItemAllData.name}
				</span>
				<span className=' text-[17px] font-bold text-primary'>
					{menuItemAllData.price} SAR
				</span>
			</div>
			{isModalOpen && (
				<MenuItemModal
					menuItemId={menuItemAllData?._id}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			)}
		</>
	);
};

export default MenuItem;
