/* eslint-disable react/no-unknown-property */
/* eslint-disable no-return-assign */
import { ToastContainer } from 'react-toastify';
import SideMenu from './sidemenu';
import Header from './Header';
import MainFooter from './Footer';
import { useAuthSelector, useProfileMe } from 'hooks';
import Spinner from 'components/Spinner';
import { getToken, rmCache } from 'utils/cacheService';
import { useSidebar } from './hooks/useSidebar';
import useScrollPosition from './hooks/useScrollPosition';
import { useEffect } from 'react';
import { getProfileMe } from 'features/auth/api';
import { TOKEN } from 'config/constants';
import { signOut } from 'features/auth/stores/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const MyLayout: React.FC<React.PropsWithChildren> = (props) => {
	const scrollPosition = useScrollPosition();

	const { isVisible } = useSidebar();
	const { children } = props;
	const { status, isLogin } = useAuthSelector();
	const navigate = useNavigate();
	const token = getToken();
	const isLoading = status === 'STARTED';
	const dispatch = useDispatch();
	useEffect(() => {
		if (token) {
			getProfileMe()
				.then((res) => {})
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.error(err);
					rmCache(TOKEN);
					window.location.reload();
					dispatch(signOut());
					navigate('/login');
				});
		}
	}, [token]);

	if (isLoading && token) {
		return (
			<div className='min-h-[100vh] flex items-center justify-center'>
				<Spinner />
			</div>
		);
	}

	return (
		<div className='backgroundImage'>
			<ToastContainer />
			{isLogin ? (
				<div className='min-h-[100vh] py-[20px] container px-[15px] lg:px-[50px]'>
					<div className='flex flex-row w-full'>
						<SideMenu />

						<div className='w-full  relative '>
							<div className='z-[100] sticky top-4 sticky-container'>
								<div
									className={
										scrollPosition > 50
											? `absolute inset-0 rounded-lg shadow-lg`
											: ``
									}
								></div>
								<div
									className={
										scrollPosition > 50
											? `absolute inset-0 rounded-lg shadow-lg before:absolute before:inset-0 `
											: ``
									}
								></div>
								<div
									className={
										scrollPosition > 50
											? `absolute inset-0 rounded-lg shadow-lg after:absolute after:inset-0 `
											: ``
									}
								></div>

								<Header />
							</div>
							<div className=' min-h-[100vh] w-full'>
								{children}
								{isLogin && <MainFooter />}
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='pt-16 lg:pt-24 min-h-[80vh] flex items-center'>
					{children}
				</div>
			)}
		</div>
	);
};

export default MyLayout;
