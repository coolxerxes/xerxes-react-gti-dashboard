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
import Spinner from 'components/Spinner';

import { type Inputs } from '../types';
import { useState } from 'react';
import { BiShowAlt } from 'react-icons/bi';

const SignInForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { status, isLogin } = useAuthSelector();
	const [isShowPassword, setIsShowPassword] = useState(false);
	const { handleSubmit, control, watch, register } = useForm<Inputs>({
		defaultValues: {
			rememberMe: true,
			email: 'aalmuwallad@gmail.com', // TODO: remove when it will go to live
			alias: 'ab104',
			password: 'Test@123456', // TODO: remove when it will go to live
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		await dispatch(postLoginAsync(data));
		// navigate('/orders');
		navigate('/');
	};

	const isLoading = status === 'STARTED';

	if (isLogin) {
		navigate(ADMIN.PATHS.ROOT);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='w-full  flex justify-center items-center rounded-xl  shadow bg-white'>
				<div className=' flex w-full flex-col justify-center items-center'>
					<h3 className='text-xl lg:text-2xl'>
						<img className='h-[165px] w-[200px]' src={logo} alt='' />
					</h3>

					<div className='w-[80%] px-6 py-3'>
						<div className='justify-start text-start'>
							<p className='mb-2'>Email</p>
							<Input
								name='email'
								type='text'
								placeholder='Enter your email'
								register={register}
							/>
						</div>
						<div className='justify-start text-start'>
							<p className='mb-2'>Alias</p>
							<Input
								name='alias'
								type='text'
								placeholder='Enter your email'
								register={register}
							/>
						</div>
						<br />
						<div className='justify-start text-start'>
							<p className='mb-2'>Password</p>
							<div className=' w-full relative'>
								<Input
									className='w-full'
									name='password'
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
						<br />
						<div className='flex justify-between'>
							<div className='flex items-center'>
								<Controller
									name='rememberMe'
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<CustomSwitch
											checked={watch('rememberMe')}
											type='Danger'
											{...field}
										/>
									)}
								/>
								<span className='ml-2 font-bold'>Remember me</span>
							</div>
							<p className='text-dimText'>Forget Password?</p>
						</div>
						<br />
						{isLoading ? (
							<Spinner />
						) : (
							<button
								type='submit'
								className='rounded-xl flex justify-between cursor-pointer w-full items-center text-white mx-auto border-none my-2 px-4 bg-primary'
								disabled={isLoading}
							>
								<p>Sign In</p>
								<AiOutlineArrowRight />
							</button>
						)}
						<br />
					</div>
				</div>
			</div>
		</form>
	);
};

export default SignInForm;
