import classNames from 'classnames';
import moment from 'moment';
import { type FC, memo } from 'react';
import { type Table } from '../api/types';
import { useTranslation } from 'react-i18next';

interface Props {
	table: Table;
	onSelectTable: (selectedTableId: string | undefined) => void;
	isActive: boolean;
}

const Bill: FC<Props> = memo(({ table, onSelectTable, isActive }) => {
	const { t, i18n } = useTranslation();

	const { _id, name, createdAt, currentTableLog } = table;

	const isPaid = currentTableLog?.paymentNeeded
		? `${t('cashier.notpaid')}`
		: `${t('cashier.paid')}`;

	return (
		<div
			className={classNames({
				'border-lightGray border-solid border-2 rounded-lg min-h-20 p-2 mb-2 cursor-pointer':
					true,
				'border-primary': isActive,
			})}
			onClick={() => {
				onSelectTable(_id);
			}}
		>
			<div className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<span className='font-dinBold xl:text-[19px] text-lg'>{name}</span>
					<span
						className={classNames({
							'bg-primary w-2 h-2 rounded-full block': true,
							'!bg-green': !currentTableLog?.paymentNeeded,
						})}
					/>
					<span className='xl:text-base'>{isPaid}</span>
				</div>

				<span className='font-dinBold xl:text-[19px] text-lg'></span>
			</div>
			<div className='flex justify-between'>
				<span className='text-secondary xl:text-[19px] text-lg'></span>
				<span className='text-secondary xl:text-[19px] text-lg'>
					{moment(createdAt).format('ll')}
				</span>
			</div>
		</div>
	);
});

Bill.displayName = 'Bill';

export default Bill;
