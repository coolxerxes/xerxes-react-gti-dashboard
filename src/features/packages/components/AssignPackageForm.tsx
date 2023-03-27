import Spinner from 'components/Spinner';
import { useGetSupplier } from 'features/settings/api/getSupplier';
import { useGetPackages } from '../api/getPackages';
import { useAssignPackage } from '../api/assignPackage';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { AiOutlineArrowRight } from 'react-icons/ai';

import logo from 'assets/images/logo.svg';
import Input from 'components/Input';
import CustomSwitch from 'components/Switch';
import { useAppDispatch } from 'redux/hooks';
import { postLoginAsync } from 'features/auth/stores/actions';
import { useNavigate } from 'react-router-dom';
import { ADMIN } from 'routes/constants';
import { useAuthSelector } from 'hooks';

import { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';
import Select from 'components/Select';
import { type Option } from 'components/Select/types';

const AssignPackageForm = () => {
	const { data: suppliersData, isLoading: isSupplierDataLoading } =
		useGetSupplier({});

	const { data: packagesData, isLoading: isPackageDataLoading } =
		useGetPackages({});

	const assignPackageMutation = useAssignPackage({});

	const [selectedSupplier, setSelectetSupplier] = useState<string>('');

	const [selectedPackage, setSelectetPackage] = useState<string>('');

	if (isSupplierDataLoading || isPackageDataLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	const supplierOptions: Option[] = [];
	const packagesOptions: Option[] = [];
	return (
		<div className='w-full  flex justify-center items-center rounded-xl  shadow bg-white'>
			<div className=' flex w-full flex-col justify-center items-center'>
				<h3 className='text-xl lg:text-2xl'>
					<img className='h-[165px] w-[200px]' src={logo} alt='' />
				</h3>

				<div className='w-[80%] px-6 py-3'>
					<div>
						<p className='text-left mb-2 text-base'>Supplier</p>
						<Select
							className='h-[50px]'
							options={supplierOptions ?? []}
							selected={selectedSupplier}
							onChange={async (values) => {
								setSelectetSupplier(values);
							}}
						/>
					</div>
					<div>
						<p className='text-left mb-2 text-base'>Package</p>
						<Select
							className='h-[50px]'
							options={packagesOptions ?? []}
							selected={selectedPackage}
							onChange={async (values) => {
								setSelectetPackage(values);
							}}
						/>
					</div>
					<br />

					<br />

					<br />

					<button className='rounded-xl flex justify-between cursor-pointer w-full items-center text-white mx-auto border-none my-2 px-4 bg-primary'>
						<p>Add</p>
						<AiOutlineArrowRight />
					</button>

					<br />
				</div>
			</div>
		</div>
	);
};

export default AssignPackageForm;
