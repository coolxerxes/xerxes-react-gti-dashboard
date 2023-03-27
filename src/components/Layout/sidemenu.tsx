import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../../assets/images/logo.svg';
import Logomin from '../../assets/images/logomin.png';
import { FaExpandArrowsAlt } from 'react-icons/fa';
import { menus } from './helpers';
import { useSignOut } from 'hooks';
import { rmCache } from 'utils/cacheService';
import { TOKEN } from 'config/constants';
import { useSidebar } from './hooks/useSidebar';

export default function SideMenu(): JSX.Element {
	const { isVisible, toggleVisibility } = useSidebar();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const signOut = useSignOut();

	const signOutHandler = (key: string, isLogin: boolean = false): void => {
		if (isLogin) {
			rmCache(TOKEN);
			signOut();
		}
		navigate(key);
	};

	return (
		<>
			{/* <div className='h-[60px] p-5 bg-white rounded-lg flex items-center justify-center'>
				<img src={Logo} alt='credit card icon' className='w-[150px] h-[33px]' />
			</div> */}
			<div className={`sidebar  ${isVisible ? 'mr-[70px]' : 'mr-[270px]'}`}>
				<div
					className={`sideMenu   ${
						isVisible ? '' : 'w-[210px]'
					}  flex flex-col min-h-[80vh] h-screen fixed z-10 mb-30`}
				>
					<div
						className={classNames({
							'  max-h-full  bg-white rounded-lg mb-5 pt-4 h-full': true,
							'pb-[120px]': pathname.includes('/settings'),
						})}
					>
						{menus(pathname).map((item) => {
							const isActive = pathname.includes(item.key);
							const isLogin = item.key.includes('login');
							return (
								<>
									<div
										key={item.key}
										className={classNames({
											'flex flex-row mx-4  p-1 my-4 cursor-pointer text-secondary sidebar-item':
												true,
											'text-primary active-border': isActive,
										})}
										onClick={() => {
											signOutHandler(item.key, isLogin);
										}}
									>
										<img
											src={isActive ? item.iconRed : item.icon}
											alt={item.label}
											className='w-[16px] h-[16px]'
										/>

										<span
											className={classNames({
												hidden: isVisible,
												'ml-2 text-[17px] leading-4 space-x-0 block text-start':
													true,
												'text-primary ': isActive,
											})}
										>
											{item.label}
										</span>
									</div>

									{item.isSubMenu && isActive && (
										<div className='ml-[22px] text-left'>
											{item?.subMenus?.map((subMenu, index) => (
												<div key={index}>
													<span
														className={classNames({
															hidden: isVisible,
															'text-primary flex items-center':
																subMenu.isActive,
															'cursor-pointer text-[14px] block': true,
														})}
														onClick={() => {
															if (subMenu.isClickAble) {
																navigate(subMenu.key);
															} else {
																toast.error('Complete previous step first');
															}
														}}
													>
														<span
															className={subMenu.isActive ? 'inline' : 'hidden'}
														>
															—
														</span>
														<span
															className={classNames({
																'text-primary ml-[14px]': subMenu.isActive,
																'text-[15px] ml-[23px] text-secondary':
																	!subMenu.isActive,
															})}
														>
															{subMenu.label}
														</span>
													</span>
												</div>
											))}
										</div>
									)}
								</>
							);
						})}
						<div className='flex ml-4 p-1 mr-auto'>
							<button
								className=' p-0 bg-transparent '
								onClick={toggleVisibility}
							>
								<svg
									className='w-6 h-6 fill-current sidebar-expanded:rotate-180'
									viewBox='0 0 24 24'
								>
									<path
										className='text-primary'
										d='M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z'
									></path>
									<path className='text-primary' d='M3 23H1V1h2z'></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
