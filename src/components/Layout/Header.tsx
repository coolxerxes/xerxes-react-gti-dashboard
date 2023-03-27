import { AiOutlineBell } from 'react-icons/ai';
import Flag from 'assets/images/flag.svg';
import USAFlag from 'assets/images/usa-flag.svg';
import Search from 'components/Search';
import { useAuthSelector } from 'hooks';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
	const { user } = useAuthSelector();
	const { t, i18n } = useTranslation();

	const handleChangeLang = async () => {
		if (i18n.resolvedLanguage === 'en') {
			await i18n.changeLanguage('ar');
		} else {
			await i18n.changeLanguage('en');
		}
	};

	return (
		<div className='nav w-full mt-0 rounded-lg '>
			<div className='py-[8px] px-[15px] flex w-full items-center justify-between gap-1.5 bg-white opacity-100 bg-opacity-100 rounded-lg'>
				<div className='mr-10 flex flex-row items-center min-w-[350px] justify-between ml-auto'>
					<Search
						className='w-[288px]'
						placeholder='Search ...'
						onChange={() => {}}
						name='search'
					/>
					<div className='w-[1px] h-[26px] bg-gray opacity-[.15]' />
					<div />
					<img
						src={i18n.resolvedLanguage === 'en' ? USAFlag : Flag}
						alt='flag'
						className='w-[32px] h-[22px] cursor-pointer'
						onClick={handleChangeLang}
					/>
					<div className='w-[1px] h-[26px] bg-gray opacity-[.15]' />
					<AiOutlineBell className='h-[25px] w-[30px] cursor-pointer' />
				</div>
			</div>
		</div>
	);
};

export default Header;
