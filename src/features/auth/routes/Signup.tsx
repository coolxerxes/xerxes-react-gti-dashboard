import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup = () => {
	return (
		<div className='container max-w-[825px] flex justify-center'>
			<div className='w-full bg-lightGray rounded-xl'>
				<SignupForm />
			</div>
		</div>
	);
};

export default Signup;
