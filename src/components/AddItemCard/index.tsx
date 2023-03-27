import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';

interface InputProps {
	onClick?: () => void;
}

const AddItemcard: React.FC<InputProps> = ({ onClick }) => {
	const { t, i18n } = useTranslation();
	return (
		<div className='m-2 border-dashed border h-[233px] text-gray2 border-gray2 rounded-small flex-row w-[200px] items-center '>
			<div className='flex justify-center  mt-4'>
				<AiOutlinePlus
					size={48}
					className='text-gray2 p-2 text-3xl  border-dashed border  rounded-full border-gray2'
				/>
			</div>
			<p className='text-center text-base xl:text-[19px]'>
				{t('menu.addNewItem')}
			</p>
			<p className='text-center text-xs xl:text-[16px] pt-2 opacity-[38%] px-4 text-[#79828B]'>
				{t('menu.cardItemDesc')}
			</p>
		</div>
	);
};

export default AddItemcard;
