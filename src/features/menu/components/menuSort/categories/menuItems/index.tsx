import Button from 'components/Button';
import { useGetMenuCategories } from 'features/menu/api/getMenuCategories';
import { useGetMenuItems } from 'features/menu/api/getMenuItems';
import { useUpdateMenuItem } from 'features/menu/api/updateMenuItem';
import update from 'immutability-helper';
import { FC, useEffect } from 'react';
import { useCallback, useState } from 'react';

import { Card } from './item';

export interface Item {
	id: number;
	text: string;
}

export interface ContainerState {
	cards: Item[];
}

export const MenuItems = ({
	categoryId,
	save,
	cards,
	setCards,
}: {
	categoryId: string;
	save: any;
	cards: any;
	setCards: any;
}) => {
	const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
		setCards((prevCards: Item[]) => {
			return update(prevCards, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevCards[dragIndex] as Item],
				],
			});
		});
	}, []);

	const renderCard = useCallback(
		(card: { id: number; text: string }, index: number) => {
			return (
				<Card
					key={card.id}
					index={index}
					id={card.id}
					text={card.text}
					moveCard={moveCard}
					onDragEnd={save}
					categoryId={categoryId}
					// cards={cards}
				/>
			);
		},
		[]
	);

	return (
		<>
			<div className='max-w-sm  ml-5 '>
				{cards.map((card: any, i: any) => renderCard(card, i))}
			</div>
		</>
	);
};
