import { io } from 'socket.io-client';
const URL =
	process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const genralSocket = io('https://apimenudev.talabatmenu.com', {
	// autoConnect: false,
	// extraHeaders: {
	//     Authorization: `Bearer ${token}`,
	// },
});
