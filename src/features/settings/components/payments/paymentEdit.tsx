import Banner from 'components/Banner';
import Input from 'components/Input';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import Button from 'components/Button';
import Select from 'components/Select';
import { useEnumSelector, useGetEnums } from 'hooks';
import { useEffect, useState } from 'react';
import Upload from 'components/Upload';
import ImagePreview from 'components/ImagePreview';
import { type Payment } from 'features/settings/api/types';
import { useUpdateSupplier } from 'features/settings/api/updateSupplier';
import { useUpdatePaymentSetups } from 'features/settings/api/updatePaymentSetup';
import { toast } from 'react-toastify';
import { useGetPaymentSetups } from 'features/settings/api/getPaymentSetups';
import { useGetSupplierSelf } from 'features/settings/api/getSupplierSelf';
import Spinner from 'components/Spinner';

interface Props {
	value?: string;
}

const PaymentEdit: React.FC<Props> = () => {
	const getEnums = useGetEnums();
	const updateSupplier = useUpdateSupplier({});
	const updatePaymentSetup = useUpdatePaymentSetups({});
	const { data: paymentData } = useGetPaymentSetups({});
	const { data: supplierData } = useGetSupplierSelf({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { enums } = useEnumSelector();
	const payment = paymentData?.data.docs?.[0];
	const supplier = supplierData?.data;

	const { handleSubmit, control, watch, register, reset } = useForm<Payment>(
		{}
	);

	const onSubmit: SubmitHandler<Payment> = async (data) => {
		setIsLoading(true);
		await updatePaymentSetup.mutateAsync({ id: data._id, payload: data });
		toast.success('Updated successfully');
		setIsLoading(false);
	};

	useEffect(() => {
		getEnums({ enums: 'Bank' });
	}, [getEnums]);

	useEffect(() => {
		reset({ ...payment });
	}, [payment, reset]);

	const BankEnums = enums.find((enumItem) => enumItem.name === 'Bank')?.values;

	return (
		<form className='font-bold' onSubmit={handleSubmit(onSubmit)}>
			<div className='w-full  h-[60px] flex items-center rounded-lg sticky top-[11%] z-[100] my-5'>
				<Banner>
					<div className='flex flex-row items-center w-full'>
						<span className='font-bold inline text-[20px] !w-fit space-[-0.38px] ml-10'>
							Edit Payment Information
						</span>
					</div>
				</Banner>
			</div>

			<div className='bg-white mt-5 pt-5 rounded-lg z-0 relative pr-[89px]'>
				<div className='  grid grid-cols-2 gap-y-4 gap-x-5 px-4 mb-2.5'>
					<div>
						<Input
							name='bankAccountHolder'
							register={register}
							placeholder='Bank Account Name In English'
							label='Bank Account Name In English'
						/>
					</div>

					<div>
						<Input
							type='text'
							name='bankAccountHolderEmail'
							placeholder='Email'
							register={register}
							label='Email'
						/>
					</div>
				</div>

				<div className='grid grid-cols-2  gap-4 px-4'>
					<div>
						<Input
							name='iban'
							register={register}
							placeholder='IBAN'
							label='IBAN'
						/>
					</div>

					<div>
						<p className='mb-2.5 text-start'>Choose Bank</p>
						<Controller
							name='bankName'
							control={control}
							render={({ field }) => (
								<Select
									{...field}
									selected={watch('bankName')}
									className='!h-[50px]'
									options={
										BankEnums?.map((item) => ({
											value: item.en,
											label: item.en,
										})) ?? []
									}
								/>
							)}
						/>
					</div>
				</div>

				<div className='flex justify-center mt-4'>
					<Button
						variant='ghost'
						className='mr-4 mt-2 rounded-small '
						height={50}
						width={200}
						onClick={async () => {
							// await deleteHandler();
						}}
						disable={false}
						type='button'
					>
						Active Payment
					</Button>
					<Button
						type='submit'
						className=' mt-2 !rounded-small '
						height={50}
						width={200}
						disable={false}
					>
						{isLoading ? <Spinner color='white' /> : 'Save Info'}
					</Button>
				</div>

				<div className='flex items-center my-4 pl-4 pr-4'>
					<span className='text-primary text-left !min-w-fit font-bold '>
						Files
					</span>
					<div className='h-[.5px] w-full bg-gray ml-2 mt-1'></div>
				</div>

				<div className='grid grid-cols-2  gap-4 px-4 py-2 '>
					<div className='h-fit mb-[70px]'>
						<div className='text-left'>Commercial Register</div>
						<Upload
							horizontal
							onChange={async (url) => {
								await updateSupplier.mutateAsync({ crDoc: url });
							}}
						/>

						{supplier?.crDoc && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: supplier.crDoc,
									}}
									onRemove={() => {}}
									progress={100}
								/>
							</div>
						)}
					</div>
					<div className='h-fit mb-[70px]'>
						<div className='text-left'>Municipality Document</div>
						<Upload
							horizontal
							onChange={async (url) => {
								await updateSupplier.mutateAsync({ mancucpilityCertDoc: url });
							}}
						/>

						{supplier?.mancucpilityCertDoc && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: supplier?.mancucpilityCertDoc,
									}}
									onRemove={() => {}}
									progress={100}
								/>
							</div>
						)}
					</div>
					<div className='h-fit mb-[70px]'>
						<div className='text-left'>
							Article of incorporation - In Case The Register Is A Company -
						</div>
						<Upload
							horizontal
							onChange={async (url) => {
								await updateSupplier.mutateAsync({
									incorporationContractDoc: '',
								});
							}}
						/>

						{supplier?.incorporationContractDoc && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: supplier?.incorporationContractDoc,
									}}
									onRemove={async () => {
										await updateSupplier.mutateAsync({
											incorporationContractDoc: '',
										});
									}}
									progress={100}
								/>
							</div>
						)}
					</div>
					<div className='h-fit mb-[70px]'>
						<div className='text-left'>Copy of ID</div>
						<Upload
							horizontal
							onChange={async (url) => {
								await updateSupplier.mutateAsync({ idDoc: url });
							}}
						/>

						{supplier?.idDoc && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: supplier?.idDoc,
									}}
									onRemove={async () => {
										await updateSupplier.mutateAsync({ idDoc: '' });
									}}
									progress={100}
								/>
							</div>
						)}
					</div>

					<div className='h-fit mb-[70px]'>
						<div className='text-left'>IBAN Certification</div>
						<Upload
							horizontal
							onChange={async (url) => {
								await updateSupplier.mutateAsync({ ibanCertDoc: url });
							}}
						/>

						{supplier?.ibanCertDoc && (
							<div className='w-full bg-gray mt-1 mr-4'>
								<ImagePreview
									details={{
										title: 'logo.png',
										size: '20kb',
										img: supplier?.ibanCertDoc,
									}}
									onRemove={async () => {
										await updateSupplier.mutateAsync({ ibanCertDoc: '' });
									}}
									progress={100}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default PaymentEdit;
