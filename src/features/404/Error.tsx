import Error from '../../assets/images/Errorimg.png';
import { useTranslation } from 'react-i18next';

const error = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = useTranslation();
	return (
		<section className='pt-2'>
			<div>
				<h1 className='text-primary font-dinBold text-4xl text-center mb-4 '>
					{t('error.oops')}!
				</h1>
				<p className='capitalize text-2xl text-center font-font-dinNormal mb-8 md:mb-3 max-w-md mx-auto'>
					{t('error.notfound')}
				</p>
				<img
					className='mx-auto max-w-full md:max-w-[612px] lg:max-w-[780px]'
					src={Error}
					alt=''
				/>
				<h1 className='text-2xl'>
					{t('error.feelinglost')}{' '}
					<a className='text-primary font-dinBold' href='/orders'>
						{t('error.getback')}
					</a>{' '}
				</h1>
			</div>
		</section>
	);
};

export default error;
