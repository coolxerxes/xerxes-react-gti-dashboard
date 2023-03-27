import { useEffect, useState } from 'react';

import Button from 'components/Button';

import Spinner from 'components/Spinner';

import { useGetTables } from 'features/cashier/api/getTables';
// import Table from './Table';

import { useTranslation } from 'react-i18next';
import { useGetList } from 'features/tables/api/getList';
import classNames from 'classnames';
import { QRCodeCanvas } from 'qrcode.react';
import { useGetSupplierSelf } from 'features/settings/api/getSupplierSelf';

const rootClassName = classNames(
	'relative border-2  p-3 rounded-[5px] text-start  h-full border-[#30CCAF] text-white cursor-pointer min-h-[192px]',

	'!bg-[#ABA5A2] !text-black border-[#ABA5A2]'
);

const QrPage: React.FC = () => {
	const { t, i18n } = useTranslation();
	// const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
	// const [selectedTableId, setSelectedTableId] = useState<string | undefined>();
	const [selectedFilter, setSelectedFilter] = useState();
	const [selectedListId, setSelectedListId] = useState<string | undefined>(
		undefined
	);
	const { data: supplierData } = useGetSupplierSelf({});

	const token = localStorage.getItem('token') as string;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {
		data: ListData,
		isLoading: isListDataLoading,
		refetch: refetchList,
	} = useGetList({});
	const {
		data: tableData,
		isLoading: isTableLoading,
		refetch: refetchTables,
	} = useGetTables({});

	const tables = tableData?.data.docs;

	useEffect(() => {
		if (!isListDataLoading) {
			setSelectedListId(ListData?.data.docs[0]?._id);
		}
	}, [isListDataLoading]);

	if (isTableLoading || isListDataLoading) {
		return <Spinner />;
	}

	function handleSelectedFilter(name: any) {
		setSelectedFilter(name);
		setIsModalOpen(true);
	}

	const tablesFilteredByListId = tables?.filter(
		(table) => table.tableRegionId === selectedListId
	);

	return (
		<div>
			<div className='w-full bg-white  flex items-center rounded-lg justify-between my-5 sticky top-[11%] z-[100]'>
				<div className='w-[100%] flex bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg '>
					<span className='font-dinBold text-xl space-[-0.38px] mx-[15px] py-4'>
						Qr {t('tables.tables')}
					</span>
				</div>
			</div>

			<div className='w-full sticky top-[20%] z-[100]  flex items-center 5 bg-white'>
				<div className='w-full py-2 sticky top-[20%] z-[100] flex items-center 5 bg-white'>
					<div className='w-[100%] flex bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg '>
						<div className='items-center overflow-y-hidden xl:text-base grid grid-flow-col grid-cols-12'>
							<div className='flex'>
								{ListData?.data.docs.map((item) => {
									return (
										<div
											key={item?._id}
											className='cursor-pointer py-1 font-bold  mx-1 col-span-1'
											onClick={() => {
												// reset({ ...item });
												setSelectedListId(item?._id);
											}}
										>
											<Button
												variant={
													item?._id === selectedListId ? 'primary' : 'ghost'
												}
												className='!w-max text-base'
											>
												{i18n.resolvedLanguage === 'ar'
													? item?.nameAr ?? item.name
													: item.name}
											</Button>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white px-5 py-5 mt-5 rounded-[10px]'>
				<div className='w-full   z-0 flex flex-wrap  gap-5'>
					{tablesFilteredByListId?.map((table) => {
						const {
							_id,
							status,
							name,
							totalChairs,
							currentTableLog,

							nameAr,
						} = table;

						return (
							<div className='max-w-[210px] min-w-[197px]' key={table?._id}>
								<div>
									<div className={rootClassName}>
										<h3 className='uppercase text-[13px] pb-2 font-bold'>
											{i18n.resolvedLanguage === 'ar' ? nameAr : name}
										</h3>
										<h4 className=' mb-1 text-[11px]'>
											{t('tables.chairsnumber')} : {totalChairs}
										</h4>

										<div className='mt-4 flex flex-col gap-y-2.5 justify-center'>
											<QRCodeCanvas
												className='mx-auto'
												// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
												value={`https://${supplierData?.data?.domain}/${table?._id}/${table.restaurantId?._id}`}
												id={table?._id}
											/>

											{/* <QRCode
												size={256}
												style={{
													height: 'auto',
													maxWidth: '100%',
													width: '100%',
												}}
												value={'value'}
												viewBox={`0 0 256 256`}
                                                
											/> */}
										</div>
									</div>
									<Button
										onClick={() => {
											const canvas = document.getElementById(
												table?._id
											) as HTMLCanvasElement;
											const pngUrl = canvas

												.toDataURL('image/png')
												.replace('image/png', 'image/octet-stream');
											const downloadLink = document.createElement('a');
											downloadLink.href = pngUrl;
											downloadLink.download = `${table.name}.png`;
											document.body.appendChild(downloadLink);
											downloadLink.click();
											document.body.removeChild(downloadLink);
										}}
										className={classNames({
											'mt-3 w-full': true,
										})}
									>
										Download
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default QrPage;
