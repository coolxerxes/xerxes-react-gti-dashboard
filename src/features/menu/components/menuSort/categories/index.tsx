import classNames from 'classnames';
import { useGetMenuCategories } from 'features/menu/api/getMenuCategories';
import update from 'immutability-helper';
import { FC, useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from './item';

export interface Item {
	id: string;
	text: string;
}

export interface ContainerState {
	cards: Item[];
}

export const MenuCategories: FC = () => {
	const [cards, setCards] = useState<Item[]>([]);
	const { t, i18n } = useTranslation();

	const { data: menuCategoryData, isLoading: isMenuCategoryDataLoading } =
		useGetMenuCategories({
			params: {
				pagination: false,
			},
		});

	useEffect(() => {
		if (menuCategoryData) {
			setCards(
				menuCategoryData.data.docs.map((item: any) => ({
					id: item._id,
					text: item.name,
				}))
			);
		}
	}, [menuCategoryData]);

	const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
		setCards((prevCards: Item[]) =>
			update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex] as Item],
				],
			})
		);
	}, []);

	const renderCard = useCallback((card: Item, index: number) => {
		return (
			<Card
				key={card.id}
				index={index}
				id={card.id}
				text={card.text}
				moveCard={moveCard}
			/>
		);
	}, []);

	return (
		<>
			<table
				className={classNames({
					'table-auto overflow-x-auto text-left bg-white w-full shadow': true,
				})}
				style={{
					direction: i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr',
				}}
			>
				<thead className='text-base'>
					<tr>
						{/* <th className=' lg:text-lg xl:text-xl w-28'>Sort</th> */}
						<th className=' lg:text-lg xl:text-xl '> Name</th>
					</tr>
				</thead>
				<tbody>{cards.map((card, i) => renderCard(card, i))}</tbody>
			</table>
		</>
	);
};
