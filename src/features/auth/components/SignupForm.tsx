import { useForm, type SubmitHandler } from 'react-hook-form';
import { AiOutlineArrowRight } from 'react-icons/ai';

import logo from 'assets/images/logo.svg';
import Input from 'components/Input';

import { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';
import { useRegister } from '../api/regsiter';
import { type RegisterInputs } from '../types/types';
const SignupForm = () => {
	const registerMutation = useRegister({});

	const [isShowPassword, setIsShowPassword] = useState(false);
	const { handleSubmit, register } = useForm<RegisterInputs>({});

	const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
		await registerMutation.mutateAsync({
			data: {
				supplier: {
					alias: data.alias,
					email: data.email,
					name: data.name,
					about: data.about,
					aboutAr: data.aboutAr,
					domain: data.domain,
					instagram: data.instagram,
					nameAr: data.nameAr,
					phoneNumber: data.phoneNumber,
					reservationFee: parseFloat(
						(data.reservationFee as unknown as string) ?? 0
					),
					snapchat: data.snapchat,
					taxEnabled: data.taxEnabled,
					taxRate: parseFloat((data.taxRate as unknown as string) ?? 0),
					tiktok: data.tiktok,
					twitter: data.twitter,
					vatNumber: data.vatNumber,
					whatsapp: data.whatsapp,
				},
				email: data.supplierUserEmail,
				name: data.supplierUserName,
				password: data.supplierUserPassword,
				phoneNumber: data.supplierUserPhoneNumber,
				whatsappNumber: data.supplierUserWhatsappNumber,
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='w-full  flex justify-center items-center rounded-xl  shadow bg-white'>
				<div className=' flex w-full flex-col justify-center items-center'>
					<h3 className='text-xl lg:text-2xl'>
						<img className='h-[165px] w-[200px]' src={logo} alt='' />
					</h3>

					<div className='w-[80%]  px-6 py-3'>
						<div className='mb-5'>
							<h1 className='text-start mb-3 font-bold text-primary text-xl'>
								Supplier{' '}
							</h1>
							<div className='grid grid-cols-2 mb-5'>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Email</p>
									<Input
										name='email'
										type='text'
										required
										placeholder='Enter your email'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Alias</p>
									<Input
										name='alias'
										type='text'
										required
										placeholder='Enter your email'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Name</p>
									<Input
										name='name'
										type='text'
										required
										placeholder='Enter your name'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Name Ar</p>
									<Input
										name='nameAr'
										type='text'
										placeholder='Enter your Name in arabic'
										register={register}
									/>
								</div>

								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>About</p>
									<Input
										name='about'
										type='text'
										required
										placeholder='Enter your about'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>About Ar</p>
									<Input
										name='aboutAr'
										type='text'
										placeholder='Enter your about in arabic'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Phone Number</p>
									<Input
										name='phoneNumber'
										type='text'
										required
										placeholder='Enter your phone'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Vat Number</p>
									<Input
										name='vatNumber'
										type='text'
										placeholder='Enter your Vat'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Twitter Url</p>
									<Input
										name='twitter'
										type='text'
										required
										placeholder='Enter your twitter url'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Instagram Url</p>
									<Input
										name='instagram'
										type='text'
										placeholder='Enter your instagram url'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Snapchat Url</p>
									<Input
										name='snapchat'
										type='text'
										required
										placeholder='Enter your snapchat url'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Tiktok Url</p>
									<Input
										name='tiktok'
										type='text'
										placeholder='Enter your tiktok url'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Whatsapp</p>
									<Input
										name='whatsapp'
										type='text'
										required
										placeholder='Enter your whatsapp '
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Domain</p>
									<Input
										name='domain'
										type='text'
										placeholder='Enter your domain '
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Tax Rate</p>
									<Input
										name='taxRate'
										type='number'
										required
										placeholder='Enter your tax tate'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mb-2'>
									<p className='mb-2'>Reservation Fee</p>
									<Input
										name='reservationFee'
										type='number'
										placeholder='Enter your reservation Fee '
										register={register}
									/>
								</div>
							</div>
						</div>

						<div className='mb-3'>
							<h1 className='text-start mb-3 font-bold text-primary text-xl'>
								Supplier User{' '}
							</h1>
							<div className='grid grid-cols-2 mb-5'>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Email</p>
									<Input
										name='supplierUserEmail'
										type='text'
										required
										placeholder='Enter your email'
										register={register}
									/>
								</div>
								<div className='justify-start text-start'>
									<p className='mb-2'>Password</p>
									<div className=' w-full relative'>
										<Input
											className='w-full'
											name='supplierUserPassword'
											type={isShowPassword ? 'text' : 'password'}
											isRightIcon
											placeholder='Enter your password'
											register={register}
										/>
										<BiShowAlt
											className='w-5 h-5 cursor-pointer absolute right-5 top-1/2 -translate-y-1/2'
											onClick={() => {
												setIsShowPassword(!isShowPassword);
											}}
										/>
									</div>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Name</p>
									<Input
										name='supplierUserName'
										type='text'
										required
										placeholder='Enter your name'
										register={register}
									/>
								</div>

								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Phone Number</p>
									<Input
										name='supplierUserPhoneNumber'
										type='text'
										placeholder='Enter your phone'
										register={register}
									/>
								</div>
								<div className='justify-start text-start mr-3 mb-2'>
									<p className='mb-2'>Whatsapp Number</p>
									<Input
										name='supplierUserWhatsappNumber'
										type='text'
										placeholder='Enter your Whatsapp Number'
										register={register}
									/>
								</div>
							</div>
						</div>

						<button
							type='submit'
							className='rounded-xl flex justify-between cursor-pointer w-full items-center text-white mx-auto border-none my-2 px-4 bg-primary'
						>
							<p>Register</p>
							<AiOutlineArrowRight />
						</button>

						<br />
					</div>
				</div>
			</div>
		</form>
	);
};

export default SignupForm;
