import {
	FaLinkedinIn,
	FaFacebookF,
	FaGooglePlusG,
	FaTwitter,
} from 'react-icons/fa';

const MainFooter: React.FC = () => {
	return (
		<div className='bottom rounded-xl bg-white mt-5 mb-2 p-4 w-full'>
			<div className='flex justify-between'>
				<span className='text-sm font-semibold text-secondary'>
					Made by Talabat Menu © 2023
				</span>

				<div className='flex gap-4'>
					<a href='#'>
						<FaFacebookF className='text-lg text-facebookBlue' />
					</a>
					<a href='#'>
						<FaTwitter className='text-lg text-twitterSkyBlue' />
					</a>
					<a href='#'>
						<FaLinkedinIn className='text-lg text-linkedInBlue' />
					</a>
					<a href='#'>
						<FaGooglePlusG className='text-xl text-googlePlusOrange' />
					</a>
				</div>
			</div>
		</div>
	);
};

export default MainFooter;
