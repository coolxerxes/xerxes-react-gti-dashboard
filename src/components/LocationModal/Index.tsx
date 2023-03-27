import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import CloseModalIcon from 'assets/icons/closeModalIcon';
import {
	MapContainer,
	Marker,
	TileLayer,
	Tooltip,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Button from 'components/Button';

interface LatLang {
	lat: number;
	lng: number;
}
interface MarkerProps {
	onSelect: (marker: any, zoom: number) => void;
	values: {
		latitude: string;
		longitude: string;
	};
}

const AddMarkerToClick: React.FC<MarkerProps> = ({
	onSelect,
	values,
}): JSX.Element => {
	const latitude = Number(values.latitude);
	const longitude = Number(values.longitude);

	const [markers, setMarkers] = useState<LatLang[]>([
		{
			lat: latitude,
			lng: longitude,
		},
	]);

	const icon = L.icon({
		iconUrl:
			'https://user-images.githubusercontent.com/18731391/209430186-61c71ce7-e284-4a9f-b28e-6beb6b79ff30.png',
		iconSize: [38, 38],
	});

	const mapEvents = useMapEvents({
		click(e) {
			const newMarker = e.latlng;
			onSelect(newMarker, mapEvents.getZoom());
			setMarkers([newMarker]);
		},
	});

	return (
		<>
			{markers.map((marker: LatLang, index: number) => (
				<Marker key={index} position={marker} icon={icon}>
					<Tooltip>
						<p>latitude: {marker?.lat.toFixed(10)}</p>
						<p>longitude: {marker?.lng.toFixed(10)}</p>
					</Tooltip>
				</Marker>
			))}
		</>
	);
};

interface ModalProps extends MarkerProps {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	zoom: number;
}

const ResizeMap = (): null => {
	const map = useMap();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
	// @ts-ignore
	map._onResize();
	return null;
};

const LocationModal = ({
	isModalOpen,
	setIsModalOpen,
	values,
	onSelect,
	zoom,
}: ModalProps): JSX.Element => {
	return (
		<>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as='div'
					className='relative z-10'
					onClose={() => {
						setIsModalOpen(false);
					}}
				>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='z-[100] px-4  mb-2.5 w-full max-w-md transform overflow-hidden rounded-xl bg-white pt-3 pb-5 text-left align-middle shadow-xl transition-all'>
									<div className='flex items-center justify-between border-b border-gray-200 px-2.5 pb-3 '>
										<Dialog.Title className='text-15px text-primary font-medium text-black100'>
											Choose Branch Location
										</Dialog.Title>
										<div
											onClick={() => {
												setIsModalOpen(false);
											}}
											className='cursor-pointer'
										>
											<CloseModalIcon />
										</div>
									</div>
									<MapContainer
										center={[
											parseFloat(values.latitude),
											parseFloat(values.longitude),
										]}
										zoom={zoom}
										scrollWheelZoom={false}
										// style={{ height: '400px', width: '100%' }}
										style={{
											height: '400px',
											width: '100%',
										}}
									>
										<ResizeMap />
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
										/>
										<AddMarkerToClick values={values} onSelect={onSelect} />
									</MapContainer>
									<div className='flex justify-between '>
										<Button
											variant='ghost'
											className='mr-4 mt-2 rounded-small '
											height={50}
											width={150}
											onClick={async () => {
												setIsModalOpen(false);
											}}
											disable={false}
											type='button'
										>
											Cancel
										</Button>
										<Button
											type='button'
											className=' mt-2 !rounded-small '
											height={50}
											width={100}
											disable={false}
											onClick={async () => {
												setIsModalOpen(false);
											}}
										>
											Ok
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default LocationModal;
