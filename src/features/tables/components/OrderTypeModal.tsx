import classNames from 'classnames';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Select from 'components/Select';
import { useGetTables } from 'features/cashier/api/getTables';
import { setCustomerData, setOrderType } from 'features/order/slices/CartSlice';
import { useGetRestaurants } from 'features/settings/api/getRestaurants';
import React, {
	useState,
	type Dispatch,
	type SetStateAction,
	useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'redux/hooks';
import { searchCustomer } from '../api/searchCustomer';
import { useCreateCustomer } from '../api/createCustomer';
import Input from 'components/Input';
import {
	useForm,
	type RegisterOptions,
	type UseFormRegisterReturn,
} from 'react-hook-form';
interface Props {
	isModalOpen: boolean;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const OrderTypeModal = ({ isModalOpen, setIsModalOpen }: Props) => {
	const { t, i18n } = useTranslation();
	const [restaurant, setRestaurant] = useState('');
	const { register } = useForm();
	const [table, setTable] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [name, setName] = useState('');
	const { data: restaurantsData, isLoading } = useGetRestaurants({});
	const orderType = useAppSelector((state) => state.data.cartReducer.orderType);
	const { data: tableData } = useGetTables({});

	const tableOptions = tableData?.data.docs?.map((table) => ({
		value: table?._id,
		label: table.name,
	}));
	const restaurantsOptions = restaurantsData?.data.docs.map((restaurant) => ({
		label: restaurant.name,
		value: restaurant.id,
	}));
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const createCustomer = useCreateCustomer();
	const handleNavigateNewOrder = async () => {
		if (orderType === '') {
			toast.error('Please select an order type');
		} else if (table === '' && orderType === 'Dine In') {
			toast.error('Please select a table since order type id Dine In');
		} else if (restaurant === '') {
			toast.error('Please select a restaurant');
		} else if (orderType === 'Pickup') {
			const data = await searchCustomer({
				phoneNumber,
			});

			if (data.data?.docs?.[0]?._id) {
				dispatch(setCustomerData(data.data?.docs));
				navigate(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`/neworder/${
						restaurantsData?.data.docs && restaurantsData?.data.docs.length > 0
							? restaurantsData?.data.docs?.[0]?._id
							: restaurant
					}/`
				);
			} else {
				void createCustomer
					.mutateAsync({
						data: {
							name,
							phoneNumber,
						},
					})
					.then((res) => {
						dispatch(setCustomerData(res.data));
						navigate(
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							`/neworder/${
								restaurantsData?.data.docs &&
								restaurantsData?.data.docs.length > 0
									? restaurantsData?.data.docs?.[0]?._id
									: restaurant
							}/`
						);
					});
			}
		} else {
			orderType === 'Dine In'
				? navigate(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						`/neworder/${
							restaurantsData?.data.docs &&
							restaurantsData?.data.docs.length > 0
								? restaurantsData?.data.docs?.[0]?._id
								: restaurant
						}/${table}`
				  )
				: navigate(
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						`/neworder/${
							restaurantsData?.data.docs &&
							restaurantsData?.data.docs.length > 0
								? restaurantsData?.data.docs?.[0]?._id
								: restaurant
						}/`
				  );
		}
	};

	useEffect(() => {
		if (
			!isLoading &&
			restaurantsData?.data.docs &&
			restaurantsData?.data.docs.length === 1
		) {
			setRestaurant(restaurantsData?.data.docs[0]._id);
		}
	}, [isLoading]);

	return (
		// eslint-disable-next-line react/jsx-no-undef
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				{restaurantsData?.data.docs.length &&
					restaurantsData?.data.docs.length > 1 && (
						<div className='flex flex-col grow '>
							<p className='text-left text-base'>
								{t('restaurant.restaurant')}
							</p>
							<Select
								className='h-[50px]'
								options={restaurantsOptions ?? []}
								selected={restaurant}
								onChange={async (values) => {
									setRestaurant(values);
								}}
							/>
						</div>
					)}

				{orderType === 'Dine In' && (
					<div className='flex flex-col grow  mt-2.5'>
						<p className='text-left text-base'>{t('restaurant.tables')}</p>
						<Select
							className='h-[50px]'
							options={tableOptions ?? []}
							selected={table}
							onChange={async (values) => {
								setTable(values);
							}}
						/>
					</div>
				)}

				{orderType === 'Pickup' && (
					<div className='flex flex-col grow  mt-2.5'>
						<p className='text-left text-base'>{t('additions.name')}</p>

						<Input
							name={'name'}
							onChange={(e) => {
								setName(e.target.value);
							}}
							register={register}
						/>
						<p className='text-left text-base'>{t('common.phoneNumber')}</p>

						<Input
							name={'phone'}
							onChange={(e) => {
								setPhoneNumber(e.target.value);
							}}
							register={register}
						/>
					</div>
				)}

				<div className='flex items-center justify-between gap-2.5'>
					<div className='mt-2.5 flex flex-col grow gap-2.5'>
						<p className='text-left mb-2.5 text-base'>{t('order.orderType')}</p>
						<Button
							className={classNames({
								'py-6 bg-gray': true,
							})}
							backgroundColor={orderType === 'To Go' ? '#C02328' : '#aba5a2'}
							onClick={() => {
								setTable('');
								dispatch(setOrderType('To Go'));
							}}
						>
							{t('order.togoOrder')}
						</Button>
						<Button
							className={classNames({
								'py-6 ': true,
							})}
							onClick={() => {
								dispatch(setOrderType('Dine In'));
							}}
							backgroundColor={orderType === 'Dine In' ? '#C02328' : '#aba5a2'}
						>
							{t('order.dineInOrder')}
						</Button>

						<Button
							className={classNames({
								'py-6 bg-gray': true,
							})}
							backgroundColor={orderType === 'Pickup' ? '#C02328' : '#aba5a2'}
							onClick={() => {
								setTable('');
								dispatch(setOrderType('Pickup'));
							}}
						>
							{t('order.pickupOrder')}
						</Button>
						<Button
							className={classNames({
								'py-6 bg-gray': true,
							})}
							backgroundColor={orderType === 'Delivery' ? '#C02328' : '#aba5a2'}
							onClick={() => {
								setTable('');
								dispatch(setOrderType('Delivery'));
							}}
						>
							{t('order.deliveryorder')}
						</Button>
					</div>
				</div>
				<div className='flex items-center gap-x-2.5 grow mt-6'>
					<Button
						className='grow py-[25px]'
						variant='ghost'
						onClick={() => {
							setIsModalOpen(false);
						}}
					>
						{t('common.cancel')}
					</Button>
					<Button
						onClick={handleNavigateNewOrder}
						className='grow py-6'
						type='submit'
					>
						{t('order.createOrder')}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default OrderTypeModal;
