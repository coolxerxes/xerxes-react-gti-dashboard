import Banner from 'components/Banner';
import Switch from 'components/Switch';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from 'routes/constants';
import { useGetPaymentSetups } from 'features/settings/api/getPaymentSetups';
import { useUpdatePaymentSetups } from 'features/settings/api/updatePaymentSetup';
import { useEffect, useState } from 'react';
import { type Payment } from 'features/settings/api/types';
import { toast } from 'react-toastify';
import Spinner from 'components/Spinner';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const PaymentsIntegration: React.FC = () => {
	const { t, i18n } = useTranslation();
	const { data: paymentData } = useGetPaymentSetups({});
	const [payment, setPayment] = useState<Payment | undefined>(undefined);
	const updatePayment = useUpdatePaymentSetups({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setPayment(paymentData?.data.docs?.[0]);
	}, [paymentData]);

	const navigate = useNavigate();

	if (!payment) return null;

	const updatePaymentHandler = async ({
		id,
		payload,
	}: {
		id: string;
		payload: Payment;
	}) => {
		setIsLoading(true);
		const { data } = await updatePayment.mutateAsync({
			id,
			payload: {
				...payment,
				...payload,
			},
		});
		toast.success('Updated successfully');
		setPayment(data);
		setIsLoading(false);
	};

	return (
		<div>
			<div className='w-full  h-[60px] flex items-center rounded-lg sticky top-[11%] z-[100] my-5'>
				<Banner className='px-3'>
					<div className='flex flex-row items-center w-full my-5 '>
						<span className='font-dinBold inline text-xl xl:text-[21px] !w-fit space-[-0.38px]'>
						{t('payment.onlinepayment')}
						</span>
						<p className='text-[#ABA5A2] text-xs xl:text-[13px] max-w-[450px] text-left ml-4 leading-4'>
						{t('payment.paymentfees')}						
						</p>
					</div>
					<div className='!min-w-fit xl:text-base'>
						{!isLoading ? (
							<Button
								onClick={() => {
									navigate(`${ADMIN.PATHS.SETTINGS_PAYMENT}/${payment._id}`);
								}}
							>
								{t('payment.editpayment')}
							</Button>
						) : (
							<Spinner />
						)}
					</div>
				</Banner>
			</div>
			<div className='bg-white mt-5 pt-5 rounded-lg z-0 relative xl:text-base'>
				<div className='grid grid-cols-4  text-left gap-4 p-5'>
					<div className='font-bold'>{t('payment.paymentoptions')}</div>
					<div className='font-bold'>{t('payment.onlinepayment')}</div>
					<div className='font-bold'>{t('payment.cashpayment')}</div>
					<div className='font-bold'>{t('payment.rewards')}</div>
				</div>
				<div className='w-full h-[0.5px] bg-inputBg'></div>
				<div className='grid grid-cols-4 text-left  gap-4 p-5'>
					<div>{t('payment.dinein')}</div>
					<div className='font-bold'>
						<Switch
							checked={payment?.inStore?.ePayment}
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										inStore: {
											...payment?.inStore,
											ePayment: value,
										},
									},
								});
							}}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										inStore: {
											...payment?.inStore,
											cashPayment: value,
										},
									},
								});
							}}
							checked={payment?.inStore?.cashPayment}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										inStore: {
											...payment?.inStore,
											rewardsClaim: value,
										},
									},
								});
							}}
							checked={payment?.inStore?.rewardsClaim}
							type='Success'
						/>
					</div>
				</div>
				<div className='w-full h-[0.5px] bg-inputBg'></div>

				<div className='grid grid-cols-4 text-left gap-4 p-5'>
					<div>{t('payment.pickuporders')}</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										pickup: {
											...payment?.pickup,
											ePayment: value,
										},
									},
								});
							}}
							checked={payment?.pickup?.ePayment}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										pickup: {
											...payment?.pickup,
											cashPayment: value,
										},
									},
								});
							}}
							checked={payment?.pickup?.cashPayment}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										pickup: {
											...payment?.pickup,
											rewardsClaim: value,
										},
									},
								});
							}}
							checked={payment?.pickup?.rewardsClaim}
							type='Success'
						/>
					</div>
				</div>
				<div className='w-full h-[0.5px] bg-inputBg'></div>
				<div className='grid grid-cols-4 text-left  gap-4 p-5'>
					<div>{t('payment.delivery')}</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										delivery: {
											...payment?.delivery,
											ePayment: value,
										},
									},
								});
							}}
							checked={payment?.delivery?.ePayment}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										delivery: {
											...payment?.delivery,
											cashPayment: value,
										},
									},
								});
							}}
							checked={payment?.delivery?.cashPayment}
							type='Success'
						/>
					</div>
					<div className='font-bold'>
						<Switch
							onChange={async (value) => {
								await updatePaymentHandler({
									id: payment._id,
									payload: {
										...payment,
										delivery: {
											...payment?.delivery,
											rewardsClaim: value,
										},
									},
								});
							}}
							checked={payment?.delivery?.rewardsClaim}
							type='Success'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentsIntegration;
