/* eslint-disable array-callback-return */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { type MenuCategory } from 'features/menu/api/types';
import { type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
	categroyObj: any;
	categories:
		| Array<{
				_id: string;
				supplierId: string;
				name: string;
				nameAr: string;
				image: string;
				active: boolean;
				deletedAt: string;
				addedBy: string;
				createdAt: string;
				updatedAt: string;
				__v: number;
				id: string;
		  }>
		| undefined
		| any;
	activeCategory: MenuCategory | undefined;
	setActiveCategory: Dispatch<SetStateAction<MenuCategory | undefined>>;
}

const MenuCarousel = ({
	categories,
	categroyObj,
	activeCategory,
	setActiveCategory,
}: Props) => {
	const { t, i18n } = useTranslation();

	const categoriesWithAll = [
		{
			_id: 'all',
			name: 'All',
			nameAr: 'الجميع',
		},
		...categories,
	];
	return (
		// eslint-disable-next-line react/jsx-no-comment-textnodes
		<Swiper spaceBetween={30} slidesPerView={7}>
			{categoriesWithAll?.map((category: any) => {
				// eslint-disable-next-line no-prototype-builtins

				return (
					<SwiperSlide
						onClick={(e) => {
							setActiveCategory(category);
						}}
						className='!w-fit'
						key={category?._id}
					>
						<div
							className={`flex cursor-pointer flex-col items-center justify-center w-full ${
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								activeCategory?._id === category?._id
									? 'opacity-100'
									: 'opacity-40'
							}  `}
						>
							<img
								className='rounded-full border-2 border-primary'
								src={
									category.image ??
									'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
								}
								alt={category.name}
								width={67}
								height={67}
								style={{
									borderRadius: '50%',
									minWidth: '67px',
									minHeight: '67px',
									objectFit: 'cover',
									maxWidth: '67px',
									maxHeight: '67px',
								}}
							/>{' '}
							<span className='whitespace-pre text-15px font-medium text-[#6D6A75]'>
								{i18n.resolvedLanguage === 'ar'
									? category.nameAr
									: category.name}
							</span>
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default MenuCarousel;
