/* eslint-disable no-console */
import { Routes, useLocation, useNavigate } from 'react-router-dom';

import { DashBoardRoutes } from './routes/routeConfig';
import io from 'socket.io-client';

import './App.css';
import './ribon.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useGetSupplierSelf } from 'features/settings/api/getSupplierSelf';
import { useGetOrders } from 'features/kitchen/api/getOrders';
import { Howl } from 'howler';
import noise from './assets/tablelog.mp3';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from './utils/useEffectOnce';
import Spinner from 'components/Spinner';
import { setOrders } from 'redux/ordersReducer';
import { genralSocket } from 'utils/socket';
// import { genralSocket } from 'utils/socket';

function App(): JSX.Element {
	const token = localStorage.getItem('token') as string;
	const { refetch } = useGetOrders({ skip: true });
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const audio = new Howl({
		src: [noise],
	});

	useEffect(() => {
		if (
			!token &&
			location.pathname !== '/signup' &&
			location.pathname !== '/assign-package'
		) {
			navigate('/login');
		}
		setLoading(false);
	}, [token, location.pathname]);

	useEffectOnce(() => {
		if (token) {
			// const socket = io('https://apimenudev.talabatmenu.com', {
			// 	extraHeaders: {
			// 		Authorization: `Bearer ${token}`,
			// 	},
			// });

			// socket.on('connect', function () {
			// 	// socket.emit('ping', { test: 'test' });
			// });

			// // socket.emit('ping', { test: 'test' });

			// socket.on('ping', function (data) {});

			// socket.on('auth', function (data) {});

			// socket.on('KitchenQueue', function (data) {
			// 	if (data.KitchenQueueId) {
			// 		audio.play();

			// 		refetch()
			// 			.then((res) => {
			// 				dispatch(setOrders(res.data?.data.docs));
			// 			})
			// 			.catch((err) => err);
			// 	}
			// });
			function onKitchenQueue(data: any) {
				console.log('🚀 ~ file: App.tsx:73 ~ onKitchenQueue ~ data:', data);
				if (data.KitchenQueueId) {
					audio.play();

					refetch()
						.then((res) => {
							dispatch(setOrders(res.data?.data.docs));
						})
						.catch((err) => err);
				}
			}

			genralSocket.on('KitchenQueue', onKitchenQueue);
			return () => {
				genralSocket.off('KitchenQueue', onKitchenQueue);
			};
		}
	}, [token]);

	if (loading) return <Spinner />;
	return <Routes>{DashBoardRoutes()}</Routes>;
}

export default App;
