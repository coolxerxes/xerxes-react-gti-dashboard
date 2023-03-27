import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MenuCategories } from './categories';

const MenuSort = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<MenuCategories />
		</DndProvider>
	);
};

export default MenuSort;
