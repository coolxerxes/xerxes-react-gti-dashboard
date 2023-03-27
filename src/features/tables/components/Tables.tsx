import { useEffect, useState } from 'react';

import Banner from 'components/Banner';
import Button from 'components/Button';

import Spinner from 'components/Spinner';

import { useGetTables } from 'features/cashier/api/getTables';
import Table from './Table';

import MoveMultipleItemsModal from './MoveMultipleItemsModal';
import SimpleTag from 'components/Tag/SimpleTag';
import { useGetList } from '../api/getList';
import RemoveMultipleTablesModal from './RemoveMultipleTablesModal';
import AddFeesForMultipleTablesModal from './AddFeesForMultipleTablesModal';
import AddTableModal from './AddTableModal';
import EditZoneModal from './EditZoneModal';
import AddZoneModal from './AddZoneModal';
import { io } from 'socket.io-client';
import { Howl } from 'howler';
import tableLogAudio from '../../../assets/tablelog.mp3';
import { useTranslation } from 'react-i18next';
import { useEffectOnce } from 'utils/useEffectOnce';
import { genralSocket } from 'utils/socket';
import KitchenReqs from './kitchenRequests';
// import { genralSocket } from 'utils/socket';

const Tables: React.FC = () => {
	const { t, i18n } = useTranslation();
	// const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
	// const [selectedTableId, setSelectedTableId] = useState<string | undefined>();
	const [selectedFilter, setSelectedFilter] = useState();
	const [selectedListId, setSelectedListId] = useState<string | undefined>(
		undefined
	);
	const audio = new Howl({
		src: [tableLogAudio],
		volume: 0.2,
	});
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

	const tableOptions = tables?.map((table) => ({
		value: table?._id,
		label: i18n.resolvedLanguage === 'ar' ? table.nameAr : table.name,
	}));

	const listOptions = ListData?.data.docs.map((item) => ({
		value: item?._id,
		label: i18n.resolvedLanguage === 'ar' ? item?.nameAr : item.name,
	}));

	useEffect(() => {
		if (!isListDataLoading) {
			setSelectedListId(ListData?.data.docs[0]?._id);
		}
	}, [isListDataLoading]);

	useEffectOnce(() => {
		// const socket = io('https://apimenudev.talabatmenu.com', {
		// 	extraHeaders: {
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// });

		// socket.on('connect', function () {
		// 	socket.emit('ping', { test: 'test' });
		// });

		// socket.emit('ping', { test: 'test' });

		// socket.on('ping', function (data) {});

		// socket.on('Table:Log', function (data) {
		// 	if (data?._id) {
		// 		audio.play();
		// 		refetchTables().catch((err) => err);
		// 	}
		// });
		function onTableLog(data: any) {
			console.log('🚀 ~ file: Tables.tsx:93 ~ onTableLog ~ data:', data);
			if (data?._id) {
				audio.play();
				refetchTables().catch((err) => err);
			}
		}
		genralSocket.connect();
		genralSocket.on('Table:Log', onTableLog);
		return () => {
			genralSocket.disconnect();
			genralSocket.off('Table:Log', onTableLog);
		};
	}, [token]);

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

	const selectedZone = ListData?.data.docs.find(
		(list) => list?._id === selectedListId
	);

	return (
		<div>
			<div className='w-full bg-white  flex items-center rounded-lg justify-between my-5 sticky top-[11%] z-[100]'>
				<div className='w-[100%] flex bg-white items-center justify-between gap-1.5 opacity-100 bg-opacity-100 h-full rounded-lg '>
					<span className='font-dinBold text-xl space-[-0.38px] mx-[15px]'>
						{t('tables.tables')}
					</span>
					<div className='items-center overflow-y-hidden xl:text-base grid grid-flow-col grid-cols-1 py-[12.5px]'>
						<div className='flex gap-2.5'>
							<Button
								className='text-base '
								onClick={() => {
									handleSelectedFilter('Move Multiple Tables');
								}}
								variant='ghost'
							>
								{t('tables.movetables')}
							</Button>
							<Button
								className='text-base '
								onClick={() => {
									handleSelectedFilter('Add Fees For Multiple Tables');
								}}
								variant='ghost'
							>
								{t('tables.addfeestables')}
							</Button>
							<Button
								onClick={() => {
									handleSelectedFilter('Remove Multiple Tables');
								}}
								variant='outline'
								className='text-base border border-primary bg-white !text-primary '
							>
								{t('tables.removetables')}
							</Button>
							<Button
								onClick={() => {
									handleSelectedFilter('+ Add Table');
								}}
								className='text-base mr-[3px] '
							>
								+ {t('tables.addtable')}
							</Button>
						</div>
					</div>
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
						<div className='mx-4 align-baseline'>
							<div className='flex gap-2 flex-row w-full justify-end right-5 xl:text-base '>
								<div
									onClick={() => {
										handleSelectedFilter('Edit Zone');
									}}
								>
									<SimpleTag
										label={`${t('tables.editzone')}`}
										variant='dashed'
										className='border-[#ABA5A2] text-black bg-white w-[99px] h-[35px] justify-center items-center !text-base'
									/>
								</div>
								<div
									onClick={() => {
										handleSelectedFilter('+ Add Zone');
									}}
								>
									{' '}
									<SimpleTag
										label={`+ ${t('tables.addzone')}`}
										variant='dashed'
										className='border-primary text-primary bg-white w-[99px] h-[35px] justify-center items-center !text-base'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-white px-5 py-5 mt-5 rounded-[10px]'>
				<div className='w-full   z-0 flex flex-wrap  gap-5'>
					{tablesFilteredByListId?.map((table) => (
						<div className='max-w-[210px] min-w-[197px]' key={table?._id}>
							<Table table={table} refetchTables={refetchTables} />
						</div>
					))}
				</div>
				<div className='flex flex-wrap items-center gap-5 mt-20'>
					<h1 className='text-[17px] font-bold text-black'>Tags</h1>
					<div className='flex items-center gap-3'>
						<div className='h-2.5 w-2.5 rounded-full bg-cyan'></div>
						<span className='text-black text-[14px] font-semibold'>
							Need Payment
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<div className='h-2.5 w-2.5 rounded-full bg-[#75D14E]'></div>
						<span className='text-black text-[14px] font-semibold'>
							Table Paid
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<div className='h-2.5 w-2.5 rounded-full bg-[#FC5C61]'></div>
						<span className='text-black text-[14px] font-semibold'>
							Help Needed
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<div className='h-2.5 w-2.5 rounded-full bg-[#E2E2E2]'></div>
						<span className='text-black text-[14px] font-semibold'>
							Table Reserved
						</span>
					</div>
					<div className='flex items-center gap-3'>
						<div className='h-2.5 w-2.5 rounded-full bg-[#ABA5A2]'></div>
						<span className='text-black text-[14px] font-semibold'>
							Table Empty
						</span>
					</div>
				</div>
			</div>
			{selectedFilter === 'Move Multiple Tables' && (
				<MoveMultipleItemsModal
					options={tableOptions}
					listOptions={listOptions}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					refetchList={refetchList}
					refetchTables={refetchTables}
				/>
			)}
			{selectedFilter === 'Remove Multiple Tables' && (
				<RemoveMultipleTablesModal
					options={tableOptions}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					refetchTables={refetchTables}
				/>
			)}
			{selectedFilter === 'Add Fees For Multiple Tables' && (
				<AddFeesForMultipleTablesModal
					options={tableOptions}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					refetchTables={refetchTables}
				/>
			)}
			{selectedFilter === '+ Add Table' && (
				<AddTableModal
					options={tableOptions}
					isModalOpen={isModalOpen}
					listOptions={listOptions}
					refetchList={refetchList}
					setIsModalOpen={setIsModalOpen}
					refetchTables={refetchTables}
				/>
			)}
			{selectedFilter === 'Edit Zone' && (
				<EditZoneModal
					selectedZone={selectedZone}
					options={tableOptions}
					isModalOpen={isModalOpen}
					listOptions={listOptions}
					refetchList={refetchList}
					setIsModalOpen={setIsModalOpen}
					refetchTables={refetchTables}
				/>
			)}
			{selectedFilter === '+ Add Zone' && (
				<AddZoneModal
					selectedZone={selectedZone}
					options={tableOptions}
					isModalOpen={isModalOpen}
					listOptions={listOptions}
					refetchList={refetchList}
					setIsModalOpen={setIsModalOpen}
					refetchTables={refetchTables}
				/>
			)}

			<KitchenReqs />
		</div>
	);
};

export default Tables;
