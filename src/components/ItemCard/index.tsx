import React from 'react';
import Switch from 'components/Switch';
import EditIcon from 'assets/icons/editIcon';
import DeleteIcon from 'assets/icons/deleteIcon';

import { AiTwotoneHeart } from 'react-icons/ai';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface Details {
	image: string;
	name: string;
	soldOut: boolean;
	active?: boolean;
	starGain: number;
	_id: string;
	nameAr?: string;
}

interface ItemProps {
	details: Details;
	updateIsActive?: (value: boolean, id: string) => void;
	deleteItem?: (id: string) => void;
	editItem?: (id: string) => void;
	updateSoldOut?: (value: boolean, id: string) => void;
	isLoading?: boolean;
}

const ItemCard: React.FC<React.PropsWithChildren<ItemProps>> = ({
	details,
	editItem,
	deleteItem,
	updateIsActive,
	updateSoldOut,
	isLoading,
}) => {
	const { image, name, starGain, soldOut, active, _id, nameAr } = details;
	const { t, i18n } = useTranslation();
	return (
		<div
			style={{ boxShadow: '0px 0px 20px #0000000D' }}
			className='m-2 pt-2 shadow-[#00000096] w-[200px] bg-white relative rounded-lg  justify-between items-center'
		>
			<div className=' text-[red] flex justify-end items-center text-end mr-2 text-[10px]'>
				<span className='mr-1'>{starGain}2</span>
				<AiTwotoneHeart />
			</div>
			<div className='flex w-14 h-14 justify-center mx-auto rounded-full'>
				<img
					src={
						image ??
						'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
					}
					alt='credit card icon '
					className='w-full h-full rounded-full'
					width='56px'
					height='56px'
				/>
			</div>
			<div className='text-center text-[18px] text-black1 font-bold m-2  xl:text-[22px]'>
				{i18n.resolvedLanguage === 'en' ? name : nameAr}
			</div>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div
						className={classNames({
							'flex justify-between mb-1 mx-2 flew-row': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div className='text-sm xl:text-[17px]'>
							{t('menu.foodIsHidden')}
						</div>
						<Switch
							size='small'
							checked={!active}
							type='Danger'
							onChange={(value) => {
								if (updateIsActive) updateIsActive(!value, _id);
							}}
						/>
					</div>
					<div
						className={classNames({
							'flex justify-between mb-2 mx-2 flew-row ': true,
							'flex-row-reverse': i18n.resolvedLanguage === 'ar',
						})}
					>
						<div className='text-base xl:text-[17px]'>{t('menu.soldOut')}</div>
						<Switch
							size='small'
							checked={soldOut}
							type='Danger'
							onChange={(value) => {
								if (updateSoldOut) updateSoldOut(value, _id);
							}}
						/>
					</div>
					<div
						style={{ borderTop: '.2px solid #0000000D' }}
						className='py-2 flex justify-center'
					>
						<div
							className='p-2 bg-[#E7F2F9] rounded-small mr-2 cursor-pointer'
							onClick={() => {
								if (editItem) editItem('');
							}}
						>
							<EditIcon width={20} height={20} />
						</div>

						<div
							onClick={() => {
								if (deleteItem) deleteItem('');
							}}
							className='p-2 bg-[#FFEFF0] rounded-small cursor-pointer'
						>
							<DeleteIcon width={20} height={20} />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ItemCard;
