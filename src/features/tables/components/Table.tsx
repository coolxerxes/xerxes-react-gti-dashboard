import classNames from 'classnames';
import Button from 'components/Button';
import SimpleTag from 'components/Tag/SimpleTag';
import { type RestaurantId, type TableLog } from 'features/cashier/api/types';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { useCallWaiter } from '../api/patchTableUpdate';
import { useTranslation } from 'react-i18next';

interface props {
	table:
		| {
				currentTableLog?: TableLog;
				_id: string;
				supplierId: string;
				restaurantId: RestaurantId;
				tableRegionId: string;
				name: string;
				nameAr: string;
				totalChairs: number;
				shape: string;
				minutesAllowed: number;
				startingTime?: any;
				status: string;
				waiterNeeded: boolean;
				deletedAt?: any;
				addedBy: string;
				createdAt: string;
				updatedAt: string;
				newOrders: number;
				onTableOrders: number;
				processingOrders: number;
		  }
		| any;
	refetchTables: any;
}

const Table = ({ table, refetchTables }: props) => {
	const {
		_id,
		status,
		name,
		totalChairs,
		currentTableLog,
		newOrders,
		onTableOrders,
		processingOrders,
		nameAr,
	} = table;
	const navigate = useNavigate();
	const callTheWaiterMutation = useCallWaiter();
	const { t, i18n } = useTranslation();

	const rootClassName = classNames(
		'relative border-2  p-3 rounded-[5px] text-start  h-full border-[#30CCAF] text-white cursor-pointer min-h-[192px]',
		!currentTableLog?.paymentNeeded && 'bg-[#75D14E] green-ribbon',
		currentTableLog?.helpNeeded && '!bg-[#FC5C61] red-ribbon',
		currentTableLog?.paymentNeeded &&
			!currentTableLog?.helpNeeded &&
			'bg-[#53E3E8] cyan-ribbon',
		status === 'Reserved' &&
			'!bg-[#E2E2E2] !text-black border-[#ABA5A2] gray-ribbon',
		currentTableLog === null && '!bg-[#ABA5A2] !text-black border-[#ABA5A2]'
	);

	const handleResetHelpNeeded = async () => {
		await callTheWaiterMutation.mutateAsync({
			tableId: _id,
			data: { helpNeeded: false },
		});

		refetchTables(table);
	};

	return (
		<div>
			<div
				onClick={() => {
					navigate(`${table._id as string}`);
				}}
				className={rootClassName}
			>
				<h3 className='uppercase text-[13px] pb-2 font-bold'>
					{i18n.resolvedLanguage === 'ar' ? nameAr : name}
				</h3>
				<h4 className=' mb-1 text-[11px]'>
					{t('tables.chairsnumber')} : {totalChairs}
				</h4>
				{currentTableLog?.startingTime && (
					<h4 className='text-[11px]'>
						{t('tables.starttime')} :{' '}
						{moment(currentTableLog?.startingTime).format('h:mm a')}
					</h4>
				)}
				{status && status !== 'Empty' && (
					<div className='ribbon ribbon-top-right '>
						<span className='!text-[11px]'>{status}</span>
					</div>
				)}
				<div className='mt-4 flex flex-col gap-y-2.5'>
					{newOrders > 0 && (
						<SimpleTag
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							label={`${t('tables.neworders')} - ${newOrders}`}
							variant='primary'
							className='border-white border text-white  !bg-[#FFFFFF26] text-center h-6 text-xs rounded-small !py-[5px] relative'
						>
							<div className='absolute -right-2.5 -top-3 bg-primary rounded-full py-px px-1.5 text-[11px] border border-white '>
								{newOrders}
							</div>
						</SimpleTag>
					)}
					{onTableOrders > 0 && (
						<SimpleTag
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							label={` ${t('tables.processingorders')} - ${processingOrders}`}
							variant='primary'
							className='border-white border text-white  !bg-[#FFFFFF26] text-center h-6 text-xs rounded-small !py-[5px] relative'
						>
							<div className='absolute -right-2.5 -top-3 bg-primary rounded-full py-px px-1.5 text-xs border border-white '>
								{processingOrders}
							</div>
						</SimpleTag>
					)}
					{processingOrders > 0 && (
						<SimpleTag
							// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
							label={`${t('tables.readytoserve')} - ${processingOrders}`}
							variant='primary'
							className='border-white border text-white  !bg-[#FFFFFF26] text-center h-6 text-ءس rounded-small !py-[5px] relative'
						>
							<div className='absolute -right-2.5 -top-3 bg-primary rounded-full py-px px-1.5 text-[11px] border border-white '>
								{processingOrders}
							</div>
						</SimpleTag>
					)}
				</div>
			</div>
			<Button
				onClick={handleResetHelpNeeded}
				className={classNames({
					'mt-3 w-full': true,
					'!bg-gray pointer-events-none': !currentTableLog?.helpNeeded,
				})}
			>
				{t('order.resetHelpNeeded')}
			</Button>
		</div>
	);
};

export default Table;
