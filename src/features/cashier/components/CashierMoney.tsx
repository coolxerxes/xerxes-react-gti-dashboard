import Banner from 'components/Banner';
import Button from 'components/Button';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useGetListCashiers } from '../api/getListCahier';
import { getProfileMe } from 'features/auth/api';
import { useStartCashier } from '../api/startCashier';
import { RejectCashierModal } from './RejectCashierModal';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGetCashierLogsById } from '../api/getLogs';
import Spinner from 'components/Spinner';
import { useGetCashieById } from '../api/getCashierById';
import { useAppSelector } from 'redux/hooks';

const orderDetails = ['Dine In', 'Nuruzzaman Khan', 2, 'N/A'];
const CashierMoney = () => {
	const navigate = useNavigate();
	const userData = useAppSelector((state) => state.resources.auth.user);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [profile, setProfile] = useState({});
	const [selectedCashier, setSelectedCashier] = useState('');
	// const { data: cashiers, isLoading } = useGetListCashiers({});
	const {
		data: cashierByIdData,
		refetch: refetchCashierById,
		isLoading: isCashierByIdDataLoading,
	} = useGetCashieById({
		id: userData?.cashier,
	});
	const {
		data: cashierLogsData,
		refetch,
		isLoading: isCashierLogsDataLoading,
	} = useGetCashierLogsById({
		id: userData?.cashier,
	});

	const startCahiers = useStartCashier({ selectedCashier: selectedCashier });

	const handlerGetProfileMe = async () => {
		const profile = await getProfileMe();
		setProfile(profile.data);
		setSelectedCashier(profile.data.cashier);
	};
	useEffect(() => {
		setSelectedCashier(userData?.cashier);
	}, [userData]);

	const handlerStartCahiers = async () => {
		await startCahiers.mutateAsync({
			cashierId: selectedCashier,
			openingBalance: cashierLogsData?.data?.closingBalance,
		});
	};

	const handlerOpenModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		if (!isCashierByIdDataLoading && cashierByIdData?.data?.currentLog) {
			navigate('/cashier');
		}
		// if(cashierLogsData?.data?.)
	}, [isCashierByIdDataLoading]);
	if (isCashierLogsDataLoading || isCashierByIdDataLoading) {
		return <Spinner />;
	}

	return (
		<div>
			{!cashierByIdData?.data?.currentLog && (
				<>
					<div className='w-[100%] mt-5'>
						<Tab.Group>
							<Banner>
								<Tab.List className='w-[100%] flex flex-wrap gap-2 p-2'>
									{/* {(cashiers?.data.docs ?? [])?.map((cashier: any) => (
										<Tab key={cashier.id} className='p-0 mx-[2px]'>
											<Button
												onClick={() => {
													setSelectedCashier(cashier.id);
												}}
												variant='default'
												className={classNames(
													'bg-[#F5F5F5] !text-[#ABA5A2] border-0',
													{
														'!bg-[#C02328] !text-white hover:!text-white active:!text-white':
															selectedCashier === cashier.id,
													}
												)}
												width={130}
												height={60}
											>
												{cashier.name}
											</Button>
										</Tab>
									))} */}
									<Tab key={cashierByIdData?.data?.id} className='p-0 mx-[2px]'>
										<Button
											onClick={() => {
												setSelectedCashier(cashierByIdData?.data?._id);
											}}
											variant='default'
											className={classNames(
												'bg-[#F5F5F5] !text-[#ABA5A2] border-0',
												{
													'!bg-[#C02328] !text-white hover:!text-white active:!text-white':
														selectedCashier === cashierByIdData?.data?._id,
												}
											)}
											width={130}
											height={60}
										>
											{cashierByIdData?.data?.name}
										</Button>
									</Tab>
								</Tab.List>
							</Banner>
						</Tab.Group>
					</div>
					<div className='w-full mt-8 relative z-0 tracking-tighter'>
						<div className='w-full bg-white rounded-lg min-h-[600px] flex items-center justify-center'>
							<div className='flex h-full flex-col items-center justify-center p-3'>
								<div className='bg-[#FAFCF6] flex items-center justify-center flex-col w-[400px] border-green border rounded-small py-3 gap-y-2.5'>
									<span className='text-darkGreen text-2xl font-extrabold'>
										{cashierLogsData?.data?.closingBalance} SAR
									</span>
									<span className='text-center  text-xl'>Money on Cashier</span>
								</div>
								<div className='flex items-center gap-2.5 mt-4'>
									<Button width={200} height={50} onClick={handlerStartCahiers}>
										Approve
									</Button>
									<Button
										variant='ghost'
										width={200}
										height={50}
										onClick={handlerOpenModal}
									>
										Reject
									</Button>
								</div>
							</div>
						</div>
					</div>

					<RejectCashierModal
						isOpen={isModalOpen}
						setIsOpen={handlerOpenModal}
						selectedCashier={selectedCashier}
					/>
				</>
			)}
		</div>
	);
};

export default CashierMoney;
