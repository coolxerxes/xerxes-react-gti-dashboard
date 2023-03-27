import React, { useEffect, useRef } from 'react';
import { useAppSelector } from 'redux/hooks';
import io from 'socket.io-client';

const WhatsappQR = () => {
	const supplierId = useAppSelector(
		(state) => state?.resources?.auth?.user?.supplierId
	);

	const imageRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (supplierId) {
			const socket = io('https://whatsapp.talabatmenu.com', {
				query: { sessionId: supplierId },
			});
			socket.on('connect', function () {
				socket.emit('ping', { test: 'test' });
				socket.emit('Whatsapp:Connect', {});
			});
			socket.on('ping', function (data) {});
			socket.on('Whatsapp:Qr', function (data) {
				if (imageRef.current) {
					imageRef.current.src = data;
				}
			});
			socket.on('Whatsapp:Authenticated', function (data) {
				console.log('Whatsapp:Authenticated', data);
				if (textRef.current) {
					textRef.current.textContent = 'Whatsapp:Authenticated';
				}
			});
			socket.on('Whatsapp:AuthFailure', function (data) {
				console.log('Whatsapp:AuthFailure', data);
				if (textRef.current) {
					textRef.current.textContent = 'Whatsapp:AuthFailure';
				}
			});
			socket.on('Whatsapp:Disconnected', function (data) {
				console.log('Whatsapp:Disconnected', data);
				if (textRef.current) {
					textRef.current.textContent = 'Whatsapp:Disconnected';
				}
			});
			socket.on('Whatsapp:Timeout', function (data) {
				console.log('Whatsapp:Timeout', data);
				if (imageRef.current) {
					imageRef.current.src = '';
				}
				if (textRef.current) {
					textRef.current.textContent = 'Whatsapp:Timeout';
				}
			});
			return () => {
				socket.disconnect();
			};
		}
	}, [supplierId]);

	return (
		<div>
			{' '}
			<img id='qr' ref={imageRef} width='300px' />
			<p id='message' ref={textRef}></p>
		</div>
	);
};

export default WhatsappQR;
