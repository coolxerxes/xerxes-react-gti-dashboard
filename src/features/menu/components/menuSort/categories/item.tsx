import Button from 'components/Button';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import { useUpdateMenuItem } from 'features/menu/api/updateMenuItem';
import { type FC, useEffect, useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { MenuItems } from './menuItems';

// import { ItemTypes } from './ItemTypes';

const style = {
	padding: '0.5rem 1rem',
	// marginBottom: '.5rem',
	backgroundColor: 'white',
};

export interface CardProps {
	id: any;
	text: string;
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export const Card: FC<CardProps> = ({ text, id }) => {
	const updateMenuItem = useUpdateMenuItem({ noToast: true });
	const [cards, setCards] = useState<Array<{ id: number; text: string }>>([]);
	const [isOpen, setIsOpen] = useState(true);
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const {
		data: menuData,
		refetch,
		isLoading,
	} = useGetMenuItems({
		params: { categoryId: id, pagination: false },
	});

	useEffect(() => {
		if (menuData) {
			setCards(
				menuData.data.docs
					.sort((a: any, b: any) => a.order - b.order)
					.map((item: any) => ({
						id: item._id,
						text: item.name,
					}))
			);
		}
	}, [menuData]);
	const save = async (da: any) => {
		await Promise.all(
			cards.map(async (card: any, index: any) => {
				return await updateMenuItem.mutateAsync({
					id: card.id,
					payload: { order: index },
				});
			})
		);
		toast.success('your changes have been saved');
	};
	return (
		<>
			<>
				<tr
					className={`  cursor-pointer transition-all ease-linear ${'bg-white'}`}
				>
					{/* <th></th> */}
					<th className={`text-[15px] ${'text-black'}`}>
						<div className='flex justify-between items-center w-full  max-w-sm'>
							{text}
							<div className='flex justify-between items-center gap-4'>
								<Button disable={updateMenuItem.isLoading} onClick={save}>
									Save
								</Button>
								<div className='bg-gray4 p-2 rounded-md  ' onClick={toggle}>
									{!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
								</div>
							</div>
						</div>{' '}
					</th>
				</tr>
				{isOpen && (
					<tr>
						<td colSpan={6}>
							<MenuItems
								setCards={setCards}
								cards={cards}
								categoryId={id}
								save={save}
							/>
						</td>
					</tr>
				)}
			</>
		</>
	);
};
