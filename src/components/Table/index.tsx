import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type RowData,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface TableProps {
	columns: any[]; // TODO: determine what should be type
	data: RowData[];
	className?: string;
}

const Table: React.FC<TableProps> = (props) => {
	const { columns, data, className = '' } = props;

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const { i18n } = useTranslation();

	return (
		<div
			className={classNames({
				[className]: Boolean(className),
			})}
		>
			<table
				className={`w-full `}
				style={{
					direction: i18n.resolvedLanguage === 'ar' ? 'rtl' : 'ltr',
				}}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className='xl:text-base'>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
