import { useTranslation } from 'react-i18next';
import { type ImageProps } from './types';

const ImageCard: React.FC<ImageProps> = ({
	details,
	onRemove,
	progress = 70,
}) => {
	const { img, title, size } = details;
	const { t, i18n } = useTranslation();

	return (
		<div className='!block w-full'>
			<div className='mt-2  w-full relative rounded-lg flex justify-between items-center'>
				{progress < 100 && (
					<div className='bg-darkRed rounded-l-[3px] roun h-full w-[70%] absolute top-0 left-0 opacity-30'></div>
				)}
				{progress === 100 && (
					<div className='bg-success rounded-l-[3px] roun h-full w-[80%] absolute top-0 left-0 opacity-30'></div>
				)}
				<div className='flex p-3 justify-between items-center'>
					<div className='mx-2  rounded-3xl'>
						<img
							src={
								img ??
								'https://gti-menu-files.s3.amazonaws.com/63d325e7070c6883f8d3b808/images/restaurant%20Placeholder-33700e2e.png'
							}
							alt=''
							className='w-[60px] h-[60px]'
						/>
					</div>
					<div className='mx-2'>
						<div className='font-bold text-black2'>{title}</div>
						<div className='text-xs font-bold text-black3'>{size}</div>
					</div>
				</div>
				<div className='flex items-baseline mr-1'>
					<span className='text-[30px]  text-black4'>{progress}%</span>{' '}
					<span
						onClick={onRemove}
						style={{ color: 'white', fontSize: '10px' }}
						className='bg-red1 ml-1 color-white p-[2px] rounded-full'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'
							className='w-5 h-5 cursor-pointer'
						>
							<path d='M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z' />
						</svg>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ImageCard;
