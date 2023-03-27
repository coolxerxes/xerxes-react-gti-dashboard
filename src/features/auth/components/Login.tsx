import SignInForm from './SignInForm';

const Login: React.FC = () => {
	return (
		<div className='container max-w-[523px] flex justify-center'>
			<div className='w-full bg-lightGray rounded-xl'>
				<SignInForm />
			</div>
		</div>
	);
};

export default Login;
