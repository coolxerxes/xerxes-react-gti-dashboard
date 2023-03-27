import Button from 'components/Button';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: any;
	invoiceData: any;
}

const InvoiceModal = ({ isModalOpen, setIsModalOpen, invoiceData }: Props) => {
	const invoiceFullData = invoiceData?.data?.docs?.[0];
	const { t } = useTranslation();

	return (
		<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<div className='px-[25px] flex flex-col grow'>
				<h1 className='text-primary font-bold text-xl mb-6 text-center'>
					{t('order.invoice')} {parseInt(invoiceFullData?.invoiceNumber)}
				</h1>
				<div className='flex items-center gap-x-2.5 grow mt-6 w-full'>
					<a className='w-full' href={invoiceFullData?.url} download>
						<Button className='grow py-6 w-full'>
							{t('common.download')} {t('order.invoice')}
						</Button>
					</a>
				</div>
			</div>
		</Modal>
	);
};

export default InvoiceModal;
